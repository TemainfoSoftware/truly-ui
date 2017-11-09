import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { InputModule } from 'truly-ui/input';
import { ButtonModule } from 'truly-ui/button';
import { DatatableModule } from 'truly-ui/datatable';

import { DialogDemoComponent } from './dialogdemo.component';
import { DialogDemoRoutingModule } from './dialogdemo-routing.module';
import { DialogModule } from 'truly-ui/dialog';

@NgModule({
  declarations: [
    DialogDemoComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    DatatableModule,
    DialogDemoRoutingModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    DialogModule
  ],
  exports: [
    DialogDemoComponent,
  ],
})
export class DialogDemoModule {

}
