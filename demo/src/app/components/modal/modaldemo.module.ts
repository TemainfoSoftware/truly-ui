import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { ModalDemo } from "./modaldemo.component";
import { ModalModule } from '../../../../../src/modal';
import { ModalDemoRoutingModule } from "./modaldemo-routing.module";
import { CommonModule  } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../../../src/input';
import { ButtonModule } from '../../../../../src/button';
import { CadPessoa } from "./cadastro2/cadPessoa.component";


@NgModule({
  declarations: [
    ModalDemo,
    CadPessoa,
  ],
  imports:[
    ModalDemoRoutingModule,
    ModalModule,
    InputModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    HighlightJsModule
  ],
  exports: [
    ModalDemo,
    CadPessoa
  ],
  entryComponents: [ CadPessoa ]
})
export class ModalDemoModule {}
