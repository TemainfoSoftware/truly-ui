import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonGroupModule } from 'truly-ui/buttongroup/index';
import { ModalService } from 'truly-ui/modal/modal.service';

import { ButtonGroupDemoComponent } from './buttongroupdemo.component';
import { ButtonGroupDemoRoutingModule } from './buttongroupdemo-routing.module';

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
