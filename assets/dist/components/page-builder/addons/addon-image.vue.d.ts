import { AddonProps } from '../../../composables';
import { AddonOptions } from '../../../types';
export interface AddonImageOptions {
    image: string;
    border_radius: string;
    alt: string;
    link: string;
    link_target: string;
    align: '' | 'left' | 'center' | 'right';
}
type __VLS_Props = AddonProps;
type __VLS_ModelProps = {
    modelValue: AddonOptions & AddonImageOptions;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: AddonOptions & AddonImageOptions) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: AddonOptions & AddonImageOptions) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
