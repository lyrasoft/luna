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

/**
 * The TagsGeetController class.
 *
 * @since  {DEPLOY_VERSION}
 */
class TagsGetController extends AbstractAjaxController
{
	/**
	 * doAjax
	 *
	 * @return  mixed
	 */
	protected function doAjax()
	{
		$q = $this->input->getString('q');

		$mapper = new TagMapper;
		$tags = $mapper->find(["title LIKE '{$q}%'"]);

		$data = array();

		foreach ($tags as $tag)
		{
			$data[] = array(
				'id' => $tag->id,
				'text' => $tag->title
			);
		}

		return $this->responseSuccess(null, $data);
	}
}
