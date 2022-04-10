<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    MIT
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Auth\Provider;

use Hybridauth\Adapter\AdapterInterface;
use Hybridauth\Adapter\OAuth2;
use Hybridauth\Data\Collection;
use Hybridauth\User\Profile;
use Lyrasoft\Luna\Auth\Profile\ProfileHandlerInterface;
use Windwalker\Core\Utilities\Base64Url;

/**
 * The LineSocialProvider class.
 */
class LineSocialProvider extends OAuth2
{
    protected $scope = 'profile openid email';

    protected $apiBaseUrl = 'https://api.line.me/oauth2/v2.1/';

    protected $authorizeUrl = 'https://access.line.me/oauth2/v2.1/authorize';

    protected $accessTokenUrl = 'https://api.line.me/oauth2/v2.1/token';

    protected function initialize()
    {
        parent::initialize();
    }

    public function getUserProfile()
    {
        $idToken = $this->getAccessToken()['id_token'];

        [, $data] = explode('.', $idToken);
        $data = json_decode(Base64Url::decode($data), true, 512, JSON_THROW_ON_ERROR);

        $collection = new Collection($data);

        $userProfile = new Profile();

        if (!$collection->exists('sub')) {
            throw new \UnexpectedValueException('Provider API returned an unexpected response.');
        }

        $userProfile->identifier = $collection->get('sub');
        $userProfile->email = $collection->get('email');
        $userProfile->photoURL = $collection->get('picture');
        $userProfile->displayName = $collection->get('name');

        return $userProfile;
    }

    protected function validateAccessTokenExchange($response)
    {
        $collection = parent::validateAccessTokenExchange($response);

        $idToken = $collection->get('id_token');

        $this->storeData('id_token', $idToken);

        return $collection;
    }

    public function getAccessToken()
    {
        $tokens = parent::getAccessToken();

        $tokens['id_token'] = $this->getStoredData('id_token');

        return $tokens;
    }
}
