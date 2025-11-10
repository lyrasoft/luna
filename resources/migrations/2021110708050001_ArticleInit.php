<?php

declare(strict_types=1);

namespace App\Migration;

use Lyrasoft\Luna\Entity\Article;
use Lyrasoft\Luna\Importer\DataImporter;
use Lyrasoft\Luna\Importer\DataImporterTrait;
use Windwalker\Core\Migration\AbstractMigration;
use Windwalker\Core\Migration\MigrateDown;
use Windwalker\Core\Migration\MigrateUp;
use Windwalker\Database\Schema\Schema;

return new /** 2021110708050001_ArticleInit */ class extends AbstractMigration {
    use DataImporterTrait;

    #[MigrateUp]
    public function up(): void
    {
        $this->createTable(
            Article::class,
            function (Schema $schema) {
                $schema->primary('id')->comment('Primary Key');
                $schema->integer('category_id')->comment('Category ID');
                $schema->integer('page_id')->comment('Page ID');
                $schema->char('type')->length(15)->comment('Content Type');
                $schema->varchar('title')->comment('Title');
                $schema->varchar('alias')->comment('Alias');
                $schema->varchar('image')->comment('Main Image');
                $schema->longtext('introtext')->comment('Intro Text');
                $schema->longtext('fulltext')->comment('Full Text');
                $schema->tinyint('state')->length(1)->comment('0: unpublished, 1:published');
                $schema->integer('ordering')->comment('Ordering');
                $schema->json('extra')->comment('Extra Data');
                $schema->datetime('created')->comment('Created Date');
                $schema->datetime('modified')->comment('Modified Date');
                $schema->integer('created_by')->comment('Author');
                $schema->integer('modified_by')->comment('Modified User');
                $schema->char('language')->length(7)->comment('Language');
                $schema->json('params')->comment('Params');

                $schema->addIndex('category_id');
                $schema->addIndex('page_id');
                $schema->addIndex('alias');
                $schema->addIndex('language');
                $schema->addIndex('created_by');
            }
        );
    }

    #[MigrateDown]
    public function down(): void
    {
        $this->dropTables(Article::class);
    }

    /**
     * Include Example:
     *
     *  ```php
     *  return [
     *     'type' => [
     *         Article::create(title: '...', alias: '...'),
     *         function () {
     *            $item = new Article();
     *            $item->title = '...';
     *            $item->alias = '...';
     *            return $item;
     *         },
     *     ]
     *  ```
     *
     * ```php
     * $this->importArticles('type', [...], function(Article $item) { ... });
     * $this->importArticles('type', 'file/to/articles.php', function(Article $item) { ... });
     * ```
     */
    public function importArticles(string $type, iterable|string $items, ?\Closure $dataHandler = null): void
    {
        /** @var DataImporter $importer */
        $importer = $this->createDataImporter();
        $importer->setDefaultDataHandler(
            function (Article $item) use ($type) {
                $item->type = $item->type ?: $type;

                return $item;
            }
        );

        $importer->import($items, $dataHandler);
    }
};
