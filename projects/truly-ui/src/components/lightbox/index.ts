import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlLightbox } from './lightbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { LightboxService } from './services/lightbox.service';
import { IconsModule } from '../icons/index';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    FormsModule,
    IconsModule
  ],
  declarations: [
    TlLightbox
  ],
  exports: [
    TlLightbox
  ],
  providers: [ LightboxService ],
  entryComponents: [ TlLightbox ]
})
export class LightboxModule {}
