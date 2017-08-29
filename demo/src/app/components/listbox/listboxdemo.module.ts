import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { ListBoxModule } from 'truly-ui/listbox';
import { InputModule } from 'truly-ui/input';
import { ListBoxDemo } from "./listboxdemo.component";
import { ListBoxDemoRoutingModule } from "./listboxdemo-routing.module";
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  declarations: [
    ListBoxDemo
  ],
  imports:[
    CommonModule,
    FormsModule,
    InputModule,
    HighlightJsModule,
    ListBoxDemoRoutingModule,
    ListBoxModule
  ],
  exports: [
    ListBoxDemo
  ]
})
export class ListBoxDemoModule {}
