import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlContextMenu } from './context-menu';
import { PopupMenuModule } from '../popupmenu/index';
import { TlSimpleSubMenu } from '../menu/parts/simple/simple-sub-menu';
import { MenuModule } from '../menu/index';

export * from './context-menu';

@NgModule( {
  imports: [
    CommonModule,
    PopupMenuModule,
    MenuModule
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
