import { TemplateCallback, TemplateItem } from '../../../types';
declare function open(cb: TemplateCallback, t: string, idx: number): void;
declare function openSave(content: any, t: string): void;
declare const __VLS_export: import('vue').DefineComponent<{}, {
    open: typeof open;
    openSave: typeof openSave;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    selected: (item: TemplateItem<string>, type: string, i: number) => any;
}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{
    onSelected?: ((item: TemplateItem<string>, type: string, i: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
