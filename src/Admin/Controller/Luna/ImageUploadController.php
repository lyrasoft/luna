<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Luna;

use Gregwar\Image\Image;
use Imgur\Client;
use Lyrasoft\Luna\Helper\LunaHelper;
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

		$this->resize($temp);

		if (!is_file($temp))
		{
			return $this->responseFailure('Temp file not exists', $file['error']);
		}

		$url = ImageUploader::upload($temp, EditorImageHelper::getPath($folder . $id));

		File::delete($temp);

		return $this->responseSuccess('Upload success', array(
			'url' => $url
		));
	}

	/**
	 * resize
	 *
	 * @link  https://github.com/Gregwar/Image
	 *
	 * @param   string  $file
	 *
	 * @return  void
	 */
	protected function resize($file)
	{
		if (!$this->app->get('image_upload.resize.enabled', true))
		{
			return;
		}

		$luna = LunaHelper::getPackage();

		$width   = $luna->get('image_upload.resize.width', 1200);
		$height  = $luna->get('image_upload.resize.height', 1200);
		$quality = $luna->get('image_upload.resize.quality', 85);
		$crop    = $luna->get('image_upload.resize.crop', false);

		$image = Image::open($file);

		if ($image->width() < $width && $image->height() < $height)
		{
			return;
		}

		if ($crop)
		{
			$image->zoomCrop($width, $height);
		}
		else
		{
			$image->cropResize($width, $height);
		}

		$image->save($file, 'guess', $quality);
	}
}
