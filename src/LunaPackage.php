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
        $installer->installLanguages(static::path('resources/languages/*.ini'), 'lang');
        $installer->installMigrations(static::path('resources/migrations/*.php'), 'migrations');
        $installer->installSeeders(static::path('resources/seeders/*.php'), 'seeders');
        $installer->installRoutes(static::path('routes/*.php'), 'routes');
        $installer->installViews(static::path('views/*.blade.php'), 'views');
        $installer->installModules('Admin/Category', ['modules', 'category_admin']);
    }
}
