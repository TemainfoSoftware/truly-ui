import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlToaster } from './toaster';
import { ToasterService } from './services/toaster.service';
import { ProgressBarModule } from '../progressbar/index';

export * from './toaster';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    ProgressBarModule
  ],
  declarations: [
    TlToaster
  ],
  exports: [
    TlToaster
  ],
  providers: [
    ToasterService
  ],
  entryComponents: [
    TlToaster
  ]
} )
export class ToasterModule {}
