import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlIcons } from './icons';

import { DxIconComponent } from './parts/dx-icon/dx-icon.component';
import { FaIconComponent } from './parts/fa-icon/fa-icon.component';
import { TlIonIconComponent } from './parts/tl-ion-icon/tl-ion-icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlIcons,
    DxIconComponent,
    FaIconComponent,
    TlIonIconComponent
  ],
  exports: [
    TlIcons
  ]
})
export class IconsModule {}
