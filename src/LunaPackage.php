<?php

namespace Lyrasoft\Luna;

use Faker\Generator;
use Lyrasoft\Luna\Access\AccessAuthorization;
use Lyrasoft\Luna\Access\AccessService;
use Lyrasoft\Luna\Attributes\LangAssoc;
use Lyrasoft\Luna\Auth\SocialAuthService;
use Lyrasoft\Luna\Auth\SRP\SRPService;
use Lyrasoft\Luna\Captcha\CaptchaManager;
use Lyrasoft\Luna\Error\LunaErrorHandler;
use Lyrasoft\Luna\Faker\LunaFakerProvider;
use Lyrasoft\Luna\Menu\MenuBuilder;
use Lyrasoft\Luna\PageBuilder\PageService;
use Lyrasoft\Luna\Script\FontAwesomeScript;
use Lyrasoft\Luna\Script\LunaScript;
use Lyrasoft\Luna\Script\SRPScript;
use Lyrasoft\Luna\Services\AssociationService;
use Lyrasoft\Luna\Services\ConfigService;
use Lyrasoft\Luna\Services\LocaleService;
use Lyrasoft\Luna\Services\MenuService;
use Lyrasoft\Luna\Services\TagService;
use Lyrasoft\Luna\Services\UserSwitchService;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\Password;
use Lyrasoft\Luna\User\PasswordInterface;
use Lyrasoft\Luna\User\UserService;
use Lyrasoft\Luna\Widget\WidgetService;
use Windwalker\Authorization\Authorization;
use Windwalker\Core\Application\AppClient;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\Application\Context\AppContextInterface;
use Windwalker\Core\Application\WebApplicationInterface;
use Windwalker\Core\Auth\AuthService;
use Windwalker\Core\DI\RequestBootableProviderInterface;
use Windwalker\Core\Http\AppRequest;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Core\Package\PackageInstaller;
use Windwalker\Core\Renderer\RendererService;
use Windwalker\Core\Seed\FakerService;
use Windwalker\Core\Service\ErrorService;
use Windwalker\Crypt\Hasher\PasswordHasher;
use Windwalker\Crypt\Hasher\PasswordHasherInterface;
use Windwalker\DI\Attributes\AttributeType;
use Windwalker\DI\Container;
use Windwalker\DI\ServiceProviderInterface;
use Windwalker\Event\Event;
use Windwalker\SRP\SRPClient;
use Windwalker\SRP\SRPServer;
use Windwalker\Utilities\Iterator\PriorityQueue;
use Windwalker\Utilities\StrNormalize;

/**
 * The LunaPackage class.
 *
 * @since  1.0
 */
class LunaPackage extends AbstractPackage implements ServiceProviderInterface, RequestBootableProviderInterface
{
    public function __construct(public ApplicationInterface $app)
    {
    }

    public function getLoginName(): string
    {
        return $this->app->config('user.login_name') ?? 'username';
    }

    public function isAdmin(): bool
    {
        if ($this->app instanceof WebApplicationInterface) {
            return $this->app->service(AppRequest::class)->getMatchedRoute()?->getExtraValue('namespace') === 'admin';
        }

        return false;
    }

    public function isFront(): bool
    {
        if ($this->app instanceof WebApplicationInterface) {
            return $this->app->service(AppRequest::class)->getMatchedRoute()?->getExtraValue('namespace') === 'front';
        }

        return false;
    }

    public function bootBeforeRequest(Container $container): void
    {
        // Error
        if (!$this->app->isDebug() && $this->app->getClient() === AppClient::WEB) {
            $errorService = $container->get(ErrorService::class);

            $errorService->addHandler(
                $container->newInstance(
                    LunaErrorHandler::class,
                    [
                        'layout' => $this->app->config('luna.error.layout') ?? 'error',
                        'route' => $this->app->config('luna.error.route') ?? 'front::home',
                    ]
                ),
                'default'
            );
            $errorService->register();
        }
    }

    public function register(Container $container): void
    {
        $container->share(static::class, $this);

        $container->prepareSharedObject(CaptchaManager::class);
        $container->prepareSharedObject(ConfigService::class);
        $container->prepareSharedObject(LunaScript::class);
        $container->prepareSharedObject(FontAwesomeScript::class);
        $container->prepareSharedObject(MenuService::class);
        $container->prepareSharedObject(MenuBuilder::class);
        $container->prepareSharedObject(PageService::class);
        $container->prepareSharedObject(TagService::class);
        $container->prepareSharedObject(LocaleService::class);
        $container->prepareSharedObject(WidgetService::class);
        $container->prepareSharedObject(AssociationService::class);
        $container->prepareSharedObject(SRPService::class);

        $this->registerAuthServices($container);
        $this->registerSRPServices($container);

        $this->registerFaker($container);

        // Attributes
        $container->getAttributesResolver()
            ->registerAttribute(LangAssoc::class, AttributeType::CALLABLE);

        // View
        $container->extend(RendererService::class, function (RendererService $rendererService) {
            $rendererService->addPath(static::path('views'), PriorityQueue::BELOW_NORMAL);
            $rendererService->addPath(
                static::path('views/menu/bootstrap5'),
                PriorityQueue::BELOW_NORMAL,
                '@menu'
            );
            $rendererService->addPath(
                static::path('views/ui/bootstrap5'),
                PriorityQueue::BELOW_NORMAL,
                '@theme'
            );
        });

        $container->mergeParameters(
            'renderer.aliases',
            [
                '@menu-root' => '@menu::menu-root',
            ]
        );

        $container->mergeParameters(
            'renderer.edge.components',
            [
                'widget' => 'widget.widget',
                'menu-root' => '@menu-root',
                'locale-dropdown' => '@theme::i18n.locale-dropdown',
                'lang-label' => '@theme::i18n.lang-label',
                'lang-dropdown' => '@theme::i18n.lang-dropdown',
            ]
        );

        // Assets
        $container->mergeParameters(
            'asset.import_map.imports',
            [
                '@luna/' => 'vendor/lyrasoft/luna/',
            ]
        );
    }

    protected function registerFaker(Container $container)
    {
        if ($container->has(FakerService::class)) {
            $container->extend(FakerService::class, static function (FakerService $fakerService) {
                $fakerService->on('faker.created', function (Event $event) {
                    /** @var Generator $faker */
                    $faker = $event['faker'];
                    $faker->addProvider(new LunaFakerProvider($faker));
                });

                return $fakerService;
            });
        }
    }

    protected function registerAuthServices(Container $container): void
    {
        $container->prepareSharedObject(
            UserService::class,
            fn(UserService $userService, Container $container)
                => $userService->addEventDealer($container->get(AppContextInterface::class))
        );
        $container->prepareSharedObject(UserSwitchService::class);
        $container->prepareSharedObject(AccessService::class);
        $container->prepareSharedObject(ActivationService::class);
        $container->prepareSharedObject(SocialAuthService::class);
        $container->prepareSharedObject(Password::class)
            ->alias(PasswordInterface::class, Password::class);

        $container->extend(
            AuthService::class,
            fn(AuthService $authService, Container $container) => $authService->setUserRetrieveHandler(
                fn($conditions = null) => $container->get(UserService::class)->getUser($conditions)
            )
        );

        if ($container->has(Authorization::class)) {
            $container->extend(
                Authorization::class,
                fn(Authorization $auth, Container $container) => new AccessAuthorization(
                    $auth,
                    $container->get(AccessService::class)
                )
            );
        }

        if (!$container->has(PasswordHasherInterface::class)) {
            $container->share(
                PasswordHasherInterface::class,
                function (Container $container) {
                    return $container->newInstance(PasswordHasher::class);
                }
            );
        }
    }

    public function install(PackageInstaller $installer): void
    {
        $installer->installConfig(static::path('etc/*.php'), 'config');
        $installer->installLanguages(static::path('resources/languages/**/*.ini'), 'lang');
        $installer->installMigrations(static::path('resources/migrations/**/*'), 'migrations');
        $installer->installSeeders(static::path('resources/seeders/**/*'), 'seeders');
        $installer->installRoutes(static::path('routes/**/*.php'), 'routes');
        $installer->installViews(static::path('views/*.blade.php'), 'views');

        $this->installModules($installer, 'category');
        $this->installModules($installer, 'tag', ['admin', 'model']);
        $this->installModules($installer, 'article');
        $this->installModules($installer, 'page');
        $this->installModules($installer, 'menu', ['admin', 'model']);
        $this->installModules($installer, 'widget', ['admin', 'model']);
        $this->installModules($installer, 'config', ['admin', 'model']);
        $this->installModules($installer, 'auth');
        $this->installModules($installer, 'user');

        $installer->installModules(
            [
                static::path("src/Entity/UserRole.php") => '@source/Entity',
                static::path("src/Entity/UserRoleMap.php") => '@source/Entity',
                static::path("src/Entity/Rule.php") => '@source/Entity',
            ],
            [
                'Lyrasoft\\Luna\\Entity' => 'App\\Entity',
            ],
            ['modules', 'user_access']
        );

        $installer->installModules(
            [
                static::path("src/Module/Front/Profile/**/*") => "@source/Module/Front/Profile",
                static::path("src/Repository/UserRepository.php") => '@source/Repository',
            ],
            ['Lyrasoft\\Luna\\Module\\Front' => 'App\\Module\\Front'],
            ['modules', 'front_profile']
        );
    }

    protected function installModules(
        PackageInstaller $installer,
        string $name,
        array $modules = ['front', 'admin', 'model']
    ): void {
        $pascal = StrNormalize::toPascalCase($name);

        if (in_array('admin', $modules, true)) {
            $installer->installModules(
                [
                    static::path("src/Module/Admin/$pascal/**/*") => "@source/Module/Admin/$pascal",
                ],
                ['Lyrasoft\\Luna\\Module\\Admin' => 'App\\Module\\Admin'],
                ['modules', $name . '_admin'],
            );
        }

        if (in_array('front', $modules, true)) {
            $installer->installModules(
                [
                    static::path("src/Module/Front/$pascal/**/*") => "@source/Module/Front/$pascal",
                ],
                ['Lyrasoft\\Luna\\Module\\Front' => 'App\\Module\\Front'],
                ['modules', $name . '_front']
            );
        }

        if (in_array('model', $modules, true)) {
            $installer->installModules(
                [
                    static::path("src/Entity/$pascal.php") => '@source/Entity',
                    static::path("src/Repository/{$pascal}Repository.php") => '@source/Repository',
                ],
                [
                    'Lyrasoft\\Luna\\Entity' => 'App\\Entity',
                    'Lyrasoft\\Luna\\Repository' => 'App\\Repository',
                ],
                ['modules', $name . '_model']
            );
        }
    }

    protected function registerSRPServices(Container $container): void
    {
        $container->share(
            SRPServer::class,
            function (Container $container) {
                return SRPServer::createFromConfig(
                    $container->getParam('user.srp') ?? []
                );
            }
        );

        $container->share(
            SRPClient::class,
            function (Container $container) {
                return SRPClient::createFromConfig(
                    $container->getParam('user.srp') ?? []
                );
            }
        );

        $container->share(
            SRPService::class,
            function (Container $container) {
                return $container->newInstance(
                    SRPService::class,
                    [
                        'enabled' => (bool) $container->getParam('user.srp.enabled')
                    ]
                );
            }
        );

        $container->prepareSharedObject(SRPScript::class);
    }
}
