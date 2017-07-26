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
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
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
import { DataMetadata } from '../core/types/datametadata';
import { noUndefined } from '@angular/compiler/src/util';



@Component({
    selector: 'tl-datatable',
    templateUrl: './datatable.html',
    styleUrls: [ './datatable.scss' ],
    encapsulation: ViewEncapsulation.Native
})
export class TlDatatable implements AfterContentInit, OnInit, OnChanges {

    @Input('data') data: DataMetadata | Array<any>;

    @Input('mode') mode = 'normal';

    @Input('lazy') lazy = false;

    @Input('rowsPage') rowsPage = 20;

    @Input('rowHeight') rowHeight = 25;

    @Input('height') height = '300px';

    @Input('globalFilter') globalFilter: any;

    @Input('globalFilterOptions') globalFilterOptions: DatatableFilterOptions;

    @Output('rowSelect') rowSelect: EventEmitter<any> = new EventEmitter();

    @Output('rowClick') rowClick: EventEmitter<any> = new EventEmitter();

    @Output('rowDblclick') rowDblclick: EventEmitter<any> = new EventEmitter();

    @Output('pageChange') pageChange: EventEmitter<any> = new EventEmitter();

    @Output('lazyLoad') lazyLoad: EventEmitter<any> = new EventEmitter();

    @Output('endRow') endRow: EventEmitter<any> = new EventEmitter();

    @ContentChildren( TlDatatableColumn ) datatableColumns: QueryList<TlDatatableColumn>;

    @ViewChild( 'tbody' ) tbody: ElementRef;


    public datasource: any[];

    public totalRow: number;

    public columns: any[] = [];

    public tabindex = 0;

    public filtredData: any[];

    public globalFilterTimeout: any;

    public rowHeightCalculated: number;

    constructor( private render: Renderer2 ) {}

    ngOnInit() {
        this.updateDataSource( this.getData() );
        this.setTotalRow();

        this.rowHeightCalculated = this.rowHeight;

        this.render.listen(window, 'load', () => {
            this.calcHeightRowTable();
        });

        this.render.listen(window, 'resize', () => {
            this.calcHeightRowTable();
        })
    }

    ngAfterContentInit() {
        this.setColumns();
        this.inicializeGlobalFilter();

    }

    ngOnChanges($event) {
        this.updateDataSource( this.getData($event) );
        this.setTotalRow();
    }

    setColumns() {
        this.exitsColumns() ? this.getColumnsFromContentChield() : this.getColumnsFromDataSource();
    }

    setTabIndex( value: number ) {
        this.tabindex = value;
    }

    getData($event?) {

        setTimeout( () => {
            if ($event !== undefined) {
                if (!$event.data.firstChange) {
                    const dataArray = [];
                    Array.prototype.push.apply( dataArray, $event.data.currentValue);
                    this.data = dataArray;
                    return this.data;
                }
            }

        });
        if ( ( typeof this.data === 'object') && ( this.data[0] === undefined )) {
           return ( this.data as DataMetadata ).data
        }
        return this.data;
    }

    setTotalRow() {
        this.totalRow = ( this.data as DataMetadata ).total !== undefined ? ( this.data as DataMetadata ).total : Array(this.data).length;
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

        ( this.data as Array<any> ).filter( ( row ) => {
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

    calcHeightRowTable() {
        if ( this.tbody !== undefined) {

            this.rowHeightCalculated = this.rowHeight;
            let heightMax = this.rowHeight;

            for ( let i = 0; i < this.tbody.nativeElement.children.length; i++) {
                if ( this.tbody.nativeElement.children[i].clientHeight > heightMax ) {
                    heightMax = this.tbody.nativeElement.children[i].clientHeight;
                }
            }
            this.rowHeightCalculated = heightMax;
        }
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
