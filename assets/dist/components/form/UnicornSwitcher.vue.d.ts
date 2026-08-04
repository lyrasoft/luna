type __VLS_Props = {
    id?: string;
    classes?: string;
    name?: string;
    disabled?: boolean;
    trueValue?: boolean | string | number;
    falseValue?: boolean | string | number;
    size?: string;
    color?: string;
    shape?: string;
};
type __VLS_ModelProps = {
    modelValue: any;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: () => any;
    "update:modelValue": (value: any) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onClick?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {
    size: string;
    color: string;
    trueValue: boolean | string | number;
    falseValue: boolean | string | number;
    shape: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
