<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Lyrasoft\Luna\Admin\Controller\Luna;

use Windwalker\Core\Controller\Controller;
use Windwalker\Http\HttpClient;

/**
 * The TinymceProxyController class.
 *
 * @since  {DEPLOY_VERSION}
 */
class TinymceProxyController extends Controller
{
	/**
	 * doExecute
	 *
	 * @link  https://www.tinymce.com/docs/plugins/imagetools/#imagetools_proxy
	 *
	 * @return  mixed
	 */
	protected function doExecute()
	{
		$validMimeTypes = array("image/gif", "image/jpeg", "image/png");

		if (!isset($_GET["url"]) || !trim($_GET["url"])) {
			header("HTTP/1.0 500 Url parameter missing or empty.");
			return;
		}

		$scheme = parse_url($_GET["url"], PHP_URL_SCHEME);
		if ($scheme === false || in_array($scheme, array("http", "https")) === false) {
			header("HTTP/1.0 500 Invalid protocol.");
			return;
		}

		$http = new HttpClient;

		$content = $http->get($_GET["url"])->getBody()->__toString();
		$info = getimagesizefromstring($content);

		if ($info === false || in_array($info["mime"], $validMimeTypes) === false) {
			header("HTTP/1.0 500 Url doesn't seem to be a valid image.");
			return;
		}

		header('Content-Type:' . $info["mime"]);

		return $content;
	}
}
