import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ToasterDemoRoutingModule } from './toasterdemo-routing.module';
import { ToasterDemoComponent } from './toasterdemo.component';
import { ButtonModule } from '../../../components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ToasterModule } from '../../../components/toaster/index';
import { RadioButtonModule } from '../../../components/radiobutton/index';
import { InputModule } from '../../../components/input/index';
import { DropDownListModule } from '../../../components/dropdownlist/index';
import { CheckBoxModule } from '../../../components/checkbox/index';
import { PanelGroupModule } from '../../../components/panelgroup/index';

@NgModule( {
  declarations: [
    ToasterDemoComponent
  ],
  imports: [
    ToasterDemoRoutingModule,
    ButtonModule,
    ToasterModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    InputModule,
    DropDownListModule,
    PanelGroupModule,
    CheckBoxModule,
    RadioButtonModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    ToasterDemoComponent
  ]
} )
export class ToasterDemoModule {
}
