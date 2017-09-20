import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlMultiSelect } from './multiselect';

export * from './multiselect';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlMultiSelect,
  ],
  exports: [
    TlMultiSelect,
  ]
})
export class MultiSelectModule {}
