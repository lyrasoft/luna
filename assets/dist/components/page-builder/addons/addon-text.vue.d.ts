import { AddonProps } from '../../../composables';
import { AddonOptions } from '../../../types';
export interface AddonTextOptions {
    content: string;
    content_font_size: {
        lg: string;
        md: string;
        xs: string;
    };
    content_line_height: {
        lg: string;
        md: string;
        xs: string;
    };
}
type __VLS_Props = AddonProps;
type __VLS_ModelProps = {
    modelValue: AddonOptions & AddonTextOptions;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: AddonOptions & AddonTextOptions) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: AddonOptions & AddonTextOptions) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
