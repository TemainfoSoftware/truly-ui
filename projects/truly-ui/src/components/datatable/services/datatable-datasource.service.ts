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

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TlDatatableFilterService } from './datatable-filter.service';
import { TlDatatableSortService } from './datatable-sort.service';
import { TlDatatable } from '../datatable';

export class DatatableDataSource extends DataSource<object | undefined> {

  private _recordsCount: number;
  private _pageSize: number;
  private _cachedData: Array<object>;
  private _dataSource: Array<object>;
  private _dataStream: BehaviorSubject<( object | undefined )[]>;

  private _fetchedPages = new Set<number>();
  private _subscription = new Subscription();

  private filterService: TlDatatableFilterService;
  private sortService: TlDatatableSortService;
  private datatable: TlDatatable;

  get isEmpty() {
    return this._cachedData.length === 0;
  }

  constructor( dataSource: Array<object>, datatable: TlDatatable ) {
    super();
    this._pageSize = datatable.rowsPage;
    this._cachedData = dataSource;
    this._dataSource = dataSource;
    this._recordsCount = datatable.recordsCount || dataSource.length;
    this._dataStream = new BehaviorSubject<( object | undefined )[]>( this._cachedData );

    this.datatable = datatable;
    this.filterService = datatable.filterService;
    this.sortService = datatable.sortService;
  }

  connect( collectionViewer: CollectionViewer ): Observable<( object | undefined )[] | ReadonlyArray<object | undefined>> {
    this._subscription.add( this.filterService.onFilter().subscribe(this.onFilter.bind(this)) );
    this._subscription.add( this.sortService.onSort().subscribe(this.onSort.bind(this)) );
    this._subscription.add( collectionViewer.viewChange.subscribe( this.viewData.bind(this) ) );
    return this._dataStream;
  }

  disconnect( collectionViewer: CollectionViewer ): void {
    this._subscription.unsubscribe();
  }

  private onFilter( filter ) {
    this.dispatchData(0);
    this.datatable.filterData.emit( filter );
  }

  private onSort( sort ) {
    this.dispatchData(0);
    this.datatable.sortData.emit( sort );
  }

  private _getPageForIndex( index: number ): number {
    return Math.floor( index / this._pageSize );
  }

  private fetchPage( page: number ) {
    if ( this._fetchedPages.has( page ) ) {
      return;
    }
    this._fetchedPages.add( page );
    this.dispatchData(page);
  }

  private viewData(range) {
    const startPage = this._getPageForIndex( range.start );
    const endPage = this._getPageForIndex( range.end - 1 );
    for ( let i = startPage; i <= endPage; i++ ) {
      this.fetchPage( i );
    }
  }

  private dispatchData(page = 0) {
    if (this.isInMemory()) {
      this._cachedData = this.filterService.filterWithData(this._dataSource, false);
      this._cachedData = this.sortService.sortWithData(this._cachedData, false);
      this._cachedData.slice( page * this._pageSize, this._pageSize);
    } else {
      this.datatable.loadData.emit({
        skip: page * this._pageSize,
        take: this._pageSize,
        filters: this.filterService.getFilter(),
        sorts: this.sortService.getSort()
      });
    }
    this._dataStream.next( this._cachedData );
  }

  private isInMemory() {
    return this.datatable.rowModel === 'inmemory';
  }
}
