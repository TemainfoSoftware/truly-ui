import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HighlightJsModule } from 'ngx-highlight-js';

import { PermissionsDemoRoutingModule } from './permissionsdemo-routing.module';
import { PermissionsDemoComponent } from './permissionsdemo.component';
import { PermissionsModule } from '../../../../projects/truly-ui/src/components/permissions';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    PermissionsDemoComponent
  ],
  imports: [
    PermissionsDemoRoutingModule,
    PermissionsModule,
    CommonModule,
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [
    PermissionsDemoComponent
  ]
})
export class PermissionsDemoModule {}
