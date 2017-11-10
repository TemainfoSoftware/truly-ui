import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InputDemoComponent } from './inputdemo.component';
import { InputDemoRoutingModule } from './inputdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../components/input';
import { TooltipModule } from '../../../components/tooltip';

@NgModule({
  declarations: [
    InputDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputDemoRoutingModule,
    InputModule,
    TooltipModule
  ],
  exports: [
    InputDemoComponent
  ]
})
export class InputDemoModule {}
