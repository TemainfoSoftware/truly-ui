import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlDropDownList } from './dropdownlist';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { TabIndexService } from '../form/tabIndex.service';

import { InputModule } from '../input/index';

@NgModule( {
  imports: [
    CommonModule,
    InputModule,
    FormsModule
  ],
  declarations: [
    TlDropDownList
  ],
  exports: [
    TlDropDownList
  ],
  providers: [ IdGeneratorService, NameGeneratorService, TabIndexService ]
} )
export class DropDownListModule {
}
