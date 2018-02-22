import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlMenuItem } from './menu-item';

export * from './menu-item';

@NgModule( {
  imports: [
    CommonModule,
  ],
  declarations: [
    TlMenuItem,
  ],
  exports: [
    TlMenuItem
  ]
} )
export class MenuModule {}
