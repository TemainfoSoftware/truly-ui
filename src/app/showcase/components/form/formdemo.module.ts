import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { ModalToolbarModule } from '../../../components/modal/addons/modal-toolbar';

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
import { TooltipModule } from '../../../components/tooltip';
import { MultiSelectModule } from '../../../components/multiselect';
import { MiscModule } from '../../../components/misc';
import { PanelGroupModule } from '../../../components/panelgroup/index';
import { TabControlModule } from '../../../components/tabcontrol/index';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { DatePickerModule } from '../../../components/datepicker/index';
import { ValidatorsModule } from '../../../components/validators/index';
import { HighlightModule } from 'ngx-highlightjs';

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
    HighlightModule.forRoot(),
    DropDownListModule,
    InputModule,
    ValidatorsModule,
    CheckBoxModule,
    FormDemoRoutingModule,
    FormModule,
    TabControlModule,
    DialogModule,
    AutoCompleteModule,
    FormsModule,
    DatePickerModule,
    PanelGroupModule,
    ModalToolbarModule,
    HighlightJsModule,
    TooltipModule,
    MultiSelectModule,
    MiscModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    FormDemoComponent,
    NewPersonComponent,
  ],
  providers: [
    DumpDataService,
    DataFormService,
  ],
  entryComponents: [
    NewPersonComponent
  ]
})
export class FormDemoModule {}
