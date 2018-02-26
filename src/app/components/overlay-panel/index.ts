import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlOverlayPanel } from './overlay-panel';

export * from './overlay-panel';

@NgModule( {
  imports: [
    CommonModule,
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
