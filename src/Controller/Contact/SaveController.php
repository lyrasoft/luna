<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Controller\Contact;

use Lyrasoft\Luna\Helper\LunaHelper;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Core\Language\Translator;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\DataMapper\Entity\Entity;

/**
 * The SaveController class.
 *
 * @since  __DEPLOY_VERSION__
 */
class SaveController extends AbstractSaveController
{
	/**
	 * Property name.
	 *
	 * @var  string
	 */
	protected $name = 'Contact';

	/**
	 * Process success.
	 *
	 * @param  mixed $result
	 *
	 * @return mixed
	 * @throws \UnexpectedValueException
	 */
	public function processSuccess($result)
	{
		$this->triggerEvent('onLunaContactSendMail', [
			'controller' => $this,
			'data' => $this->dataObject
		]);

		return parent::processSuccess($result);
	}

	/**
	 * getSuccessMessage
	 *
	 * @param Data $data
	 *
	 * @return  string
	 */
	public function getSuccessMessage($data = null)
	{
		return Translator::translate(LunaHelper::getLangPrefix() . 'contact.message.submit.success');
	}

	/**
	 * getSuccessRedirect
	 *
	 * @param  DataInterface|Entity $data
	 *
	 * @return  string
	 *
	 * @throws \OutOfRangeException
	 */
	protected function getSuccessRedirect(DataInterface $data = null)
	{
		return (string) $this->router->to(strtolower($this->getName()));
	}
}
