import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlDatatable } from './datatable';
import { TlDatatableColumn } from './parts/column/datatable-column';
import { TlDatatableHeader } from './parts/header/datatable-header';
import { TlDatatableNormalMode } from './modes/normal/datatable-normal-mode';
import { TlDatatableScrollableMode } from './modes/scrollable/datatable-scrollable-mode';
import { TlDatatablePaginatorMode } from './modes/paginator/datatable-paginator-mode';
import { TlColgroupDirective } from './directives/colgroup.directive';
import { TlResizerDirective } from './directives/resizer.directive';
import { TlDatatabaleColumnFilter } from './parts/column-filter/datatable-column-filter';

import { IconsModule } from '../icons/index';
import { InputModule } from '../input/index';
import { BlockUIModule } from '../blockui/index';
import { DropDownListModule } from '../dropdownlist/index';
import { DropDownIconModule } from '../dropdownicon/index';
import { CellTemplateDirective } from './directives/cell-template.directive';
import { TlDatatableRow } from './parts/column/datatable-row';
import { TlDatatableCell } from './parts/datatable-cell';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule,
    IconsModule,
    InputModule,
    DropDownIconModule,
    DropDownListModule
  ],
  declarations: [
    TlColgroupDirective,
    TlDatatable,
    TlDatatableColumn,
    TlDatatabaleColumnFilter,
    TlDatatableHeader,
    TlDatatableNormalMode,
    TlDatatablePaginatorMode,
    TlDatatableScrollableMode,
    TlResizerDirective,
    CellTemplateDirective,
    TlDatatableCell,
    TlDatatableRow
  ],
  exports: [
    TlDatatable,
    TlDatatableColumn,
    CellTemplateDirective
  ]
} )
export class DatatableModule {
}
