import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CheckBoxModule } from 'truly-ui/checkbox';
import { CheckBoxDemoComponent } from './checkboxdemo.component';
import { CheckBoxDemoRoutingModule } from './checkboxdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';

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
