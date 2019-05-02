import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlContextMenu } from './context-menu';
import { TlSimpleSubMenu } from '../menu/parts/simple/simple-sub-menu';

import { MenuModule } from '../menu/index';
import { PopupMenuModule } from '../popupmenu/index';
import { ContextmenuService } from './contextmenu.service';

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
    TlSimpleSubMenu,
    TlContextMenu
  ],
  providers: [
    ContextmenuService
  ]
} )
export class ContextMenuModule {
}
