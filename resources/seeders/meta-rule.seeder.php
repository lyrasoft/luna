<?php

declare(strict_types=1);

namespace App\Seeder;

use Lyrasoft\Luna\Entity\MetaRule;
use Lyrasoft\Luna\Entity\User;
use Unicorn\Enum\BasicState;
use Windwalker\Core\Seed\AbstractSeeder;
use Windwalker\Core\Seed\SeedClear;
use Windwalker\Core\Seed\SeedImport;
use Windwalker\ORM\EntityMapper;

return new /** MetaRule Seeder */ class () extends AbstractSeeder {
    #[SeedImport]
    public function import(): void
    {
        /** @var EntityMapper<MetaRule> $mapper */
        $mapper = $this->orm->mapper(MetaRule::class);
        $userId = (int) ($this->orm->findColumn(User::class, 'id')->first() ?? 0);

        // Smaller ordering wins, so specific rules come first and general ones last.
        $rules = [
            [
                'title' => 'Article Detail',
                'pattern' => '/article/*/*',
                'exclude_pattern' => '',
                'override_mode' => 'fallback',
                'description' => 'Specific rule: fills missing meta of article pages.',
                'meta' => [
                    'title' => 'Article | Earth',
                    'description' => 'Read the latest article on Earth.',
                    'og_title' => 'Article | Earth',
                ],
                'json_ld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Article',
                    'publisher' => ['@type' => 'Organization', 'name' => 'Earth'],
                ],
                'custom_codes' => [],
            ],
            [
                'title' => 'Campaign Pages',
                'pattern' => '/campaign/**',
                'exclude_pattern' => "/campaign/preview/**\n/campaign/draft/**",
                'override_mode' => 'force',
                'description' => 'Force campaign meta and inject tracking code.',
                'meta' => [
                    'title' => 'Campaign | Earth',
                    'description' => 'Limited time campaign.',
                    'keywords' => 'campaign, sale',
                    'og_image' => 'https://placehold.co/1200x630/png',
                ],
                'json_ld' => [],
                'custom_codes' => [
                    'head' => '<!-- campaign head -->',
                    'body' => '<!-- campaign body -->',
                ],
            ],
            [
                'title' => 'Site Default',
                'pattern' => '/**',
                'exclude_pattern' => "/admin/**\n/api/**",
                'override_mode' => 'fallback',
                'description' => 'General rule: site-wide fallback.',
                'meta' => [
                    'title' => 'Earth',
                    'description' => 'Earth website.',
                    'og_title' => 'Earth',
                    'og_description' => 'Earth website.',
                ],
                'json_ld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'WebSite',
                    'name' => 'Earth',
                ],
                'custom_codes' => [],
            ],
        ];

        foreach ($rules as $i => $data) {
            $item = $mapper->createEntity();

            $item->title = $data['title'];
            $item->pattern = $data['pattern'];
            $item->excludePattern = $data['exclude_pattern'];
            $item->overrideMode = $data['override_mode'];
            $item->description = $data['description'];
            $item->meta = $data['meta'];
            $item->jsonLd = $data['json_ld']
                ? json_encode($data['json_ld'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
                : '';
            $item->customCodes = $data['custom_codes'];
            $item->state = BasicState::PUBLISHED;
            $item->ordering = ($i + 1) * 10;
            $item->createdBy = $userId;

            $mapper->createOne($item);

            $this->printCounting();
        }
    }

    #[SeedClear]
    public function clear(): void
    {
        $this->truncate(MetaRule::class);
    }
};
