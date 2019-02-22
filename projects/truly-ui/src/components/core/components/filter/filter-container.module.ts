import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlFilterContainer } from './filter-container';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TlFilterContainer
  ],
  exports: [
    TlFilterContainer
  ],
} )
export class FilterContainerModule {
}
