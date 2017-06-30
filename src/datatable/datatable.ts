/*
<<<<<<< Updated upstream
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
    ViewChild
} from '@angular/core';
import { TlDatatableColumn } from './datatable-column';
import { DatabaseFilterOptions } from './database-filter-options';

@Component( {
    selector: 'tl-datatable',
    templateUrl: './datatable.html',
    styleUrls: [ './datatable.scss' ]
} )
export class TlDatatable implements AfterContentInit, OnInit {

    @Input( 'data' ) data: any[];

    @Input( 'selectable' ) selectable: boolean;

    @Input('globalFilter') globalFilter: any;

    @Input('globalFilterOptions') globalFilterOptions: DatabaseFilterOptions;

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
        this.datatableColumns.map( column => {
            this.columns.push( column );
        } );
    }

    getClassAlignment( alignment: string ) {
        if ( !alignment ) {
            return '-text' + alignment;
        }
    }


    setTabIndex( value: number ) {
        this.tabindex = value;
    }

    getObjectRow( row , index ) {
        return { data : row, index: index };

    }

    onKeydown( $event ) {
        $event.preventDefault();

        if ( $event.keyCode === 40 ) {
            this.tbody.nativeElement.children[ this.tabindex + 1 ].focus();
            this.tabindex = this.tabindex + 1;
        }

        if ( $event.keyCode === 38 ) {
            this.tbody.nativeElement.children[ this.tabindex - 1 ].focus();
            this.tabindex = this.tabindex - 1;
        }

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
        console.log(this.filtredData.length);
        this.updateDataSource( this.filtredData );
    }


    isValidMatch( searchValue: string, valueMatch: string ) {
        if (!this.globalFilterOptions.caseSensitive) {
            valueMatch = valueMatch.toLowerCase();
            searchValue = searchValue.toLowerCase();
        }
        return this.matchWith( searchValue, valueMatch );
    }

    matchWith(searchValue, valueMatch) {
        switch (this.globalFilterOptions.mode) {
            case 'startsWith' : return (valueMatch).startsWith(searchValue);
            case 'endsWith' : return String(valueMatch).endsWith(searchValue);
            case 'contains' : return String(valueMatch).includes(searchValue);
            default: return String(valueMatch).includes(searchValue);
        }
    }

    updateDataSource( data ) {
        this.datasource = data;
    }

    generateTabindex() {
        return this.tabindex++;
    }
}
