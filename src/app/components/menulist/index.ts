import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscModule } from '../misc/index';
import { TlMenuList } from './menulist';

export * from './menulist';

@NgModule( {
  imports: [
    CommonModule,
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
