import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlMenu } from './menu';
import { TlMenuItem } from './parts/menu-item';
import { MiscModule } from '../misc/index';

export * from './menu';

@NgModule( {
  imports: [
    CommonModule,
    MiscModule
  ],
  declarations: [
    TlMenu,
    TlMenuItem
  ],
  exports: [
    TlMenu,
    TlMenuItem
  ],
  entryComponents: [TlMenuItem]
} )
export class MenuModule {}
