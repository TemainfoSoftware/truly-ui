import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlAutocomplete } from './autocomplete';

export * from './autocomplete';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlAutocomplete,
  ],
  exports: [
    TlAutocomplete,
  ]
})
export class AutocompleteModule {}
