# Copilot instructions

`lyrasoft/luna` is a reusable PHP package that adds CMS features (users,
articles, categories, menus, pages, widgets, access, captcha...) to a Windwalker
host app. The `Lyrasoft\Luna\` namespace maps to `src/`; migrations, seeders,
languages and routes ship in `resources/`, `etc/` and `routes/`. It is not a
host application: do not assume a host app's name, location or configuration.

## Scope

- Keep changes in this package. Ask the user before editing any other package
  under `vendor/`.
- PHP floor is `>=8.4.6`; use `declare(strict_types=1);` and follow
  `.php-cs-fixer.dist.php`.
- Frontend source is `assets/src/`, built output is `assets/dist/`; build from
  `assets/` with `yarn build`.

## Testing

Tests live in `tests/` (namespace `Lyrasoft\Luna\Tests`) and need only MySQL.
`WINDWALKER_TEST_DB_DSN` selects the database (default `luna_test`, prefix
`luna_`). **The database is DROPPED and recreated on every run**: use a
disposable one, never a host app's real database.

| Mode | Config | Command (from this directory) |
| --- | --- | --- |
| Standalone (default) | `phpunit.dist.xml` | `composer install`, then `vendor/bin/phpunit` |
| Host app | `phpunit.app.dist.xml` copied to `phpunit.app.xml` (git-ignored) | the host's `vendor/bin/phpunit -c phpunit.app.xml`, or `composer test:app` |
| CI | `phpunit.ci.xml` | `vendor/bin/phpunit -c phpunit.ci.xml` |

- `tests/bootstrap.app.php` serves both modes: `WINDWALKER_TEST_APP_ROOT` (a
  relative value resolves against this directory) selects the host root; unset
  means this package. It loads Luna's `etc/*.config.php`, uses an in-memory
  session, boots `TestApp`, and registers it with `TestAppRegistry::use()`.
- Schema comes from `resources/migrations`. In a DB test use
  `Windwalker\Core\Testing\Traits\DatabaseTestTrait` and call
  `TestDatabaseFixtures::migrate()` in `prepareTablesBeforeClass()`; see
  `tests/Migration/MigrationTest.php`.
- Core's testing helpers (`AbstractTestApp`, `TestAppRegistry`, traits) come from
  `windwalker/core`; standalone mode needs a Core version that includes
  `TestAppRegistry`. Test conventions follow Core's
  `.github/instructions/test-common.instructions.md`.
- Run `composer test` for the default suite. Do not run it against a database
  whose data must be preserved.
