<?php

declare(strict_types=1);

namespace App\Seeder;

use Lyrasoft\Luna\Entity\Category;
use Lyrasoft\Luna\Entity\User;
use Lyrasoft\Luna\Importer\DataImporterTrait;
use Lyrasoft\Luna\Importer\NestedDataImporter;
use Lyrasoft\Luna\Services\LocaleService;
use Unicorn\Utilities\SlugHelper;
use Windwalker\Core\Seed\AbstractSeeder;
use Windwalker\Core\Seed\SeedClear;
use Windwalker\Core\Seed\SeedImport;
use Windwalker\ORM\Nested\Position;
use Windwalker\ORM\NestedSetMapper;
use Windwalker\Utilities\Utf8String;

use function Windwalker\include_glob;

return new /** Category Seeder */ class extends AbstractSeeder {
    use DataImporterTrait;

    /**
     * @var int[][]
     */
    protected array $existsRecordIds = [];

    protected array $langCodes = [];

    protected array $userIds = [];

    #[SeedImport]
    public function import(): void
    {
        /** @var array<string, array{ number: int, max_level: int }|\Closure> $types */
        $types = [
            ...include_glob(__DIR__ . '/categories/*.categories.php', merge: true),
        ];

        $this->langCodes = LocaleService::getSeederLangCodes($this->orm);
        $this->userIds = $this->orm->findColumn(User::class, 'id')->dump();

        foreach ($types as $type => $detail) {
            if ($detail instanceof \Closure) {
                $this->importCategories($type, $detail($this->faker));
            } else {
                $this->createFakeCategories($type, $detail['number'], $detail['max_level']);
            }
        }
    }

    #[SeedClear]
    public function clear(): void
    {
        $this->truncate(Category::class);
    }

    public function createFakeCategories(string $type, int $number, int $maxLevel = 3): void
    {
        $this->existsRecordIds[$type] = [1]; // Add root ID

        $faker = $this->faker('en_US');
        /** @var NestedSetMapper<Category> $mapper */
        $mapper = $this->orm->mapper(Category::class);

        foreach (range(1, $number) as $i) {
            $langCode = $faker->randomElement($this->langCodes);

            /** @var Category $item */
            $item = $mapper->createEntity();
            $faker = $this->faker($langCode);
            $item->type = $type;
            $item->title = Utf8String::ucwords($faker->sentence(2));
            $item->alias = SlugHelper::safe($item->title);
            $item->description = $faker->paragraph(5);
            $item->image = $faker->unsplashImage(800, 600);
            $item->state = $faker->randomElement([1, 1, 1, 0]);
            $item->language = $langCode;
            $item->created = $created = $faker->dateTimeThisYear();
            $item->modified = $created->modify('+10days');
            $item->createdBy = (int) $faker->randomElement($this->userIds);
            $mapper->setPosition(
                $item,
                $faker->randomElement($this->existsRecordIds[$item->type]),
                Position::LAST_CHILD
            );
            /** @var Category $item */
            $item = $mapper->createOne($item);

            if ($item->level < $maxLevel) {
                $this->existsRecordIds[$item->type][] = $item->id;
            }

            $this->printCounting();
        }
    }

    /**
     * Include Example:
     *
     *  ```php
     *  return [
     *     'type' => [
     *         new Node(
     *             value: Category::create(title: '...', alias: '...'),
     *             children: [
     *                new Node(
     *                   value: Category::create(title: '...', alias: '...'),
     *                   children: [...]
     *                ),
     *               function () {
     *                   $item = new Category();
     *                   $item->title = '...';
     *                   $item->alias = '...';
     *                   return $item;
     *                },
     *             ]
     *         ),
     *     ]
     *  ```
     *
     * ```php
     * $this->>importCategories('type', [...], function(Category $item) { ... });
     * $this->>importCategories('type', 'file/to/categories.php', function(Category $item) { ... });
     * ```
     */
    public function importCategories(string $type, iterable|string $items, ?\Closure $dataHandler = null): void
    {
        /** @var NestedDataImporter $importer */
        $importer = $this->createNestedDataImporter();
        $importer->setDefaultDataHandler(
            function (Category $category) use ($type) {
                $category->type = $category->type ?: $type;

                if (!$category->alias) {
                    $category->alias = SlugHelper::safe($category->title);
                }
            }
        );

        $importer->import(
            $items,
            $dataHandler
        );
    }
};
