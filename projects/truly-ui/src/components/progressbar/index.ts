import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlProgressBar } from './progressbar';

@NgModule( {
  imports: [
    CommonModule,
  ],
  declarations: [
    TlProgressBar,
  ],
  exports: [
    TlProgressBar,
  ],
} )
export class ProgressBarModule {
}
