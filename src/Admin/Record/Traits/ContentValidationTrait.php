<?php
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2017 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

namespace Lyrasoft\Luna\Admin\Record\Traits;

use Windwalker\Core\Language\Translator;
use Windwalker\Core\Model\Exception\ValidateFailException;
use Windwalker\Record\Exception\NoResultException;
use Windwalker\Record\Record;

/**
 * The ContentValidationTrait class.
 *
 * @since  __DEPLOY_VERSION__
 */
trait ContentValidationTrait
{
    /**
     * checkParent
     *
     * @return  static
     * @throws \Windwalker\Core\Model\Exception\ValidateFailException
     */
    public function checkParent()
    {
        if ($this->id) {
            if ($this->id == $this->parent_id) {
                throw new ValidateFailException(__('phoenix.message.invalid.parent.id.is.self'));
            }

            $tree        = $this->getTree($this->id);
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
     * @throws \Windwalker\Core\Model\Exception\ValidateFailException
     */
    public function checkAlias($fieldName = 'alias', array $condFields = [])
    {
        /** @var Record $record */
        $record = new $this;

        $key = $this->getKeyName();

        $conditions[$fieldName] = $this->$fieldName;

        foreach ($condFields as $field) {
            $conditions[$field] = $this->$field;
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
