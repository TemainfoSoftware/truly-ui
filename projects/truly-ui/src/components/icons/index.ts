import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlIcons } from './icons';

import { DxIconComponent } from './parts/dx-icon/dx-icon.component';
import { FaIconComponent } from './parts/fa-icon/fa-icon.component';
import { IonIconComponent } from './parts/ion-icon/ion-icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlIcons,
    DxIconComponent,
    FaIconComponent,
    IonIconComponent
  ],
  exports: [
    TlIcons
  ]
})
export class IconsModule {}
