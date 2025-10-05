/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
declare function lunaAddonMixin(props: any, { emit }: {
    emit: any;
}, state: any): any;
declare namespace lunaAddonMixin {
    var props: {
        modelValue: ObjectConstructor;
        addonId: StringConstructor;
    };
}
export default lunaAddonMixin;
