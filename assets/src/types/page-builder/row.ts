import { AnimationOptions, BackgroundOptions, RwdOptions, TitleOptions } from '~luna/types';
import { Column } from './column';

export interface Row {
  id: string;
  disabled: boolean;
  options: {
    label: string;
    title: TitleOptions;
    subtitle: {
      text: string;
      font_size: RwdOptions;
    };
    html_id: string;
    html_class: string;
    html_css: string;
    title_align: string;
    valign: string;
    justify_content: string;
    fluid_row: boolean;
    no_gutter: boolean;
    padding: RwdOptions;
    margin: RwdOptions;
    display: RwdOptions;
    text_color: string;
    background: BackgroundOptions;
    animation: AnimationOptions;
  };
  columns: Column[];

  [key: string]: any;
}
