import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { AutoCompleteModule } from '../../../../projects/truly-ui/src/components/autocomplete';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { CheckBoxModule } from '../../../../projects/truly-ui/src/components/checkbox';
import { DatatableModule } from '../../../../projects/truly-ui/src/components/datatable';
import { DatePickerModule } from '../../../../projects/truly-ui/src/components/datepicker';
import { DialogModule } from '../../../../projects/truly-ui/src/components/dialog';
import { DropDownListModule } from '../../../../projects/truly-ui/src/components/dropdownlist';
import { FormModule } from '../../../../projects/truly-ui/src/components/form';
import { InputModule } from '../../../../projects/truly-ui/src/components/input';
import { MiscModule } from '../../../../projects/truly-ui/src/components/misc';
import { ModalToolbarModule } from '../../../../projects/truly-ui/src/components/modal/addons/modal-toolbar';
import { MultiSelectModule } from '../../../../projects/truly-ui/src/components/multiselect';
import { PanelGroupModule } from '../../../../projects/truly-ui/src/components/panelgroup';
import { RadioButtonModule } from '../../../../projects/truly-ui/src/components/radiobutton';
import { TabControlModule } from '../../../../projects/truly-ui/src/components/tabcontrol';
import { TooltipModule } from '../../../../projects/truly-ui/src/components/tooltip';
import { ValidatorsModule } from '../../../../projects/truly-ui/src/components/validators';

import { NewPersonComponent } from './newperson/newperson.component';
import { DataFormService } from './newperson/dataform.service';
import { FormDemoComponent } from './formdemo.component';
import { FormDemoRoutingModule } from './formdemo-routing.module';

import { DumpDataService } from '../../shared/services/dumpdata';

import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
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
