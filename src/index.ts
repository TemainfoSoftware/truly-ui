import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteModule } from './autocomplete/index';

export * from './autocomplete/index';

@NgModule({
  imports: [
    AutocompleteModule
  ]
})
export class TrulyModule {}
