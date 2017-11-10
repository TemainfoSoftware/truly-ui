import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { TooltipDemoComponent } from './tooltipdemo.component';
import { TooltipDemoRoutingModule } from './tooltipdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../components/input';
import { TooltipModule } from '../../../components/tooltip';

@NgModule({
  declarations: [
    TooltipDemoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    TooltipDemoRoutingModule,
    TooltipModule
  ],
  exports: [
    TooltipDemoComponent,
  ]
})
export class TooltipDemoModule {}
