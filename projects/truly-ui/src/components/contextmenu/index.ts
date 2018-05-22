import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlContextMenu } from './context-menu';
import { PopupMenuModule } from '../popupmenu/index';
import { TlSimpleSubMenu } from '../menu/parts/simple/simple-sub-menu';

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
  entryComponents: [
    TlSimpleSubMenu
  ]
} )
export class ContextMenuModule {
}
