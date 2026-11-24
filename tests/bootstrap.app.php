<?php

/**
 * PHPUnit bootstrap for Luna tests.
 *
 * Works in two modes, selected by the WINDWALKER_TEST_APP_ROOT variable:
 *
 * - Standalone (default): the root is this package, which must have its own
 *   `vendor/` installed by `composer install`.
 * - Host app (phpunit.app.dist.xml): the root is the host application, so the
 *   host's autoloader, etc/define.php and installed packages are used.
 *
 * In both modes the migrations come from this package's resources/migrations
 * and the database comes from WINDWALKER_TEST_DB_DSN (MySQL only).
 * TestDatabaseFixtures::initialize() DROPS and recreates that database, so
 * always point it at a disposable one.
 */

declare(strict_types=1);

use Composer\Autoload\ClassLoader;
use Lyrasoft\Luna\LunaPackage;
use Lyrasoft\Luna\Tests\TestApp;
use Unicorn\UnicornPackage;
use Windwalker\Core\Attributes\ConfigModule;
use Windwalker\Core\Edge\Component\XComponent;
use Windwalker\Core\Factory\SessionFactory;
use Windwalker\Session\Bridge\PhpBridge;
use Windwalker\Session\Cookie\CookiesInterface;
use Windwalker\Session\Handler\ArrayHandler;
use Windwalker\Session\SessionPackage;
use Windwalker\Core\Asset\AssetProvider;
use Windwalker\Core\Testing\TestAppRegistry;
use Windwalker\Core\Theme\BootstrapTheme;
use Windwalker\Core\Theme\ThemeInterface;
use Windwalker\DI\Container;
use Windwalker\Edge\Provider\EdgeProvider;
use Windwalker\Renderer\EdgeRenderer;
use Windwalker\Renderer\MustacheRenderer;
use Windwalker\Renderer\PlatesRenderer;
use Windwalker\Renderer\Provider\RendererProvider;
use Windwalker\Renderer\TwigRenderer;

$package = dirname(__DIR__);
$root = env('WINDWALKER_TEST_APP_ROOT') ?: $package;

// A relative root is resolved against the package directory.
if (!preg_match('#^([a-z]:)?[\\\\/]#i', $root)) {
    $root = realpath($package . '/' . $root) ?: $root;
}

$init = include $root . '/vendor/windwalker/core/src/Core/Testing/test.init.php';

/** @var Container $container */
/** @var ClassLoader $classLoader */
[$container, $classLoader] = $init(
    root: $root,
    workDir: $root
);

$container->options->lazy = true;

$classLoader->addPsr4('Lyrasoft\Luna\Tests\\', __DIR__ . '/');

$container->loadParameters([
    'app' => [
        // Luna registers its production ErrorService handler only when not in debug mode.
        'debug' => true,
    ],
    'renderer' => [
        'paths' => [
            '@root/views',
            __DIR__ . '/views',
            $package . '/views',
            $root . '/vendor/windwalker/unicorn/views',
            $root . '/vendor/windwalker/unicorn/views/ui/bootstrap5',
        ],
        'renderers' => [
            'edge' => [EdgeRenderer::class, ['edge.php', 'blade.php']],
            'plates' => [PlatesRenderer::class, ['php']],
            'mustache' => [MustacheRenderer::class, ['mustache']],
            'twig' => [TwigRenderer::class, ['twig']],
        ],
        'options' => [
            'cache_path' => $root . '/cache/renderer',
        ],
        'pagination' => [
            'template' => '@pagination',
            'neighbours' => 4,
        ],
        'aliases' => [
            '@pagination' => 'layout.pagination.basic-pagination',
            '@messages' => 'layout.messages.bs5-messages',
            '@csrf' => 'layout.security.csrf',
        ],
        'edge' => [
            'components' => [
                'component' => XComponent::class,
                'template' => XComponent::class,
            ],
        ],
    ],
    'unicorn' => [
        'modules' => ['next' => true],
    ],
    // In-memory session: tests need no filesystem or session table.
    'session' => [
        'default' => 'array',
        'cookie_params' => [
            'expires' => '+150minutes',
            'path' => '/',
            'domain' => null,
            'secure' => false,
            'httponly' => true,
            'samesite' => CookiesInterface::SAMESITE_LAX,
        ],
        'session_options' => [
            'name' => 'WINDWALKER_SESSID',
            'use_cookies' => '0',
        ],
        'ini' => [
            'use_cookies' => '0',
        ],
        'factories' => [
            'instances' => [
                'array' => static fn() => SessionFactory::createSession('php', 'array', 'request'),
            ],
            'bridges' => [
                'php' => PhpBridge::class,
            ],
            'handlers' => [
                'array' => ArrayHandler::class,
            ],
            'cookies' => [
                'request' => static fn() => SessionFactory::psrCookies(),
            ],
        ],
    ],
]);

// Luna's own etc/*.php ConfigModule files, so `luna.*`, `user.*`... resolve like in a host app.
$lunaBindings = [];

foreach (glob($package . '/etc/*.config.php') as $file) {
    $factory = include $file;
    $attr = new ReflectionFunction($factory)->getAttributes(ConfigModule::class)[0]->newInstance();
    $moduleConfig = $factory();

    $container->loadParameters([$attr->name => $moduleConfig]);
    $lunaBindings += $moduleConfig['bindings'] ?? [];
}

TestApp::createInstance(
    container: $container->createChild(),
    config: [
        '@root' => $root,
        '@temp' => $root . '/tmp',
        '@cache' => $root . '/cache',
        '@public' => $package . '/tests/public',
        '@migrations' => $package . '/resources/migrations',
        '@seeders' => $package . '/resources/seeders',
    ],
);

TestAppRegistry::use(TestApp::$instance);

TestApp::$instance->getContainer()->registerByConfig(
    [
        'providers' => [
            RendererProvider::class,
            EdgeProvider::class,
            UnicornPackage::class,
            SessionPackage::class,
            LunaPackage::class,
            AssetProvider::class,
        ],
        'bindings' => [
            ThemeInterface::class => BootstrapTheme::class,
        ] + $lunaBindings,
    ],
);
