import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlPermissions } from './permissions';
import { CheckBoxModule } from '../checkbox/index';
import { InputModule } from '../input/index';
import { PermissionGroupDirective } from './parts/directives/permission-group.directive';
import { A11yModule } from '@angular/cdk/a11y';
import { MiscModule } from '../misc/index';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    FormsModule,
    InputModule,
    CheckBoxModule,
    MiscModule
  ],
  declarations: [
    TlPermissions,
    PermissionGroupDirective
  ],
  exports: [
    TlPermissions,
    PermissionGroupDirective
  ]
})
export class PermissionsModule {}
