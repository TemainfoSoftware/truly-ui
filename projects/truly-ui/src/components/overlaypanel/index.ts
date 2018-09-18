import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlOverlayPanel } from './overlay-panel';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule( {
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    TlOverlayPanel,
  ],
  exports: [
    TlOverlayPanel,
  ],
} )
export class OverlayPanelModule {
}
