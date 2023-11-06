<?php

declare(strict_types=1);

namespace Lyrasoft\Luna\Subscriber;

use Lyrasoft\Luna\Attributes\Author;
use Lyrasoft\Luna\Attributes\Modifier;
use Lyrasoft\Luna\Attributes\Slugify;
use MyCLabs\Enum\Enum;
use PhpParser\Node;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Unicorn\Attributes\OrderLast;
use Windwalker\Core\Generator\Event\BuildEntityMethodEvent;
use Windwalker\Core\Generator\Event\BuildEntityPropertyEvent;
use Windwalker\Event\Attributes\EventSubscriber;
use Windwalker\Event\Attributes\ListenTo;
use Windwalker\ORM\Attributes\CreatedTime;
use Windwalker\ORM\Attributes\CurrentTime;
use Windwalker\Utilities\Enum\EnumMetaInterface;
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

                $resolver->define('ordering_column')
                    ->allowedTypes('string', 'bool', 'null')
                    ->default('ordering');
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

    #[ListenTo(BuildEntityMethodEvent::class)]
    public function buildMethod(BuildEntityMethodEvent $event): void
    {
        $builder = $event->getEntityMemberBuilder();
        $method = $event->getMethod();
        $propName = $event->getPropName();
        $column = $event->getColumn();
        $shortName = $event->getTypeName();

        $factory = $builder->createNodeFactory();

        if ($event->isSetter()) {
            $className = $builder->findFQCN($shortName);

            // Enum can set pure value
            if ($className && class_exists($className) && $this->isEnum($className)) {
                if ($column) {
                    $subType = $column->isNumeric() ? 'int' : 'string';
                } else {
                    $subType = 'int|string';
                }

                $subType .= '|' . $shortName;

                $method->params[0] = $factory->param($propName)
                    ->setType($subType)
                    ->getNode();

                if (is_a($className, EnumMetaInterface::class, true)) {
                    $enum = $factory->staticCall(
                        new Node\Name($shortName),
                        'wrap',
                        [
                            new Node\Expr\Variable($propName),
                        ]
                    );
                } else {
                    $enum = $factory->new(
                        new Node\Name($shortName),
                        [
                            new Node\Expr\Variable($propName),
                        ]
                    );
                }

                $method->stmts[0] = new Node\Stmt\Expression(
                    new Node\Expr\Assign(
                        $factory->propertyFetch(
                            new Node\Expr\Variable('this'),
                            $propName
                        ),
                        $enum
                    )
                );
            }
        }
    }

    /**
     * @param  string  $className
     *
     * @return  bool
     */
    protected function isEnum(string $className): bool
    {
        return is_a($className, Enum::class, true)
            || is_a($className, \UnitEnum::class, true);
    }
}
