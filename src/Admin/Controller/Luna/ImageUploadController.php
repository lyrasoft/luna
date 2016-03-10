<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Luna;

use Imgur\Client;
use Lyrasoft\Luna\Image\EditorImageHelper;
use Lyrasoft\Unidev\Controller\AbstractAjaxController;
use Lyrasoft\Unidev\Image\ImageUploader;
use Windwalker\Debugger\Helper\DebuggerHelper;
use Windwalker\Filesystem\File;
use Windwalker\Filesystem\Folder;

/**
 * The ImageUploadController class.
 *
 * @since  {DEPLOY_VERSION}
 */
class ImageUploadController extends AbstractAjaxController
{
	/**
	 * doAjax
	 *
	 * @return  mixed
	 */
	protected function doAjax()
	{
		DebuggerHelper::disableConsole();

		if (!$this->app->get('unidev.image.storage'))
		{
			return $this->responseFailure('No image storage set', 500, array('mute' => true));
		}

		$file = $this->input->files->get('file');
		$folder = $this->input->getPath('folder');
		$folder = ltrim($folder . '/', '/');

		if ($file['error'])
		{
			return $this->responseFailure('Upload fail', $file['error']);
		}

		$id = md5(uniqid(rand(0, 999)));
		$temp = EditorImageHelper::getTempFile($folder . $id, File::getExtension($file['name']));

		if (!is_dir(dirname($temp)))
		{
			Folder::create(dirname($temp));
		}

		File::upload($file['tmp_name'], $temp);

		if (!is_file($temp))
		{
			return $this->responseFailure('Move to temp fail', $file['error']);
		}

		File::delete($temp);

		$url = ImageUploader::upload($temp, EditorImageHelper::getPath($folder . $id));

		return $this->responseSuccess('Upload success', array(
			'url' => $url
		));
	}
}
