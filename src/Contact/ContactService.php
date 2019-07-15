<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2019 .
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Contact;

use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Warder\Data\UserData;
use Lyrasoft\Warder\Warder;
use Windwalker\Core\Config\Config;
use Windwalker\Core\Mailer\Mailer;
use Windwalker\Core\Mailer\MailMessage;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Core\Renderer\RendererHelper;
use Windwalker\Core\Widget\Widget;
use Windwalker\Core\Widget\WidgetHelper;
use Windwalker\Data\Data;
use Windwalker\DI\Annotation\Inject;
use Windwalker\String\SimpleTemplate;
use Windwalker\Utilities\Queue\PriorityQueue;

/**
 * The ContactService class.
 *
 * @since  1.7
 */
class ContactService
{
    /**
     * Property config.
     *
     * @Inject()
     *
     * @var Config
     */
    protected $config;

    /**
     * sendContactMail
     *
     * @param Data                $data
     * @param iterable|UserData[] $users
     *
     * @return bool
     *
     * @throws \ReflectionException
     * @since  1.7
     */
    public function sendContactMail(Data $data, iterable $users = []): bool
    {
        $message = $this->getContactMessage($data);

        foreach ($users as $user) {
            $message->bcc($user->email, $user->name);
        }

        return Mailer::send($message);
    }

    /**
     * getContactMessage
     *
     * @param Data $data
     *
     * @return  MailMessage
     *
     * @throws \ReflectionException
     *
     * @since  1.7
     */
    public function getContactMessage(Data $data): MailMessage
    {
        $config = $this->config;

        $message = (new MailMessage($this->getSubject($data)))
            ->body(
                $this->getWidget(
                    'contact',
                    'edge'
                )->render(['data' => $data, 'receiver' => $config->extract('mail.from')])
            );

        if ($data->email) {
            $message->replyTo($data->email, $data->name);
        }

        return $message;
    }

    /**
     * getSubject
     *
     * @param Data $data
     *
     * @return  string
     *
     * @since  1.7
     */
    public function getSubject(Data $data): string
    {
        $langPrefix = LunaHelper::getLangPrefix();

        return SimpleTemplate::render(
            __($langPrefix . 'contact.mail.subject'),
            $data->dump(true)
        );
    }

    /**
     * getWidget
     *
     * @param string                 $layout
     * @param string                 $engine
     * @param string|AbstractPackage $package
     * @param string                 $prefix
     *
     * @return  Widget
     *
     * @throws \ReflectionException
     *
     * @since  1.7
     */
    public function getWidget(
        string $layout,
        string $engine = RendererHelper::EDGE,
        $package = null,
        string $prefix = 'mail'
    ): Widget {
        $widget = WidgetHelper::createWidget($layout, $engine, $package);
        $widget->setPathPrefix($prefix)->registerPaths(true);

        $widget->addPath(
            LunaHelper::getPackage()->getDir() . '/Resources/templates/mail',
            PriorityQueue::MIN
        );

        return $widget;
    }
}
