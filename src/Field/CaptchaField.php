<?php

namespace Lyrasoft\Luna\Field;

use Lyrasoft\Luna\Captcha\CaptchaDriverInterface;
use Lyrasoft\Luna\Captcha\CaptchaManager;
use Windwalker\Core\Form\Exception\ValidateFailException;
use Windwalker\Core\Language\TranslatorTrait;
use Windwalker\DI\Attributes\Inject;
use Windwalker\DOM\HTMLElement;
use Windwalker\Form\Field\TextField;
use Windwalker\Form\ValidateResult;

/**
 * The CaptchaField class.
 *
 * @method  $this  autoValidate(bool $value = null)
 * @method  bool  isAutoValidate()
 * @method  $this  jsVerify(bool $value = null)
 * @method  bool  isJsVerify()
 * @method  $this  captchaOptions(array $value = null)
 * @method  $this  imageRoute(string|callable $value = null)
 * @method  mixed  getImageRoute()
 *
 * @since  1.5.1
 */
class CaptchaField extends TextField
{
    use TranslatorTrait;

    #[Inject]
    protected CaptchaManager $captchaManager;

    protected ?string $profile = null;

    /**
     * Property driver.
     *
     * @var CaptchaDriverInterface
     */
    protected CaptchaDriverInterface $driver;

    public function buildFieldElement(HTMLElement $input, array $options = []): string|HTMLElement
    {
        $options['profile'] = $this->getProfile();

        $input['value'] = '';

        return $this->getDriver()->input(
            $input->getAttributes(true),
            array_merge(
                $this->getCaptchaOptions(),
                $options
            )
        );
    }

    /**
     * validate
     *
     * @param  mixed  $value
     *
     * @return  ValidateResult
     */
    public function validate(mixed $value): ValidateResult
    {
        if ($this->isAutoValidate()) {
            $driver = $this->getDriver();

            if (!$driver->verify($value, $this->getCaptchaOptions())) {
                // Todo: Use ValidateResult after validation message done.
                throw new ValidateFailException(
                    $this->trans('luna.field.captcha.message.verify.fail')
                );
            }
        }

        $this->required(false);

        return parent::validate($value);
    }

    /**
     * getCaptchaOptions
     *
     * @return  array
     *
     * @since  1.5.2
     */
    protected function getCaptchaOptions(): array
    {
        $options = $this->get('captchaOptions');
        $options['js_verify'] = (bool) $this->isJsVerify();

        $route = $this->getImageRoute();

        if (is_callable($route)) {
            $route = $route($this, $options);
        }

        $options['route'] = (string) $route;

        return $options;
    }

    public function createDriver(): CaptchaDriverInterface
    {
        return $this->captchaManager->get($this->getProfile());
    }

    public function getDriver(): CaptchaDriverInterface
    {
        return $this->driver ??= $this->createDriver();
    }

    /**
     * @return string|null
     */
    public function getProfile(): ?string
    {
        return $this->profile;
    }

    /**
     * @param  string|null  $profile
     *
     * @return  static  Return self to support chaining.
     */
    public function profile(?string $profile): static
    {
        $this->profile = $profile;

        return $this;
    }

    /**
     * @inheritDoc
     */
    protected function getAccessors(): array
    {
        return array_merge(
            parent::getAccessors(),
            [
                'autoValidate',
                'jsVerify',
                'captchaOptions',
                'imageRoute',
            ]
        );
    }
}
