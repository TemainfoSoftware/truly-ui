import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {HighlightJsModule} from 'ngx-highlight-js';

import {ButtonModule} from 'truly-ui/button';
import {ModalService } from 'truly-ui/modal/modal.service';

import {ButtonDemoRoutingModule} from './buttondemo-routing.module';
import {ButtonDemoComponent} from './buttondemo.component';

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
