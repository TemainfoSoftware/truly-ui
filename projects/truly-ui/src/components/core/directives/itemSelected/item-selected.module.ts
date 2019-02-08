import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlItemSelectedDirective } from './item-selected.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TlItemSelectedDirective
  ],
  exports: [
    TlItemSelectedDirective
  ],
} )
export class ItemSelectedModule {
}
