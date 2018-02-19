<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Contact;

use Lyrasoft\Luna\Helper\LunaHelper;
use Windwalker\Core\Config\Config;
use Windwalker\Core\Language\Translator;
use Windwalker\Core\Mailer\MailMessage;
use Windwalker\Data\Data;
use Windwalker\Ioc;
use Windwalker\String\SimpleTemplate;

/**
 * The ContactMessage class.
 *
 * @since  1.2
 */
class ContactMessage extends MailMessage
{
    /**
     * create
     *
     * @param Data   $data
     * @param Config $config
     *
     * @return  static
     */
    public static function create(Data $data = null, Config $config = null)
    {
        $data   = $data ?: new Data;
        $config = $config ?: Ioc::getConfig();

        $langPrefix = LunaHelper::getLangPrefix();

        $subject = SimpleTemplate::render(Translator::translate($langPrefix . 'contact.mail.subject'),
            $data->dump(true));

        $message = (new static($subject))
            ->to($config->get('mail.from.email'), $config->get('mail.from.name'))
            ->renderBody('mail.contact', ['data' => $data, 'receiver' => $config->extract('mail.from')], 'edge');

        if ($data->email) {
            $message->from($data->email, $data->name);
        } else {
            $message->from($config->get('mail.from.email'), $config->get('mail.from.name'));
        }

        return $message;
    }
}
