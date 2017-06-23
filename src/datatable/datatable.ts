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
import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { TlDatatableColumn } from './datatable-column';

@Component( {
    selector: 'tl-datatable',
    templateUrl: './datatable.html',
    styleUrls: ['./datatable.scss'],
})
export class TlDatatable implements AfterContentInit {

    @Input('data') data : any[];

    @Input('selectable') selectable : boolean;

    @Output() rowSelect : EventEmitter<any> = new EventEmitter();

    @Output() rowClick : EventEmitter<any> = new EventEmitter();

    @Output() rowDblclick : EventEmitter<any> = new EventEmitter();

    @ContentChildren(TlDatatableColumn) datatableColumns : QueryList<TlDatatableColumn>;

    @ViewChild('tbody') tbody : ElementRef;

    public columns : any[] = [];

    public tabindex = 0;

    ngAfterContentInit() {
        this.setColumns();
    }

    setColumns() {
        this.datatableColumns.map(column => {
            this.columns.push(column);
        });
    }

    getClassAlignment( alignment : string ) {
        if (!alignment) {
            return ''
        }
        return '-text' + alignment;
    }

    getObjectRow( row , index ) {
        return { row : row, index: index };
    }

    setTabIndex( value : number ) {
        this.tabindex = value
    }

    generateTabindex() {
        return this.tabindex++;
    }

    onKeydown( $event ) {
        $event.preventDefault();

        if ( $event.keyCode === 40 ) {
            this.tbody.nativeElement.children[this.tabindex + 1].focus();
            this.tabindex = this.tabindex + 1;
        }

        if ( $event.keyCode === 38 ) {
            this.tbody.nativeElement.children[this.tabindex - 1].focus();
            this.tabindex = this.tabindex - 1;
        }

    }

    onRowClick( row, index ) {
        this.setTabIndex( index );
        this.rowClick.emit( this.getObjectRow( row , index ) );
    }

    onRowSelect( row, index ) {
        this.rowSelect.emit( this.getObjectRow( row , index ) );
    }

    onRowDblclick( row , index ) {
        this.rowDblclick.emit( this.getObjectRow( row , index ) );
    }
}
