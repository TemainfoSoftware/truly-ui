import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TlNavigator } from './navigator';
import { NavigatorService } from './services/navigator.service';
import { IconsModule } from '../icons/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule
  ],
  declarations: [
    TlNavigator,
  ],
  exports: [
    TlNavigator,
  ],
  providers: [
    NavigatorService
  ]
})
export class NavigatorModule {}
