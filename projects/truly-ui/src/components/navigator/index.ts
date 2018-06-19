import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TlNavigator } from './navigator';
import { NavigatorService } from './services/navigator.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
