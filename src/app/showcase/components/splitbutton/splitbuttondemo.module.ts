import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { SplitButtonDemoComponent } from './splitbuttondemo.component';
import { SplitButtonDemoRoutingModule } from './splitbuttondemo-routing.module';
import { SplitButtonModule } from '../../../components/splitbutton';
import { ModalService } from '../../../components/modal';


@NgModule({
  declarations: [
    SplitButtonDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    SplitButtonDemoRoutingModule,
    SplitButtonModule
  ],
  exports: [
    SplitButtonDemoComponent
  ],
  providers: [
    ModalService
  ]
})
export class SplitButtonDemoModule { }
