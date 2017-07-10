import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { ButtonGroupDemo } from "./buttongroupdemo.component";
import { ButtonGroupModule } from '../../../../../src/buttongroup';
import { ButtonGroupDemoRoutingModule } from "./buttongroupdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';


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
  ]
} )
export class ButtonGroupDemoModule { }
