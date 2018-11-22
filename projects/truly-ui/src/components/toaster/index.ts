import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlToaster } from './parts/toaster';
import { ToasterService } from './services/toaster.service';

import { ProgressBarModule } from '../progressbar/index';
import { TlToasterContainer } from './toaster-container';
import { OverlayModule } from '@angular/cdk/overlay';

import { IconsModule } from '../icons/index';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    ProgressBarModule,
    OverlayModule,
    IconsModule
  ],
  declarations: [
    TlToaster,
    TlToasterContainer
  ],
  exports: [
    TlToaster,
    TlToasterContainer
  ],
  providers: [
    ToasterService
  ],
  entryComponents: [
    TlToasterContainer
  ]
} )
export class ToasterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToasterModule,
      providers: [
        ToasterService
      ],
    };
  }
}
