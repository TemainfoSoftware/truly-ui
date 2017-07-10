import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { ButtonGroupDemo } from "./buttongroupdemo.component";
import { ButtonGroupModule } from '../../../../../src/buttongroup';
import { ButtonGroupDemoRoutingModule } from "./buttongroupdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';
import { ModalService } from "../../../../../src/modal/modal.service";


@NgModule( {
  declarations: [
    ButtonGroupDemo
  ],
  imports: [
    ButtonGroupDemoRoutingModule,
    ButtonGroupModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    ButtonGroupDemo
  ],
  providers: [ModalService]
} )
export class ButtonGroupDemoModule { }
