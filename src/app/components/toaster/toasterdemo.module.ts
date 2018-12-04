import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { ToasterDemoRoutingModule } from './toasterdemo-routing.module';
import { ToasterDemoComponent } from './toasterdemo.component';
import { ButtonModule } from '../../../../projects/truly-ui/src/components/button';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { RadioButtonModule } from '../../../../projects/truly-ui/src/components/radiobutton/index';
import { InputModule } from '../../../../projects/truly-ui/src/components/input/index';
import { DropDownListModule } from '../../../../projects/truly-ui/src/components/dropdownlist/index';
import { CheckBoxModule } from '../../../../projects/truly-ui/src/components/checkbox/index';
import { PanelGroupModule } from '../../../../projects/truly-ui/src/components/panelgroup/index';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule( {
  declarations: [
    ToasterDemoComponent
  ],
  imports: [
    ToasterDemoRoutingModule,
    ButtonModule,
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
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    ToasterDemoComponent
  ]
} )
export class ToasterDemoModule {
}
