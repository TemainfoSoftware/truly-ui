import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlDatatable } from './datatable';
import { TlDatatableColumn } from './datatable-column';
import { TlDatatableNormalMode } from './modes/normal/datatable-normal-mode';
import { TlDatatableScrollableMode } from './modes/scrollable/datatable-scrollable-mode';
import { TlDatatablePaginatorMode } from './modes/paginator/datatable-paginator-mode';

export * from './datatable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlDatatable,
        TlDatatableColumn,
        TlDatatableNormalMode,
        TlDatatablePaginatorMode,
        TlDatatableScrollableMode,
    ],
    exports: [
        TlDatatable,
        TlDatatableColumn,
        TlDatatableNormalMode,
        TlDatatablePaginatorMode,
        TlDatatableScrollableMode,
    ]
})
export class DatatableModule {}
