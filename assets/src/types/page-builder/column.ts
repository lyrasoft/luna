import { AnimationOptions, BackgroundOptions, BorderOptions, BoxShadowOptions, RwdOptions } from './shared';
import { Addon } from './addon';

export interface Column {
  id: string;
  disabled: boolean;
  addons: Addon[];
  options: {
    html_class: string;
    html_css: string;
    align: string;
    valign: string;
    padding: RwdOptions;
    margin: RwdOptions;
    text_color: string;
    width: RwdOptions;
    display: RwdOptions;
    box_shadow: BoxShadowOptions;
    border: BorderOptions;
    background: BackgroundOptions;
    animation: AnimationOptions;
  };

  [key: string]: any;
}
