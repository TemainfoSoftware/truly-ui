import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { ModalDemo } from "./modaldemo.component";
import { ModalModule } from '../../../../../src/modal';
import { ModalDemoRoutingModule } from "./modaldemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';


@NgModule({
  declarations: [
    ModalDemo
  ],
  imports:[
    ModalDemoRoutingModule,
    ModalModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    ModalDemo
  ]
})
export class ModalDemoModule {}
