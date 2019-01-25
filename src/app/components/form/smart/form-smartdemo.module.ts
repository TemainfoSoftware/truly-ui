import { CommonModule  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';
import { FormSmartdemoComponent } from './form-smartdemo.component';
import { FormSmartDemoRoutingModule } from './form-smartdemo-routing.module';
import { ButtonModule } from '../../../../../projects/truly-ui/src/components/button/index';
import { RadioButtonModule } from '../../../../../projects/truly-ui/src/components/radiobutton/index';
import { DatatableModule } from '../../../../../projects/truly-ui/src/components/datatable/index';
import { DropDownListModule } from '../../../../../projects/truly-ui/src/components/dropdownlist/index';
import { InputModule } from '../../../../../projects/truly-ui/src/components/input/index';
import { ValidatorsModule } from '../../../../../projects/truly-ui/src/components/validators/index';
import { CheckBoxModule } from '../../../../../projects/truly-ui/src/components/checkbox/index';
import { FormModule } from '../../../../../projects/truly-ui/src/components/form/index';
import { TabControlModule } from '../../../../../projects/truly-ui/src/components/tabcontrol/index';
import { DialogModule } from '../../../../../projects/truly-ui/src/components/dialog/index';
import { AutoCompleteModule } from '../../../../../projects/truly-ui/src/components/autocomplete/index';
import { DatePickerModule } from '../../../../../projects/truly-ui/src/components/datepicker/index';
import { PanelGroupModule } from '../../../../../projects/truly-ui/src/components/panelgroup/index';
import { ModalToolbarModule } from '../../../../../projects/truly-ui/src/components/modal/addons/modal-toolbar/index';
import { TooltipModule } from '../../../../../projects/truly-ui/src/components/tooltip/index';
import { MultiSelectModule } from '../../../../../projects/truly-ui/src/components/multiselect/index';
import { MiscModule } from '../../../../../projects/truly-ui/src/components/misc/index';
import { ShowcaseCardModule } from '../../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../../shared/components/showcase-table-events/showcase-table-events.module';
import { DumpDataService } from '../../../shared/services/dumpdata';
import { MultiViewModule } from '../../../../../projects/truly-ui/src/components/multiview/index';
import { SmartFormModalComponent } from './smart-modal/smart-modal.component';
import { ShowcaseHeaderModule } from '../../../shared/components/showcase-header/showcase-header.module';
import { DateModule } from '../../../../../projects/truly-ui/src/components/date/index';


@NgModule({
  declarations: [
    FormSmartdemoComponent,
    SmartFormModalComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    DatatableModule,
    DropDownListModule,
    InputModule,
    ValidatorsModule,
    DateModule,
    CheckBoxModule,
    FormSmartDemoRoutingModule,
    MultiViewModule,
    FormModule,
    TabControlModule,
    DialogModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    PanelGroupModule,
    ModalToolbarModule,
    HighlightJsModule,
    TooltipModule,
    MultiSelectModule,
    MiscModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    FormSmartdemoComponent,
    SmartFormModalComponent
  ],
  providers: [
    DumpDataService,
  ],
  entryComponents: [ SmartFormModalComponent ]
})
export class FormSmartDemoModule {}
