import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {ButtonDemoRoutingModule} from './buttondemo-routing.module';
import {ButtonDemoComponent} from './buttondemo.component';
import { ButtonModule } from '../../../components/button';
import { ModalService } from '../../../components/modal';

@NgModule({
  declarations: [
    ButtonDemoComponent
  ],
  imports: [
    ButtonDemoRoutingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    HighlightJsModule
  ],
  exports: [
    ButtonDemoComponent
  ],
  providers: [
    ModalService
  ]
})
export class ButtonDemoModule {}
