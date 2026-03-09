<?php

declare(strict_types=1);

namespace App\Migration;

use Lyrasoft\Luna\Entity\RememberToken;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Core\Migration\MigrateUp;
use Windwalker\Core\Migration\MigrateDown;
use Windwalker\Database\Schema\Schema;

return new /** 2026030817480001_RememberTokenInit */ class extends AbstractMigration {
    #[MigrateUp]
    public function up(): void
    {
        $this->createTable(
            RememberToken::class,
            function (Schema $schema) {
                $schema->primary('id');
                $schema->binary('selector')->length(16);
                $schema->binary('validator')->length(32);
                $schema->integer('user_id');
                $schema->datetime('created');
                $schema->datetime('expired_at');
                $schema->datetime('last_used_at');
                $schema->json('params');

                $schema->addUniqueKey('selector');
                $schema->addIndex('user_id');
                $schema->addIndex('expired_at');
            }
        );
    }

    #[MigrateDown]
    public function down(): void
    {
        $this->dropTables(RememberToken::class);
    }
};
