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
import type { TlDatatableFilterService } from './datatable-filter.service';
import type { TlDatatableSortService } from './datatable-sort.service';
import type { TlDatatable } from '../datatable';
import { SimpleChanges } from '@angular/core';

export class DatatableDataSource extends DataSource<object | undefined> {

  private _recordsCount: number;
  private _pageSize: number;
  private _cachedData: Array<object>;
  private _dataStream: BehaviorSubject<( object | undefined )[]>;

  private _fetchedPages = new Set<number>();
  private _subscription = new Subscription();

  private filterService: TlDatatableFilterService;
  private sortService: TlDatatableSortService;
  private datatable: TlDatatable;
  private currentPage: number;

  private navigating: boolean;

  get isEmpty() {
    return this._cachedData.length === 0;
  }

  constructor( datatable: TlDatatable ) {
    super();
    this._recordsCount = datatable.recordsCount;
    this._pageSize = datatable.rowsPage;
    this._cachedData = Array.from<object>({length: this._recordsCount});
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

  setNavigating( navigate ) {
    this.navigating = navigate;
    if ( !this.navigating ) {
      this.fetchPage( this.currentPage );
    }
  }

  changes( changes: SimpleChanges ) {
    if ( changes['rowsPage'] && changes['rowsPage'].currentValue ) {
      this._pageSize = changes['rowsPage'].currentValue;
    }

    if ( changes['recordsCount'] && changes['recordsCount'].currentValue ) {
      this._recordsCount = changes['recordsCount'].currentValue;
      this._cachedData = Array.from<object>({length: this._recordsCount});
      this._dataStream.next( this._cachedData );
    }

    if ( changes['data'] && changes['data'].currentValue ) {
      if (this.isInMemory()) {
        this._cachedData = changes['data'].currentValue;
        this._dataStream.next( this._cachedData );
      }
      this.dispatchData( changes['data'].currentValue );
    }
  }

  private onFilter( ) {
    if (this.isInMemory()) {
      this.dispatchData();
    } {
      this.emitLoadData();
    }
  }

  private onSort( ) {
    if (this.isInMemory()) {
      this.dispatchData();
    } {
      this.emitLoadData();
    }
  }

  private _getPageForIndex( index: number ): number {
    return Math.floor( index / this._pageSize );
  }


  private viewData(range) {
    const startPage = this._getPageForIndex( range.start );
    const endPage = this._getPageForIndex( range.end - 1 );
    for ( let i = startPage; i <= endPage; i++ ) {
      this.fetchPage( i );
    }
  }

  private fetchPage( page: number ) {
    this.currentPage = page;
    if ( this.navigating ) {
      return;
    }
    if ( this._fetchedPages.has( this.currentPage ) ) {
      return;
    }
    this.emitLoadData( page );
  }

  private dispatchData(data = this._cachedData) {
    if (this.isInMemory()) {
      const cached = this.sortService.sortWithData( this.filterService.filterWithData(data) );
      cached.slice( this.currentPage  * this._pageSize, this._pageSize);
      return this._dataStream.next( cached );
    }

    if (this.isInfinite() && data.length > 0 ) {
      this._cachedData.splice(this.currentPage  * this._pageSize, this._pageSize, ...data);
    } else {
      this._cachedData = data;
    }
    this._dataStream.next( this._cachedData );
  }

  private emitLoadData( page = this.currentPage ) {
    if (this.isInfinite()  ) {
      this.datatable.loadData.emit({
        skip: page * this._pageSize,
        take: this._pageSize,
        filters: this.filterService.getFilter(),
        sorts: this.sortService.getSort()
      });
      this._fetchedPages.add( page );
    }

  }

  private isInfinite() {
    return this.datatable.rowModel === 'infinite';
  }

  private isInMemory() {
    return this.datatable.rowModel === 'inmemory';
  }
}
