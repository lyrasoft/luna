import { Column, Row } from '../../types';
type __VLS_Props = {
    value: Row;
    child?: boolean;
    moveHandle?: string;
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    delete: () => any;
    duplicate: (data?: Row | undefined) => any;
    "columns-change": (args_0: {
        columns: Column[];
    }) => any;
    "add-new": () => any;
    "open-templates": () => any;
    "paste-page": (data: Row[]) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDelete?: (() => any) | undefined;
    onDuplicate?: ((data?: Row | undefined) => any) | undefined;
    "onColumns-change"?: ((args_0: {
        columns: Column[];
    }) => any) | undefined;
    "onAdd-new"?: (() => any) | undefined;
    "onOpen-templates"?: (() => any) | undefined;
    "onPaste-page"?: ((data: Row[]) => any) | undefined;
}>, {
    child: boolean;
    moveHandle: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
