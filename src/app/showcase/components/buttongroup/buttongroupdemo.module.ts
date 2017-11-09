import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonGroupDemoComponent } from './buttongroupdemo.component';
import { ButtonGroupDemoRoutingModule } from './buttongroupdemo-routing.module';
import { ButtonGroupModule } from '../../../components/buttongroup';
import { ModalService } from '../../../components/modal';

@NgModule( {
  declarations: [
    ButtonGroupDemoComponent
  ],
  imports: [
    CommonModule,
    ButtonGroupDemoRoutingModule,
    ButtonGroupModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    ButtonGroupDemoComponent
  ],
  providers: [
    ModalService
  ]
})
export class ButtonGroupDemoModule {}
