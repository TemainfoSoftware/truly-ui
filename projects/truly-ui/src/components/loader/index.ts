import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlLoader } from './loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlLoader
  ],
  exports: [
    TlLoader
  ]
})
export class LoaderModule {}
