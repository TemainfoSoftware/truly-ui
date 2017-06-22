import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlDatatable } from './datatable';
import { TlDatatableColumn } from './datatable-column';

export * from './datatable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlDatatable,
        TlDatatableColumn
    ],
    exports: [
        TlDatatable,
        TlDatatableColumn
    ]
})
export class DatatableModule {}
