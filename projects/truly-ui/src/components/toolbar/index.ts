import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlToolbar } from './toolbar';

@NgModule( {
  imports: [
    CommonModule,
  ],
  declarations: [
    TlToolbar,
  ],
  exports: [
    TlToolbar,
  ],
} )
export class ToolbarModule {
}
