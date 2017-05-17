import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlMultiselect } from './multiselect';

export * from './multiselect';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlMultiselect,
  ],
  exports: [
    TlMultiselect,
  ]
})
export class MultiselectModule {}
