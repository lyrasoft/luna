type __VLS_Props = {
    id?: string;
    data?: any[];
    min?: number;
    max?: number;
    step?: number;
    inputWidth?: string;
    lazy?: boolean;
    disabled?: boolean;
};
type __VLS_ModelProps = {
    modelValue: number | string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | number) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}>, {
    disabled: boolean;
    inputWidth: string;
    lazy: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
