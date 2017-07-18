import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { DropDownListDemo } from "./dropdownlistdemo.component";
import { DropDownListModule } from '../../../../../src/dropdownlist';
import { DropDownListDemoRoutingModule } from "./dropdownlistdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';


@NgModule( {
  declarations: [
    DropDownListDemo
  ],
  imports: [
    DropDownListDemoRoutingModule,
    DropDownListModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    DropDownListDemo
  ]
} )
export class DropDownListDemoModule { }
