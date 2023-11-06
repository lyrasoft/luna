<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\User\UserService;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Unicorn\Utilities\SlugHelper;
use Windwalker\Core\Application\ApplicationInterface;
use Windwalker\DI\Attributes\Inject;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\ORM\Event\BeforeSaveEvent;
use Windwalker\Utilities\Options\OptionsResolverTrait;

/**
 * The EntityDefaultValueSubscriber class.
 */
#[EventSubscriber]
class EntityDefaultValueSubscriber
{
    use OptionsResolverTrait;

    #[Inject]
    protected ApplicationInterface $app;

    public function __construct(array $options = [])
    {
        $this->resolveOptions(
            $options,
            function (OptionsResolver $resolver) {
                $resolver->define('slug_utf8')
                    ->allowedTypes('bool')
                    ->default(false);

                $resolver->define('title_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('title');

                $resolver->define('slug_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('alias');

                $resolver->define('author_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('created_by');

                $resolver->define('modifier_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('modified_by');
            }
        );
    }

    #[BeforeSaveEvent]
    public function beforeSave(BeforeSaveEvent $event): void
    {
        $data = &$event->getData();

        $col = $this->getOption('slug_column');
        $titleCol = $this->getOption('title_column');

        if (array_key_exists($col, $data) && !trim($data[$col])) {
            $data[$col] = SlugHelper::safe(
                $data[$col],
                $this->getOption('slug_utf8'),
                $data[$titleCol]
            );
        }

        $userService = $this->app->service(UserService::class);

        if (array_key_exists('created_by', $data) && !$data['created_by'] && $event->isCreate()) {
            $data['created_by'] = $userService->getUser()?->getId();
        }

        if (array_key_exists('modified_by', $data) && !$data['modified_by'] && $event->isUpdate()) {
            $data['modified_by'] = $userService->getUser()?->getId();
        }
    }
}
