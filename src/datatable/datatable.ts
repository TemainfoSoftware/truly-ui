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
import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { TlDatatableColumn } from './datatable-column';
import { DatatableFilterOptions } from './datatable-filter-options';
import { KeyEvent } from '../core/enums/key-events';

@Component({
    selector: 'tl-datatable',
    templateUrl: './datatable.html',
    styleUrls: [ './datatable.scss' ],
    encapsulation: ViewEncapsulation.Native
})
export class TlDatatable implements AfterContentInit, OnInit {

    @Input('data') data: any[];

    @Input('mode') mode = 'normal';

    @Input('lazy') lazy = false;

    @Input('height') height = '300px';

    @Input('selectable') selectable: boolean;

    @Input('globalFilter') globalFilter: any;

    @Input('globalFilterOptions') globalFilterOptions: DatatableFilterOptions;

    @Output('rowSelect') rowSelect: EventEmitter<any> = new EventEmitter();

    @Output('rowClick') rowClick: EventEmitter<any> = new EventEmitter();

    @Output('rowDblclick') rowDblclick: EventEmitter<any> = new EventEmitter();

    @ContentChildren( TlDatatableColumn ) datatableColumns: QueryList<TlDatatableColumn>;

    @ViewChild( 'tbody' ) tbody: ElementRef;

    public columns: any[] = [];

    public tabindex = 0;

    private globalFilterTimeout: any;

    private filtredData: any[];

    private datasource: any[];

    constructor( private render: Renderer2 ) {}

    ngOnInit() {
        this.updateDataSource( this.data );
    }

    ngAfterContentInit() {
        this.setColumns();
        this.inicializeGlobalFilter();
    }

    setColumns() {
        this.exitsColumns() ? this.getColumnsFromContentChield() : this.getColumnsFromDataSource();
    }

    setTabIndex( value: number ) {
        this.tabindex = value;
    }

    getColumnsFromDataSource() {
        Object.keys( this.datasource[0] ).forEach( ( columnField ) => {
            this.columns.push( this.buildNewDataTableColumn( columnField ) );
        })
    }

    getColumnsFromContentChield() {
        this.datatableColumns.map( column => {
            this.columns.push( column );
        } );
    }

    getClassAlignment( alignment: string ) {
        return alignment ? '-text' + alignment : '';
    }

    getObjectRow( row , index ) {
        return { data : row, index: index };
    }

    isLastRow() {
        return this.tabindex + 1 > this.tbody.nativeElement.children.length - 1;
    }

    isFirstRow() {
        return this.tabindex === 0;
    }

    exitsColumns() {
        return ( ( this.datatableColumns.length ) && ( this.datatableColumns.first.field ) );
    }

    updateDataSource( data ) {
        this.datasource = data;
    }

    buildNewDataTableColumn(field) {
        const column = new TlDatatableColumn();
        column.title = field.toUpperCase();
        column.field = field;
        return column;
    }

    onKeydown( $event ) {
        $event.preventDefault();
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN: this.handleKeyArrowDown(); break;
            case KeyEvent.ARROWUP: this.handleKeyArrowUp(); break;
            case KeyEvent.HOME: this.handleKeyHome(); break;
            case KeyEvent.END: this.handleKeyEnd(); break;
        }
    }

    handleKeyHome() {
        this.tbody.nativeElement.children[ 0 ].focus();
        this.tabindex = 0 ;
    }

    handleKeyEnd() {
        const lenghtChildren = this.tbody.nativeElement.children.length;
        this.tbody.nativeElement.children[ lenghtChildren - 1 ].focus();
        this.tabindex = lenghtChildren - 1 ;
    }

    handleKeyArrowDown() {
        if ( this.isLastRow() )  {
            return ;
        }
        this.tbody.nativeElement.children[ this.tabindex + 1 ].focus();
        this.tabindex = this.tabindex + 1;
    }

    handleKeyArrowUp() {
        if ( this.isFirstRow() ) {
            return ;
        }
        this.tbody.nativeElement.children[ this.tabindex - 1 ].focus();
        this.tabindex = this.tabindex - 1;
    }

    onRowClick( row, index ) {
        this.setTabIndex( index );
        this.rowClick.emit( this.getObjectRow( row, index ) );
    }

    onRowSelect( row, index ) {
        this.rowSelect.emit( this.getObjectRow( row, index ) );
    }

    onRowDblclick( row, index ) {
        this.rowDblclick.emit( this.getObjectRow( row, index ) );
    }

    inicializeGlobalFilter() {
        if ( this.globalFilter ) {
           this.globalFilterTimeout = setTimeout( () => {
                this.render.listen(this.globalFilter.element.nativeElement, 'input', ( event ) => {
                    this.filter( event.target.value ) ;
                    this.globalFilterTimeout = null;
                })
            }, 0);
        }
    }

    filter( value: any ) {
        this.filtredData = [];

        if ( !value ) {
            this.updateDataSource( this.data );
            return ;
        }

        this.data.filter( ( row ) => {
            this.columns.forEach( (columnValue ) => {
                if ( this.isValidMatch( String(value), String(row[columnValue.field]) ) ) {
                  this.filtredData.push(row);
                }
            });
        });

        this.updateDataSource( this.filtredData );
    }

    isValidMatch( searchValue: string, valueMatch: string ) {
        if ( this.globalFilterOptions ) {
            if (!this.globalFilterOptions.caseSensitive )  {
                valueMatch = valueMatch.toLowerCase();
                searchValue = searchValue.toLowerCase();
            }
        }
        return this.matchWith( searchValue, valueMatch );
    }

    matchWith(searchValue, valueMatch) {
        if (this.globalFilterOptions) {
            switch (this.globalFilterOptions.mode) {
                case 'startsWith' : return (valueMatch).startsWith(searchValue);
                case 'endsWith' : return String(valueMatch).endsWith(searchValue);
                case 'contains' : return String(valueMatch).includes(searchValue);
                default: return String(valueMatch).includes(searchValue);
            }
        }
        return String(valueMatch).includes(searchValue);
    }
}
