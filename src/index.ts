import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteModule } from './autocomplete/index';
import { MultiselectModule } from './multiselect/index';
import { InputModule } from './input/index';

export * from './autocomplete/index';
export * from './multiselect/index';
export * from './input/index';

@NgModule({
  imports: [
    AutocompleteModule,
    MultiselectModule,
    InputModule
  ]
})
export class TrulyModule {}
