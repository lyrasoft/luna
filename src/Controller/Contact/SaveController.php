<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Controller\Contact;

use Lyrasoft\Luna\Contact\ContactService;
use Lyrasoft\Luna\Helper\LunaHelper;
use Lyrasoft\Warder\Warder;
use Phoenix\Controller\AbstractSaveController;
use Windwalker\Core\Language\Translator;
use Windwalker\Data\Data;
use Windwalker\Data\DataInterface;
use Windwalker\Data\DataSet;
use Windwalker\DataMapper\Entity\Entity;
use Windwalker\DI\Annotation\Inject;

/**
 * The SaveController class.
 *
 * @since  1.2
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
     * Property contactService.
     *
     * @Inject()
     *
     * @var ContactService
     */
    protected $contactService;

    /**
     * Process success.
     *
     * @param  mixed $result
     *
     * @return mixed
     * @throws \ReflectionException
     */
    public function processSuccess($result)
    {
        $users = $this->getReceiveMailUsers();

        $this->contactService->sendContactMail($this->dataObject, $users);

        $this->triggerEvent('onLunaContactSendMail', [
            'controller' => $this,
            'data' => $this->dataObject,
        ]);

        return parent::processSuccess($result);
    }

    /**
     * getReceiveMailUsers
     *
     * @return  iterable|Data[]
     *
     * @since  1.7
     */
    protected function getReceiveMailUsers(): iterable
    {
        return Warder::getReceiveMailUsers();
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
        return __(LunaHelper::getLangPrefix() . 'contact.message.submit.success');
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
