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
import { DataMetadata } from '../core/types/datametadata';

@Component({
    selector: 'tl-datatable',
    templateUrl: './datatable.html',
    styleUrls: [ './datatable.scss' ],
    encapsulation: ViewEncapsulation.Native
})
export class TlDatatable implements AfterContentInit, OnInit {

    @Input('data') data: DataMetadata | Array<any>;

    @Input('mode') mode = 'normal';

    @Input('lazy') lazy = false;

    @Input('rows') rows = 20;

    @Input('rowHeight') rowHeight = 25;

    @Input('height') height = '300px';

    @Input('selectable') selectable: boolean;

    @Input('globalFilter') globalFilter: any;

    @Input('globalFilterOptions') globalFilterOptions: DatatableFilterOptions;

    @Output('rowSelect') rowSelect: EventEmitter<any> = new EventEmitter();

    @Output('rowClick') rowClick: EventEmitter<any> = new EventEmitter();

    @Output('rowDblclick') rowDblclick: EventEmitter<any> = new EventEmitter();

    @Output('pageChange') pageChange: EventEmitter<any> = new EventEmitter();

    @Output('endRow') endRow: EventEmitter<any> = new EventEmitter();

    @ContentChildren( TlDatatableColumn ) datatableColumns: QueryList<TlDatatableColumn>;

    @ViewChild( 'tbody' ) tbody: ElementRef;

    @ViewChild('scrollBox') scrollBoxViewChild: ElementRef;

    public columns: any[] = [];

    public tabindex = 0;

    public pageNumber = 1;

    public page = 1;

    private globalFilterTimeout: any;

    private filtredData: any[];

    private datasource: any[];

    private _rowHeight: number;

    private scrollPosition : number;

    constructor( private render: Renderer2 ) {}

    ngOnInit() {
       this.updateDataSource( this.getData() );
       this._rowHeight = this.rowHeight;

       this.render.listen(window,'load', () =>{
            this.calcHeightRowTable();
       })

        this.render.listen(window,'resize', () =>{
            this.calcHeightRowTable();
        })
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

    getData() {
        if ( ( typeof this.data === 'object') && ( this.data[0] === undefined )) {
           return ( this.data as DataMetadata ).data
        }
        return this.data;
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



    onScroll($event) {
        let clientHeight = this.scrollBoxViewChild.nativeElement.clientHeight;
        let scrollTop = this.scrollBoxViewChild.nativeElement.scrollTop;
        let scrollHeight = this.scrollBoxViewChild.nativeElement.scrollHeight;
        let pageHeight = this.rows * this._rowHeight;
        let endRow = Math.round( ( clientHeight + scrollTop  ) / this._rowHeight   );

        this.emitChangePage({
            clientHeight: clientHeight,
            scrollTop: scrollTop,
            scrollHeight: scrollHeight,
            pageHeight: pageHeight,
            endRow: endRow,
        });

        this.emitEndRow({
            clientHeight: clientHeight,
            scrollTop: scrollTop,
            scrollHeight: scrollHeight,
            endRow: endRow,
        });

    }

    emitEndRow( dimensions ) {
         if ( dimensions.scrollTop >= (dimensions.scrollHeight - (dimensions.clientHeight)) ) {
             this.endRow.emit({endRow:dimensions.endRow})
         }
    }

    emitChangePage( dimensions ) {

        if ( this.scrollPosition < dimensions.scrollTop ){
            if ( (dimensions.scrollTop+dimensions.clientHeight) > (dimensions.pageHeight* this.pageNumber) ) {
                this.pageNumber ++;
                if (this.page < this.pageNumber){
                    this.page = this.pageNumber;
                    this.pageChange.emit({page:this.page});
                }
            }
        }

        if ( this.scrollPosition > dimensions.scrollTop ){
            if ( (dimensions.scrollTop+dimensions.clientHeight) < (dimensions.pageHeight* ( this.pageNumber - 1)) ) {
                this.pageNumber --;
                if (this.page > this.pageNumber){
                    this.page = this.pageNumber;
                    this.pageChange.emit({page:this.page});
                }

            }
        }

        this.scrollPosition = dimensions.scrollTop;
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

    calcHeightRowTable(){
        if ( this.tbody !== undefined) {

            this._rowHeight = this.rowHeight;
            let heightMax = this.rowHeight;

            for ( let i = 0; i < this.tbody.nativeElement.children.length; i++){
                if ( this.tbody.nativeElement.children[i].clientHeight > heightMax ){
                    heightMax = this.tbody.nativeElement.children[i].clientHeight;
                }
            }
            this._rowHeight = heightMax;
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
