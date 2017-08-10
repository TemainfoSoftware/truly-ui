import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { ButtonGroupModule } from 'truly-ui/buttongroup';
import { ModalService } from "truly-ui/modal/modal.service";

import { ButtonGroupDemo } from "./buttongroupdemo.component";
import { ButtonGroupDemoRoutingModule } from "./buttongroupdemo-routing.module";

@NgModule( {
  declarations: [
    ButtonGroupDemo
  ],
  imports: [
    CommonModule,
    ButtonGroupDemoRoutingModule,
    ButtonGroupModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    ButtonGroupDemo
  ],
  providers: [
    ModalService
  ]
})
export class ButtonGroupDemoModule {}
