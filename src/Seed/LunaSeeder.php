<?php
/**
 * Part of Admin project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

use Windwalker\Core\Seeder\AbstractSeeder;

/**
 * The DatabaseSeeder class.
 *
 * @since  1.0
 */
class LunaSeeder extends AbstractSeeder
{
    /**
     * doExecute
     *
     * @return  void
     * @throws ReflectionException
     */
    public function doExecute()
    {
        $this->execute(LanguageSeeder::class);

        $this->execute(TagSeeder::class);

        $this->execute(CategorySeeder::class);

        $this->execute(PageSeeder::class);

        $this->execute(ArticleSeeder::class);

        $this->execute(CommentSeeder::class);

        $this->execute(ModuleSeeder::class);

        $this->execute(ContactSeeder::class);

        $this->execute(PageSeeder::class);
    }

    /**
     * doClear
     *
     * @return  void
     * @throws ReflectionException
     */
    public function doClear()
    {
        $this->clear(LanguageSeeder::class);

        $this->clear(TagSeeder::class);

        $this->clear(CategorySeeder::class);

        $this->clear(PageSeeder::class);

        $this->clear(ArticleSeeder::class);

        $this->clear(CommentSeeder::class);

        $this->clear(ModuleSeeder::class);

        $this->clear(ContactSeeder::class);

        $this->clear(PageSeeder::class);
    }
}
