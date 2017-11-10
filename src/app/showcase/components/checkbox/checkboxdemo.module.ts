import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CheckBoxDemoComponent } from './checkboxdemo.component';
import { CheckBoxDemoRoutingModule } from './checkboxdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { CheckBoxModule } from '../../../components/checkbox';

@NgModule({
  declarations: [
    CheckBoxDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighlightJsModule,
    CheckBoxDemoRoutingModule,
    CheckBoxModule
  ],
  exports: [
    CheckBoxDemoComponent
  ]
})
export class CheckBoxDemoModule {}
