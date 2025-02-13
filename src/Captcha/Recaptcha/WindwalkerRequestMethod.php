<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Captcha\Recaptcha;

use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod;
use ReCaptcha\RequestParameters;
use Windwalker\Http\HttpClient;

/**
 * The WindwalkerRequestMethod class.
 *
 * @since  1.5.1
 */
class WindwalkerRequestMethod implements RequestMethod
{
    /**
     * Property http.
     *
     * @var  HttpClient
     */
    protected $http;

    /**
     * Property url.
     *
     * @var  null
     */
    protected $url;

    /**
     * WindwalkerRequestMethod constructor.
     *
     * @param  HttpClient|null  $http
     * @param  null             $url
     */
    public function __construct(?HttpClient $http = null, $url = null)
    {
        $this->http = $http ?: new HttpClient();
        $this->url = $url ?: ReCaptcha::SITE_VERIFY_URL;
    }

    /**
     * Submit the request with the specified parameters.
     *
     * @param  RequestParameters  $params  Request parameters
     *
     * @return string Body of the reCAPTCHA response
     */
    public function submit(RequestParameters $params)
    {
        $response = $this->http->post(
            $this->url,
            $params->toQueryString(),
            [
                'Content-Type' => 'application/x-www-form-urlencoded',
            ]
        );

        if ($response->getStatusCode() === 200) {
            return $response->getBody()->__toString();
        }

        return '{"success": false, "error-codes": ["' . ReCaptcha::E_CONNECTION_FAILED . '"]}';
    }
}
