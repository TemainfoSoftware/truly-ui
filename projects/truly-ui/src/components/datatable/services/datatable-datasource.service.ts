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

  constructor(services: { filter: TlDatatableFilterService, sort: TlDatatableSortService }, configuration: {
    dataSource, pageSize: number, recordsCount?: number
  } ) {
    super();
    this._pageSize = configuration.pageSize;
    this._recordsCount = configuration.recordsCount || configuration.dataSource.length;
    this._cachedData = configuration.dataSource;
    this._dataSource = configuration.dataSource;
    this._dataStream = new BehaviorSubject<( object | undefined )[]>( this._cachedData );

    this.filterService = services.filter;
    this.sortService = services.sort;
  }

  connect( collectionViewer: CollectionViewer ): Observable<( object | undefined )[] | ReadonlyArray<object | undefined>> {
    this._subscription.add( this.filterService.onFilter().subscribe(this.dispatchData.bind(this)) );
    this._subscription.add( this.sortService.onSort().subscribe(this.dispatchData.bind(this)) );
    this._subscription.add( collectionViewer.viewChange.subscribe( this.viewData.bind(this) ) );
    return this._dataStream;
  }

  disconnect( collectionViewer: CollectionViewer ): void {
    this._subscription.unsubscribe();
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
    this._cachedData = this.filterService.filterWithData(this._dataSource, false);
    this._cachedData = this.sortService.sortWithData(this._cachedData, false);
    this._cachedData.slice( page * this._pageSize, this._pageSize);
    this._dataStream.next( this._cachedData );
  }
}
