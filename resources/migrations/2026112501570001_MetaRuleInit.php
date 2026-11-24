<?php

declare(strict_types=1);

namespace App\Migration;

use Lyrasoft\Luna\Entity\MetaRule;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Core\Migration\MigrateDown;
use Windwalker\Core\Migration\MigrateUp;
use Windwalker\Database\Schema\Schema;

return new /** 2026112501570001_MetaRuleInit */ class () extends AbstractMigration {
    #[MigrateUp]
    public function up(): void
    {
        $this->createTable(
            MetaRule::class,
            function (Schema $schema) {
                $schema->primary('id')->comment('Primary Key');
                $schema->varchar('title')->comment('Title');
                $schema->varchar('pattern')->comment('Path glob pattern');
                $schema->text('exclude_pattern')->comment('Exclude glob patterns, one per line');
                $schema->varchar('override_mode')->comment('force, fallback');
                $schema->json('meta')->comment('Metadata and Open Graph');
                $schema->text('json_ld')->comment('JSON-LD data');
                $schema->json('custom_codes')->comment('Custom codes');
                $schema->text('description')->comment('Admin note');
                $schema->bool('state')->comment('0: unpublished, 1:published');
                $schema->integer('ordering')->comment('Ordering');
                $schema->datetime('created')->comment('Created Date');
                $schema->integer('created_by')->comment('Author');
                $schema->datetime('modified')->comment('Modified Date');
                $schema->integer('modified_by')->comment('Modified User');
                $schema->char('language')->length(7)->comment('Language');
                $schema->json('params')->comment('Params');

                $schema->addIndex('ordering');
            }
        );
    }

    #[MigrateDown]
    public function down(): void
    {
        $this->dropTables(MetaRule::class);
    }
};
