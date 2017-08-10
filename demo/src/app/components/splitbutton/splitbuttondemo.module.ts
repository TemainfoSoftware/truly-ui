import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { HighlightJsModule } from 'ngx-highlight-js';

import { ModalService } from "truly-ui/modal/modal.service";
import { SplitButtonModule } from 'truly-ui/splitbutton';

import { SplitButtonDemo } from "./splitbuttondemo.component";
import { SplitButtonDemoRoutingModule } from "./splitbuttondemo-routing.module";


@NgModule({
  declarations: [
    SplitButtonDemo
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    SplitButtonDemoRoutingModule,
    SplitButtonModule
  ],
  exports: [
    SplitButtonDemo
  ],
  providers: [
    ModalService
  ]
})
export class SplitButtonDemoModule { }
