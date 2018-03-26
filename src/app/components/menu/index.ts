import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscModule } from '../misc/index';
import { TlMenu } from './menu';

export * from './menu';

@NgModule( {
  imports: [
    CommonModule,
    MiscModule
  ],
  declarations: [
    TlMenu,
  ],
  exports: [
    TlMenu,
  ],
} )
export class MenuModule {}
