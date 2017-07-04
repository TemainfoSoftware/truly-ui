import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { SplitButtonDemo } from "./splitbuttondemo.component";
import { SplitButtonModule } from '../../../../../src/splitbutton';
import { SplitButtonDemoRoutingModule } from "./splitbuttondemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';


@NgModule( {
  declarations: [
    SplitButtonDemo
  ],
  imports: [
    SplitButtonDemoRoutingModule,
    SplitButtonModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    SplitButtonDemo
  ]
} )
export class SplitButtonDemoModule { }
