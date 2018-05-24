import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlPopupMenu } from './popupmenu';
import { TlPopupMenuItem } from './parts/popupmenu-item';
import { MiscModule } from '../misc/';

export * from './popupmenu';

@NgModule( {
  imports: [
    CommonModule,
    MiscModule
  ],
  declarations: [
    TlPopupMenu,
    TlPopupMenuItem
  ],
  exports: [
    TlPopupMenu,
    TlPopupMenuItem
  ],
  entryComponents: [TlPopupMenuItem]
} )
export class PopupMenuModule {}
