/*
    MIT License

    Copyright (c) 2017 Temainfo Sistemas

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import { Injectable } from '@angular/core';
import { TlDatatable } from '../datatable';
import { TlDatatableColumn } from '../parts/column/datatable-column';

@Injectable()
export class TlDatatableColumnService {

    private dt: TlDatatable;

    onInitColumnService(datatable: TlDatatable) {
        this.dt = datatable;
    }

    setColumns() {
        this.exitsColumns() ? this.getColumnsFromContentChield() : this.getColumnsFromDataSource();
    }

    exitsColumns() {
        return ( ( this.dt.datatableColumns.length ) && ( this.dt.datatableColumns.first.field ) );
    }

    getColumnsFromDataSource() {
        if (this.dt.dataSourceService.datasource) {
            Object.keys( this.dt.dataSourceService.datasource[0] ).forEach( ( columnField ) => {
                this.dt.columns.push( this.buildNewDataTableColumn( columnField ) );
            })
        }
    }

    buildNewDataTableColumn(field) {
        const column = new TlDatatableColumn();
        column.title = field.toUpperCase();
        column.field = field;
        column.width = this.getWidthColumn() + '%';
        return column;
    }

    getWidthColumn() {
        const columnsTotal = Object.keys( this.dt.dataSourceService.datasource[0] ).length;
        const widthScrollbar = 10;
        return (this.dt.datatableBox.nativeElement.clientWidth - widthScrollbar) / columnsTotal;
    }

    getColumnsFromContentChield() {
        this.dt.datatableColumns.map( column => {
            this.dt.columns.push( column );
        } );
    }
}
