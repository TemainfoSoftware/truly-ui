import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlContextMenu } from './context-menu';
import { TlContextMenuItem } from './parts/context-menu-item';

export * from './context-menu';

@NgModule( {
  imports: [
    CommonModule,
  ],
  declarations: [
    TlContextMenu,
    TlContextMenuItem,
  ],
  exports: [
    TlContextMenu,
    TlContextMenuItem
  ],
  entryComponents: [TlContextMenuItem]
} )
export class ContextMenuModule {
}
