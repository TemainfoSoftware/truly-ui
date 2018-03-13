import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlBackdrop } from './backdrop';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TlBackdrop
  ],
  exports: [
    TlBackdrop
  ],
} )
export class BackdropModule {
}
