import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ListBoxDemoComponent } from './listboxdemo.component';
import { ListBoxDemoRoutingModule } from './listboxdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from '../../../components/input';
import { ListBoxModule } from '../../../components/listbox';

@NgModule({
  declarations: [
    ListBoxDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    HighlightJsModule,
    ListBoxDemoRoutingModule,
    ListBoxModule
  ],
  exports: [
    ListBoxDemoComponent
  ]
})
export class ListBoxDemoModule {}
