import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputModule } from '../input/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { TlOverlayList } from './overlay-list';
import { MiscModule } from '../misc/index';
import { TlListItem } from './list-item/list-item';

@NgModule( {
  imports: [
    MiscModule,
    CommonModule,
    InputModule,
    OverlayModule,
    A11yModule,
    FormsModule
  ],
  declarations: [
    TlOverlayList,
    TlListItem,
  ],
  exports: [
    TlOverlayList,
    TlListItem,
  ],
} )
export class OverlayListModule {
}
