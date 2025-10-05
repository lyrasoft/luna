import { Addon, Column, Row } from '~luna/types';

export type Page = Row[];
export interface TemplateItem<T = string> {
  id: number;
  title: string;
  type: string;
  description: string;
  image: string;
  content: T;
  created: string;
  created_by: number;
  modified: string;
  modified_by: number;
  params: any;
  [name: string]: any;
}

export type TemplatePossibleContent = Page | Row | Column | Addon;

export type TemplateCallback<T = string> = (item: TemplateItem<T>, type: string, i: number) => void;
