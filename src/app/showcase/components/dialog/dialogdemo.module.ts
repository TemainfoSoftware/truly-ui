import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { DialogDemoComponent } from './dialogdemo.component';
import { DialogDemoRoutingModule } from './dialogdemo-routing.module';
import { ButtonModule } from '../../../components/button';
import { DatatableModule } from '../../../components/datatable';
import { InputModule } from '../../../components/input';
import { DialogModule } from '../../../components/dialog';

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
