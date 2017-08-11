import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { DropDownListModule } from 'truly-ui/dropdownlist';

import { DropDownListDemo } from './dropdownlistdemo.component';
import { DropDownListDemoRoutingModule } from './dropdownlistdemo-routing.module';

@NgModule({
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
})
export class DropDownListDemoModule { }
