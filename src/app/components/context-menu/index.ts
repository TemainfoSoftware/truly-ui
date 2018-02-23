import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlContextMenu } from './context-menu';
import { MenuModule } from '../menu/index';
import { TlMenuItem } from '../menu/parts/menu-item';

export * from './context-menu';

@NgModule( {
  imports: [
    CommonModule,
    MenuModule
  ],
  declarations: [
    TlContextMenu,
  ],
  exports: [
    TlContextMenu,
  ],
  entryComponents: [TlMenuItem]
} )
export class ContextMenuModule {
}
