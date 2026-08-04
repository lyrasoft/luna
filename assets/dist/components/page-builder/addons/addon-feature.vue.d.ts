import { AddonProps } from '../../../composables';
import { AddonOptions, RwdOptions } from '../../../types';
export interface AddonFeatureOptions {
    link: string;
    link_element: 'title' | 'icon' | 'both';
    layout_type: 'icon' | 'image';
    image: string;
    icon: {
        name: string;
        border: {
            width: RwdOptions<number>;
            color: string;
            style: string;
            radius: RwdOptions<number>;
        };
        font_size: RwdOptions<string>;
        color: string;
        bg_color: string;
        margin_top: RwdOptions<string>;
        margin_bottom: RwdOptions<string>;
        padding: RwdOptions<string>;
    };
    content: string;
    content_font_size: RwdOptions<string>;
    content_line_height: RwdOptions<string>;
}
type __VLS_Props = AddonProps;
type __VLS_ModelProps = {
    modelValue: AddonOptions & AddonFeatureOptions;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: AddonOptions & AddonFeatureOptions) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: AddonOptions & AddonFeatureOptions) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
