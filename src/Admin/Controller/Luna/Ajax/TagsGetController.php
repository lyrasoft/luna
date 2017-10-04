<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Luna\Ajax;

use Lyrasoft\Luna\Admin\DataMapper\TagMapper;
use Lyrasoft\Unidev\Controller\AbstractAjaxController;
use Windwalker\Core\Controller\AbstractController;
use Windwalker\Core\Controller\Traits\JsonApiTrait;

/**
 * The TagsGetController class.
 *
 * @since  1.0
 */
class TagsGetController extends AbstractController
{
	use JsonApiTrait;

	/**
	 * doAjax
	 *
	 * @return  mixed
	 */
	protected function doExecute()
	{
		$q = $this->input->getString('q');

		if ($q === '')
		{
			$tags = TagMapper::findAll('title ASC');
		}
		else
		{
			$tags = TagMapper::find(["title LIKE '{$q}%'"], 'title ASC');
		}

		$data = [];

		foreach ($tags as $tag)
		{
			$data[] = [
				'id' => $tag->id,
				'text' => $tag->title
			];
		}

		return $data;
	}
}
