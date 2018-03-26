import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscModule } from '../misc/index';
import { TlMenuList } from './menulist';
import { MenuModule } from '../menu/index';

export * from './menulist';

@NgModule( {
  imports: [
    CommonModule,
    MenuModule,
    MiscModule
  ],
  declarations: [
    TlMenuList,
  ],
  exports: [
    TlMenuList,
  ],
} )
export class MenuListModule {}
