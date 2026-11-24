<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Captcha;

use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Http\HttpClient;

use function Windwalker\DOM\h;

/**
 * The CloudflareDriver class, using Cloudflare Turnstile.
 *
 * @see  https://developers.cloudflare.com/turnstile/
 */
class CloudflareDriver implements CaptchaDriverInterface
{
    public const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    public const RESPONSE_FIELD = 'cf-turnstile-response';

    protected ?HttpClient $http = null;

    /**
     * CloudflareDriver constructor.
     *
     * @param  LunaScript  $lunaScript
     * @param  string      $key         Turnstile site key.
     * @param  string      $secret      Turnstile secret key.
     * @param  array       $options     Widget options: theme, size, appearance, language.
     */
    public function __construct(
        protected LunaScript $lunaScript,
        protected string $key,
        protected string $secret,
        protected array $options = [],
    ) {}

    /**
     * input
     *
     * @param  array  $attrs
     * @param  array  $options
     *
     * @return  string
     */
    public function input(array $attrs = [], array $options = []): string
    {
        $this->lunaScript->captcha();

        $options = array_merge($this->options, $options);
        $type = (string) ($options['type'] ?? 'checkbox');

        $attrs['class'] = trim('cf-turnstile ' . ($attrs['class'] ?? ''));
        $attrs['data-sitekey'] = $this->key;

        foreach (['theme', 'size', 'language'] as $name) {
            if (isset($options[$name])) {
                $attrs['data-' . $name] = (string) $options[$name];
            }
        }

        $attrs['data-js-verify'] = !empty($options['js_verify']) ? '1' : null;
        $attrs['uni-captcha-cloudflare'] = $type;

        return (string) h('div', $attrs);
    }

    /**
     * verify
     *
     * @param  mixed  $value
     * @param  array  $options
     *
     * @return  bool
     */
    public function verify(mixed $value, array $options = []): bool
    {
        $token = is_string($value) && $value !== ''
            ? $value
            : (string) ($_POST[self::RESPONSE_FIELD] ?? '');

        if ($token === '') {
            return false;
        }

        $server = $options['server'] ?? $_SERVER;
        $ip = $server['REMOTE_ADDR'] ?? null;

        $body = array_filter(
            [
                'secret' => $this->secret,
                'response' => $token,
                'remoteip' => $ip,
            ],
            static fn($v) => $v !== null && $v !== '',
        );

        $response = $this->getHttp()->post(self::VERIFY_URL, http_build_query($body));

        $result = json_decode((string) $response->getBody(), true);

        return is_array($result) && ($result['success'] ?? false) === true;
    }

    /**
     * getHttp
     *
     * @return  HttpClient
     */
    public function getHttp(): HttpClient
    {
        return $this->http ??= new HttpClient();
    }
}
