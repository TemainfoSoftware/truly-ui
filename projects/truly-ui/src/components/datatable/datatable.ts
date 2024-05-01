/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TlDatatableColumn } from './parts/column/datatable-column';
import { DatatableFilterOptions } from './configs/datatable-filter-options';
import { FilterOptionsService } from './services/datatable-filter-options.service';
import { TlDatatableFilterService } from './services/datatable-filter.service';
import { DatatableDataSource } from './services/datatable-datasource.service';
import { TlDatatableColumnService } from './services/datatable-column.service';
import { TlDatatableFilterConstraints } from './services/datatable-filter-constraints.service';
import { Observable, Subject } from 'rxjs';
import { TlDatatableSortService } from './services/datatable-sort.service';
import { DatatableHelpersService } from './services/datatable-helpers.service';
import { TlDatatableContent } from './parts/content/datatable-content';
import { ContextMenuInterface } from '../contextmenu/interfaces/context-menu.interface';

@Component( {
  selector: 'tl-datatable',
  templateUrl: './datatable.html',
  styleUrls: [ './datatable.scss' ],
  providers: [
    TlDatatableColumnService,
    TlDatatableFilterConstraints,
    TlDatatableFilterService,
    TlDatatableSortService,
    FilterOptionsService,
    DatatableHelpersService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class TlDatatable implements AfterContentInit, OnChanges {

  @Input( 'data' ) data: Array<any>;

  @Input( 'recordsCount' ) recordsCount = -1;

  @Input( 'mode' ) mode: 'scrollable' | 'paginator' = 'scrollable';

  @Input( 'rowModel' ) rowModel: 'inmemory' | 'infinite' = 'inmemory';

  @Input( 'contextMenuItems' ) contextMenuItems: ContextMenuInterface[];

  @Input( 'allowResize' ) allowResize = false;

  @Input( 'allowSortColumn' ) allowSortColumn = true;

  @Input( 'initializeFocus' ) initializeFocus = true;

  @Input( 'allowFilterColumn' ) allowFilterColumn = false;

  @Input( 'rowsPage' ) rowsPage = 30;

  @Input( 'rowHeight' ) rowHeight = 25;

  @Input( 'rowsClient' ) rowsClient = 12;

  @Input( 'height' ) height = 300;

  @Input( 'width' ) width = 300;

  @Input( 'globalFilter' ) globalFilter: any;

  @Input( 'globalFilterOptions' ) globalFilterOptions: DatatableFilterOptions;

  @Output( 'rowSelect' ) rowSelect: EventEmitter<any> = new EventEmitter();

  @Output( 'rowClick' ) rowClick: EventEmitter<any> = new EventEmitter();

  @Output( 'rowDblclick' ) rowDblclick: EventEmitter<any> = new EventEmitter();

  @Output( 'pageChange' ) pageChange: EventEmitter<any> = new EventEmitter();

  @Output( 'sortData' ) sortData: EventEmitter<any> = new EventEmitter();

  @Output( 'filterData' ) filterData: EventEmitter<any> = new EventEmitter();

  @Output( 'loadData' ) loadData: EventEmitter<any> = new EventEmitter();

  @Output( 'endRow' ) endRow: EventEmitter<any> = new EventEmitter();

  @ContentChildren( TlDatatableColumn ) datatableColumns: QueryList<TlDatatableColumn>;

  @ViewChild( 'tbody', { static: true } ) tbody: ElementRef;

  @ViewChild( 'datatableBox', { static: true } ) datatableBox: ElementRef;

  @ViewChild( TlDatatableContent, { static: true } ) datatableContent: TlDatatableContent;

  public dataSource = new DatatableDataSource( this );

  public columns: any[] = [];

  public heightViewPort = 0;

  public tabindex = 0;

  public scrollingHorizontalSubject = new Subject<any>();

  private loadingSubject = new Subject<any>();

  private _loading = false;
  set loading( value ) {
    this._loading = value;
    this.loadingSubject.next( value );
  }

  get loading() {
    return this._loading;
  }

  constructor( public columnService: TlDatatableColumnService,
               public filterService: TlDatatableFilterService,
               public sortService: TlDatatableSortService
  ) {}

  ngAfterContentInit() {
    this.calcDimensionsHeight();
    this.columnService.onInitColumnService( this );
    this.filterService.onInicializeFilterService( this );
    this.sortService.onInicializeSortService( this );
    this.columnService.setColumns();
  }

  ngOnChanges( changes: SimpleChanges ) {
    ( this.dataSource as DatatableDataSource ).changes( changes );
  }

  calcDimensionsHeight() {
    this.heightViewPort = this.allowFilterColumn ? this.height - 32 : this.height;
    this.heightViewPort -= 25;
    this.rowHeight = this.heightViewPort / this.rowsClient;
  }

  onRowClick( row, index ) {
    this.rowClick.emit( this.getObjectRow( row, index ) );
  }

  onRowSelect( row, index ) {
    this.rowSelect.emit( this.getObjectRow( row, index ) );
  }

  onChangeFilter( value ) {
    this.filterService.setFilter( value );
  }

  onChangeSort( sort ) {
    this.sortService.setSort( sort);
  }

  onKeydownFilter( event ) {
    this.filterService.keydownFilter.next(event);
  }

  onRowDblclick( row, index ) {
    this.rowDblclick.emit( this.getObjectRow( row, index ) );
  }

  setFocus() {
    this.datatableContent.setSelectedItem();
  }

  getScrollingHorizontal(): Observable<any> {
    return this.scrollingHorizontalSubject.asObservable();
  }

  getObjectRow( row, index ) {
    return { data: row, index: index };
  }
}
