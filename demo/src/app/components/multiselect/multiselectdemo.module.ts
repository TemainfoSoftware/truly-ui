import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MultiSelectDemoComponent } from './multiselectdemo.component';
import { MultiSelectDemoRoutingModule } from './multiselectdemo-routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { MultiSelectModule } from 'truly-ui/multiselect';
import { DialogModule } from 'truly-ui/dialog';

@NgModule({
  declarations: [
    MultiSelectDemoComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    FormsModule,
    DialogModule,
    HighlightJsModule,
    MultiSelectDemoRoutingModule,
  ],
  exports: [
    MultiSelectDemoComponent
  ]
})
export class MultiSelectDemoModule {}
