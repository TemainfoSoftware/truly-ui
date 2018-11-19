import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlBlockUI } from './blockui';
import { TlBlockUIComponent } from './blockui.component';
import { IconsModule } from '../icons/index';

@NgModule({
  imports: [
    CommonModule,
    IconsModule
  ],
  declarations: [
    TlBlockUI,
    TlBlockUIComponent
  ],
  exports: [
    TlBlockUI
  ],
  entryComponents: [
    TlBlockUIComponent
  ]
})
export class BlockUIModule {}
