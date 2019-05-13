import {TemplateRef} from '@angular/core';

export interface ContextMenuInterface {
  label: string;
  icon?: string;
  callback?: Function;
  children?: ContextMenuInterface[];
  template?: TemplateRef<any>;
  iconColor?: string;
}

