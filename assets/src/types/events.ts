import { ComponentInternalInstance } from '@vue/runtime-core';
import { Addon, Column, Row, TemplateCallback } from './page-builder';

export type PageBuilderCreatedEvent = [app: ComponentInternalInstance];
export type PageBuilderMountedEvent = [app: ComponentInternalInstance];
export type RowEditEvent = [content: Row];
export type RowSaveEvent = [content: Row];
export type ColumnEditEvent = [content: Column];
export type ColumnSaveEvent = [content: Column];
export type AddonAddEvent = [column: Column];
export type AddonEditEvent = [addon: Addon, column: Column];
export type AddonSaveEvent = [addon: Addon];
export type TemplateOpenEvent = [callback: TemplateCallback, type: string, i: number];
export type TemplateSaveEvent = [content: any, type: string];
