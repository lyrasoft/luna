<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna;

use Faker\Generator;
use Lyrasoft\Luna\Auth\SocialAuthService;
use Lyrasoft\Luna\Faker\LunaFakerProvider;
use Lyrasoft\Luna\Repository\ArticleRepository;
use Lyrasoft\Luna\Services\ConfigService;
use Lyrasoft\Luna\User\ActivationService;
use Lyrasoft\Luna\User\Password;
use Lyrasoft\Luna\User\PasswordInterface;
use Lyrasoft\Luna\User\UserService;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\Core\DI\RequestBootableProviderInterface;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Core\Package\PackageInstaller;
use Windwalker\Core\Runtime\Config;
use Windwalker\Core\Seed\FakerService;
use Windwalker\DI\Container;
use Windwalker\DI\ServiceProviderInterface;
use Windwalker\Event\Event;

use Windwalker\Utilities\StrNormalize;

use function Windwalker\DI\create;

/**
 * The LunaPackage class.
 *
 * @since  1.0
 */
class LunaPackage extends AbstractPackage implements ServiceProviderInterface, RequestBootableProviderInterface
{
    public function __construct(protected ApplicationInterface $app)
    {
    }

    public function register(Container $container): void
    {
        $container->share(static::class, $this);
        
        $container->prepareSharedObject(ConfigService::class);

        $this->registerAuthServices($container);

        $this->registerFaker($container);

        $container->mergeParameters(
            'renderer.paths',
            [
                static::path('views'),
            ]
        );
    }

    public function getLoginName(): string
    {
        return $this->app->config('user.login_name') ?? 'username';
    }

    public function isAdmin(): bool
    {
        if ($this->app instanceof AppContext) {
            return $this->app->getMatchedRoute()?->getExtraValue('namespace') === 'admin';
        }

        return false;
    }

    public function isFront(): bool
    {
        if ($this->app instanceof AppContext) {
            return $this->app->getMatchedRoute()?->getExtraValue('namespace') === 'front';
        }

        return false;
    }

    public function bootBeforeRequest(Container $container): void
    {
        if ($container->has(LangService::class)) {
            $container->get(LangService::class)
                ->loadAllFromPath(__DIR__ . '/../resources/languages', 'ini');
        }
    }

    protected function registerFaker(Container $container)
    {
        $container->extend(FakerService::class, static function (FakerService $fakerService) {
            $fakerService->on('faker.created', function (Event $event) {
                /** @var Generator $faker */
                $faker = $event['faker'];
                $faker->addProvider(new LunaFakerProvider($faker));
            });

            return $fakerService;
        });
    }

    protected function registerAuthServices(Container $container): void
    {
        $container->prepareSharedObject(UserService::class);
        $container->prepareSharedObject(ActivationService::class);
        $container->prepareSharedObject(SocialAuthService::class);
        $container->prepareSharedObject(Password::class)
            ->alias(PasswordInterface::class, Password::class);
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
        $this->installModules($installer, 'article');
        $this->installModules($installer, 'config');
        $this->installModules($installer, 'user');
    }

    protected function installModules(PackageInstaller $installer, string $name): void
    {
        $pascal = StrNormalize::toPascalCase($name);

        $installer->installModules(
            [
                static::path("src/Module/Admin/$pascal/**/*") => "@source/Module/Admin/$pascal",
            ],
            ['Lyrasoft\\Luna\\Module\\Admin' => 'App\\Module\\Admin'],
            ['modules', $name . '_admin'],
        );

        $installer->installModules(
            [
                static::path("src/Module/Front/$pascal/**/*") => "@source/Module/Front/$pascal",
            ],
            ['Lyrasoft\\Luna\\Module\\Front' => 'App\\Module\\Front'],
            ['modules', $name . '_front']
        );

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
