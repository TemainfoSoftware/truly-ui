import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlContextMenu } from './context-menu';
import { PopupMenuModule } from '../popupmenu/index';

export * from './context-menu';

@NgModule( {
  imports: [
    CommonModule,
    PopupMenuModule
  ],
  declarations: [
    TlContextMenu,
  ],
  exports: [
    TlContextMenu,
  ],
} )
export class ContextMenuModule {
}
