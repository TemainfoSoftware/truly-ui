import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { NewPersonComponent } from './newperson/newperson.component';
import { DataFormService } from './newperson/dataform.service';
import { FormDemoComponent } from './formdemo.component';
import { FormDemoRoutingModule } from './formdemo-routing.module';

import { DumpDataService } from '../../shared/services/dumpdata';
import { ButtonModule } from '../../../components/button';
import { RadioButtonModule } from '../../../components/radiobutton';
import { DatatableModule } from '../../../components/datatable';
import { DropDownListModule } from '../../../components/dropdownlist';
import { InputModule } from '../../../components/input';
import { CheckBoxModule } from '../../../components/checkbox';
import { FormModule } from '../../../components/form';
import { DialogModule } from '../../../components/dialog';
import { AutoCompleteModule } from '../../../components/autocomplete';
import { ModalModule } from '../../../components/modal';
import { TooltipModule } from '../../../components/tooltip';
import { MultiSelectModule } from '../../../components/multiselect';
import { DirectiveModule } from '../../../components/core/directives';

@NgModule({
  declarations: [
    NewPersonComponent,
    FormDemoComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    DatatableModule,
    DropDownListModule,
    InputModule,
    CheckBoxModule,
    FormDemoRoutingModule,
    FormModule,
    DialogModule,
    AutoCompleteModule,
    FormsModule,
    ModalModule,
    HighlightJsModule,
    TooltipModule,
    MultiSelectModule,
    DirectiveModule
  ],
  exports: [
    FormDemoComponent,
    NewPersonComponent,
  ],
  providers: [
    DumpDataService,
    DataFormService
  ],
  entryComponents: [
    NewPersonComponent
  ]
})
export class FormDemoModule {}
