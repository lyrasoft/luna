import { AnimationOptions, BackgroundOptions, BorderOptions, BoxShadowOptions, RwdOptions, TitleOptions } from '..';
export interface AddonDefine {
    className: string;
    componentModuleUrl: string | null;
    componentName: string;
    description: string;
    icon: string;
    name: string;
    type: string;
}
export interface Addon {
    id: string;
    type: string;
    name: string;
    icon: string;
    description: string;
    componentModuleUrl: string;
    componentName: string;
    disabled?: boolean;
    options: AddonOptions;
    [key: string]: any;
}
export interface AddonOptions {
    html_class: string;
    html_css: string;
    label: string;
    title: TitleOptions;
    align: string;
    padding: RwdOptions;
    margin: RwdOptions;
    text_color: string;
    display: RwdOptions;
    box_shadow: BoxShadowOptions;
    border: BorderOptions;
    background: BackgroundOptions;
    animation: AnimationOptions;
    [key: string]: any;
}
