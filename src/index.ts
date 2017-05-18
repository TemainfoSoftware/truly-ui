import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteModule } from './autocomplete/index';
import { MultiselectModule } from './multiselect/index';

export * from './autocomplete/index';
export * from './multiselect/index';

@NgModule({
  imports: [
    AutocompleteModule,
    MultiselectModule
  ]
})
export class TrulyModule {}
