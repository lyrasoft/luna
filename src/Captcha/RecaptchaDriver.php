<?php

namespace Lyrasoft\Luna\Captcha;

use DomainException;
use Lyrasoft\Luna\Captcha\Recaptcha\WindwalkerRequestMethod;
use Lyrasoft\Luna\Script\LunaScript;
use ReCaptcha\ReCaptcha;
use Windwalker\Core\Language\TranslatorTrait;

use function Windwalker\DOM\h;
use function Windwalker\uid;

/**
 * The RecaptchaDriver class.
 *
 * @since  1.5.1
 */
class RecaptchaDriver implements CaptchaDriverInterface
{
    use TranslatorTrait;

    /**
     * Property key.
     *
     * @var string
     */
    protected string $key;

    /**
     * Property secret.
     *
     * @var string
     */
    protected string $secret;

    /**
     * Property recaptcha.
     *
     * @var ?ReCaptcha
     */
    protected ?ReCaptcha $recaptcha = null;

    /**
     * Property type.
     *
     * @var  string
     */
    protected string $type;

    /**
     * RecaptchaDriver constructor.
     *
     * @param  string  $key
     * @param  string  $secret
     * @param  string  $type
     */
    public function __construct(
        protected LunaScript $lunaScript,
        string $key,
        string $secret,
        string $type = 'checkbox'
    ) {
        if (!class_exists(ReCaptcha::class)) {
            throw new DomainException('Please install google/recaptcha first.');
        }

        $this->key = $key;
        $this->secret = $secret;
        $this->type = $type;
    }

    /**
     * input
     *
     * @param  array  $attrs
     * @param  array  $options
     *
     * @return  string
     *
     * @since  1.5.1
     */
    public function input(array $attrs = [], array $options = []): string
    {
        $this->lunaScript->captcha();

        $attrs['class'] ??= 'g-recaptcha';

        $attrs['data-sitekey'] = $this->key;
        $attrs['class'] = 'g-recaptcha';

        if ($this->type === 'invisible') {
            $attrs['data-size'] = $this->type;
        }

        if ($this->type === 'invisible' || !empty($options['js_verify'])) {
            $attrs['data-callback'] = 'recaptchaCallback_' . uid();
        }

        $attrs['data-js-verify'] = $options['js_verify'] ? '1' : null;

        $attrs['uni-captcha-recaptcha'] = $this->type;

        return (string) h('div', $attrs);
    }

    /**
     * verify
     *
     * @param  mixed  $value
     * @param  array  $options
     *
     * @return bool
     *
     * @since  1.5.1
     */
    public function verify(mixed $value, array $options = []): bool
    {
        $code = $_POST['g-recaptcha-response'] ?? '';

        $server = $options['server'] ?? $_SERVER;
        $ip = $server['REMOTE_ADDR'] ?? null;

        $recaptcha = $this->getRecaptchaInstance();

        $response = $recaptcha->verify($code, $ip);

        return $response->isSuccess();
    }

    /**
     * getRecaptchaInstance
     *
     * @return  ReCaptcha
     *
     * @since  1.5.1
     */
    public function getRecaptchaInstance(): ReCaptcha
    {
        return $this->recaptcha ??= new ReCaptcha($this->secret, new WindwalkerRequestMethod());
    }
}
