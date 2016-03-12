<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Command;

use Lyrasoft\Luna\Admin\DataMapper\LanguageMapper;
use Symfony\Component\Yaml\Yaml;
use Windwalker\Console\Command\Command;
use Windwalker\Ioc;

/**
 * The TestCommand class.
 *
 * @since  {DEPLOY_VERSION}
 */
class PlayCommand extends Command
{
	protected $name = 'play';

	protected function doExecute()
	{
		$mapper = new LanguageMapper;

		$langs = $mapper->findAll('ordering');

		foreach ($langs as $lang)
		{
			$items[] = $lang->dump();
		}

		$yaml = Yaml::dump(array('languages' => $items), 4);

		file_put_contents(__DIR__ . '/languages.yml', $yaml);

//		foreach ($langs as $i => $lang)
//		{
//			$img = $lang->image;
//
//			$img = explode('_', $img);
//
//			if (isset($img[1]))
//			{
//				$img[0] = $img[1];
//			}
//
//			$lang->image = $img[0];
//
//			$mapper->updateOne($lang, 'id');
//		}
		
		return true;
	}
}
