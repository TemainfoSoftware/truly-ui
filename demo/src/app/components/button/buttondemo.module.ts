import {CommonModule} from '@angular/common';
import {NgModule} from "@angular/core";
import {FormsModule} from '@angular/forms';

import {ButtonDemo} from "./buttondemo.component";
import {ButtonModule} from '../../../../../src/button';
import {ButtonDemoRoutingModule} from "./buttondemo-routing.module";
import {HighlightJsModule} from 'ngx-highlight-js';
import { ModalService } from "../../../../../src/modal/modal.service";


@NgModule({
  declarations: [
    ButtonDemo
  ],
  imports: [
    ButtonDemoRoutingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    ButtonDemo
  ],
  providers: [ModalService]
})
export class ButtonDemoModule {
}
