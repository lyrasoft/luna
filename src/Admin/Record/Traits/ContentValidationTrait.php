<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 LYRASOFT.
 * @license    LGPL-2.0-or-later
 */

namespace Lyrasoft\Luna\Admin\Record\Traits;

use Windwalker\Core\Language\Translator;
use Windwalker\Core\Repository\Exception\ValidateFailException;
use Windwalker\Record\Exception\NoResultException;
use Windwalker\Record\Record;

/**
 * The ContentValidationTrait class.
 *
 * @since  1.3
 */
trait ContentValidationTrait
{
    /**
     * checkParent
     *
     * @return  static
     * @throws \Windwalker\Core\Repository\Exception\ValidateFailException
     */
    public function checkParent()
    {
        if ($this->id) {
            if ($this->id == $this->parent_id) {
                throw new ValidateFailException(__('phoenix.message.invalid.parent.id.is.self'));
            }

            $tree = $this->getTree($this->id);

            $childrenIds = array_column($tree, 'id');

            if (in_array($this->parent_id, $childrenIds)) {
                throw new ValidateFailException(__('phoenix.message.invalid.parent.id.is.child'));
            }
        }

        return $this;
    }

    /**
     * checkAlias
     *
     * @param string $fieldName
     * @param array  $condFields
     *
     * @return  static
     * @throws \Exception
     */
    public function checkAlias($fieldName = 'alias', array $condFields = [])
    {
        /** @var Record $record */
        $record = new $this();

        $key = $this->getKeyName();

        $conditions[$fieldName] = $this->$fieldName;

        foreach ($condFields as $field) {
            if ($this->hasField($field)) {
                $conditions[$field] = $this->$field;
            }
        }

        try {
            $record->load($conditions);

            if ($record->$key != $this->$key) {
                throw new ValidateFailException(Translator::sprintf('phoenix.message.same.alias', $this->$fieldName));
            }
        } catch (NoResultException $e) {
            //
        }

        return $this;
    }
}
