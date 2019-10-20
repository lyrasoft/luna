<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Controller\Captcha;

use Gregwar\Captcha\CaptchaBuilder;
use Lyrasoft\Unidev\Captcha\CaptchaImageInterface;
use Lyrasoft\Unidev\Captcha\CaptchaService;
use Phoenix\Controller\AbstractPhoenixController;

/**
 * The CaptchaImageController class.
 *
 * @since  1.5.5
 */
class CaptchaImageController extends AbstractPhoenixController
{
    /**
     * Property captchaService.
     *
     * @var  CaptchaService
     */
    protected $captchaService;

    /**
     * CaptchaImageController constructor.
     *
     * @param CaptchaService $captchaService
     */
    public function __construct(CaptchaService $captchaService)
    {
        parent::__construct();

        $this->captchaService = $captchaService;
    }

    /**
     * The main execution process.
     *
     * @return  string
     * @throws \Throwable
     * @throws \Psr\Cache\InvalidArgumentException
     */
    protected function doExecute()
    {
        $profile = $this->input->get('profile');

        $captcha = $this->captchaService->getDriver($profile);

        if (!$captcha instanceof CaptchaImageInterface) {
            throw new \InvalidArgumentException(
                sprintf(
                    'Captcha driver: %s should implements %s',
                    get_class($captcha),
                    CaptchaImageInterface::class
                )
            );
        }

        $this->response = $this->response->withHeader('Content-Type', $captcha->contentType());

        return $captcha->image();
    }
}
