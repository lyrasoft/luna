<?php

declare(strict_types=1);

namespace App\Migration;

use Lyrasoft\Luna\Entity\RememberToken;
use Lyrasoft\Luna\Entity\Session;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Core\Migration\MigrateUp;
use Windwalker\Core\Migration\MigrateDown;
use Windwalker\Database\Schema\Schema;

return new /** 2026041111270001_RememberTokenSessionLinked */ class extends AbstractMigration {
    #[MigrateUp]
    public function up(): void
    {
        $this->updateTable(
            RememberToken::class,
            function (Schema $schema) {
                $schema->varchar('sess_id')->after('user_id');
                $schema->varchar('stage')->after('sess_id');

                $schema->addIndex('sess_id');
            }
        );

        $this->updateTable(
            Session::class,
            function (Schema $schema) {
                $schema->binary('remember')->nullable(true)->length(16);
                $schema->varchar('stage')->after('remember');

                $schema->addIndex('remember');
            }
        );
    }

    #[MigrateDown]
    public function down(): void
    {
        $this->dropTableColumns(RememberToken::class, 'sess_id');
    }
};
