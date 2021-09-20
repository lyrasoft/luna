<?php

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Attributes\Author;
use Lyrasoft\Luna\Attributes\Modifier;
use Lyrasoft\Luna\Attributes\Slugify;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Windwalker\Core\Generator\Event\BuildEntityPropertyEvent;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\ORM\Attributes\CreatedTime;
use Windwalker\ORM\Attributes\CurrentTime;
use Windwalker\Utilities\Options\OptionsResolverTrait;

/**
 * The EntityGenerateSubscriber class.
 */
#[EventSubscriber]
class EntityBuildingSubscriber
{
    use OptionsResolverTrait;

    public function __construct(array $options = [])
    {
        $this->resolveOptions(
            $options,
            function (OptionsResolver $resolver) {
                $resolver->define('slug_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('alias');

                $resolver->define('created_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('created');

                $resolver->define('modified_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('modified');

                $resolver->define('author_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('created_by');

                $resolver->define('modifier_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('modified_by');
            }
        );
    }

    #[ListenTo(BuildEntityPropertyEvent::class)]
    public function buildEntityProperty(BuildEntityPropertyEvent $event): void
    {
        $builder = $event->getEntityMemberBuilder();
        $column = $event->getColumn();
        $prop = $event->getProp();

        if ($column->columnName === $this->getOption('slug_column')) {
            $builder->addUse(Slugify::class);

            $prop->attrGroups[] = $builder->attributeGroup(
                $builder->attribute('Slugify'),
            );
        }

        if ($column->columnName === $this->getOption('author_column')) {
            $builder->addUse(Author::class);

            $prop->attrGroups[] = $builder->attributeGroup(
                $builder->attribute('Author'),
            );
        }

        if ($column->columnName === $this->getOption('modifier_column')) {
            $builder->addUse(Modifier::class);

            $prop->attrGroups[] = $builder->attributeGroup(
                $builder->attribute('Modifier'),
            );
        }

        if ($column->columnName === $this->getOption('created_column')) {
            $builder->addUse(CreatedTime::class);

            $prop->attrGroups[] = $builder->attributeGroup(
                $builder->attribute('CreatedTime'),
            );
        }

        if ($column->columnName === $this->getOption('modified_column')) {
            $builder->addUse(CurrentTime::class);

            $prop->attrGroups[] = $builder->attributeGroup(
                $builder->attribute('CurrentTime'),
            );
        }
    }
}
