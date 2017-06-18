<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Listener;

use Lyrasoft\Luna\Contact\ContactMessage;
use Windwalker\Core\Config\Config;
use Windwalker\Core\Mailer\Mailer;
use Windwalker\Event\Event;

/**
 * The ContactListener class.
 *
 * @since  1.2
 */
class ContactListener
{
	/**
	 * Property config.
	 *
	 * @var  Config
	 */
	protected $config;

	/**
	 * ContactListener constructor.
	 *
	 * @param Config $config
	 */
	public function __construct(Config $config)
	{
		$this->config = $config;
	}

	public function onLunaContactSendMail(Event $event)
	{
		$data = $event['data'];

		if (!$data->email)
		{
			return;
		}

		Mailer::send(ContactMessage::create($data, $this->config));
	}
}
