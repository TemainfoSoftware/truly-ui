import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlIcons } from './icons';

import { TlDxIconComponent } from './parts/tl-dx-icon/tl-dx-icon.component';
import { TlFaIconComponent } from './parts/tl-fa-icon/tl-fa-icon.component';
import { TlIonIconComponent } from './parts/tl-ion-icon/tl-ion-icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlIcons,
    TlDxIconComponent,
    TlFaIconComponent,
    TlIonIconComponent
  ],
  exports: [
    TlIcons,
    TlDxIconComponent,
    TlFaIconComponent,
    TlIonIconComponent
  ]
})
export class IconsModule {}
