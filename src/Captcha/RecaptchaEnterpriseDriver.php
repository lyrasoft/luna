<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Captcha;

use Lyrasoft\Luna\Script\LunaScript;
use Windwalker\Http\HttpClient;

use function Windwalker\DOM\h;
use function Windwalker\uid;

/**
 * The RecaptchaEnterpriseDriver class, using reCAPTCHA Enterprise CreateAssessment API.
 *
 * @see  https://cloud.google.com/recaptcha/docs/create-assessment
 */
class RecaptchaEnterpriseDriver implements CaptchaDriverInterface
{
    public const ASSESSMENT_URL = 'https://recaptchaenterprise.googleapis.com/v1/projects/%s/assessments?key=%s';

    public const RESPONSE_FIELD = 'g-recaptcha-response';

    protected ?HttpClient $http = null;

    /**
     * RecaptchaEnterpriseDriver constructor.
     *
     * @param  LunaScript  $lunaScript
     * @param  string      $siteKey     reCAPTCHA Enterprise site key (the new key format is supported).
     * @param  string      $projectId   Google Cloud project ID.
     * @param  string      $apiKey      Google Cloud API key with reCAPTCHA Enterprise API enabled.
     * @param  string      $type        checkbox | invisible
     * @param  array       $options     Extra options: action (expected action name), min_score (float, default 0.5).
     */
    public function __construct(
        protected LunaScript $lunaScript,
        protected string $siteKey,
        protected string $projectId,
        protected string $apiKey,
        protected string $type = 'checkbox',
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
        $type = (string) ($options['type'] ?? $this->type);

        $attrs['class'] = trim('g-recaptcha ' . ($attrs['class'] ?? ''));
        $attrs['data-sitekey'] = $this->siteKey;

        if ($type === 'invisible') {
            $attrs['data-size'] = 'invisible';
        }

        if ($type === 'invisible' || !empty($options['js_verify'])) {
            $attrs['data-callback'] = 'recaptchaEnterpriseCallback_' . uid();
        }

        $attrs['data-js-verify'] = !empty($options['js_verify']) ? '1' : null;
        $attrs['uni-captcha-recaptcha-enterprise'] = $type;

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

        $options = array_merge($this->options, $options);

        $event = [
            'token' => $token,
            'siteKey' => $this->siteKey,
        ];

        if (!empty($options['action'])) {
            $event['expectedAction'] = (string) $options['action'];
        }

        $url = sprintf(
            self::ASSESSMENT_URL,
            rawurlencode($this->projectId),
            rawurlencode($this->apiKey),
        );

        $response = $this->getHttp()->post(
            $url,
            json_encode(['event' => $event], JSON_THROW_ON_ERROR),
            ['headers' => ['Content-Type' => 'application/json']],
        );

        if ($response->getStatusCode() !== 200) {
            return false;
        }

        $result = json_decode((string) $response->getBody(), true);

        if (!is_array($result)) {
            return false;
        }

        if (($result['tokenProperties']['valid'] ?? false) !== true) {
            return false;
        }

        if (!empty($event['expectedAction'])) {
            if (($result['tokenProperties']['action'] ?? '') !== $event['expectedAction']) {
                return false;
            }
        }

        $minScore = (float) ($options['min_score'] ?? 0.5);
        $score = (float) ($result['riskAnalysis']['score'] ?? 0.0);

        return $score >= $minScore;
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
