/*
 *
 *     MIT License
 *
 *     Copyright (c) 2019 Temainfo Sistemas
 *
 *     Permission is hereby granted, free of charge, to any person obtaining a copy
 *     of this software and associated documentation files (the "Software"), to deal
 *     in the Software without restriction, including without limitation the rights
 *     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *     copies of the Software, and to permit persons to whom the Software is
 *     furnished to do so, subject to the following conditions:
 *     The above copyright notice and this permission notice shall be included in all
 *     copies or substantial portions of the Software.
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *     SOFTWARE.
 * /
 */

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export class DataSourceClass extends DataSource<object | undefined> {

  private readonly _cachedData: Array<object>;

  private readonly _dataStream: BehaviorSubject<( object | undefined )[]>;

  private readonly _changePage = new BehaviorSubject( 0 );

  private _pageSize: number;

  private _fetchedPages = new Set<number>();

  private _subscription = new Subscription();

  constructor( bufferSize: number, pageSize: number ) {
    super();
    this._pageSize = pageSize;
    this._cachedData = Array.from<object>({length: bufferSize});
    this._dataStream = new BehaviorSubject<( object | undefined )[]>( this._cachedData );
  }

  connect( collectionViewer: CollectionViewer ): Observable<( object | undefined )[] | ReadonlyArray<object | undefined>> {
    this._subscription.add( collectionViewer.viewChange.subscribe( this.viewData.bind(this) ) );
    return this._dataStream;
  }

  disconnect( collectionViewer: CollectionViewer ): void {
    this._subscription.unsubscribe();
  }

  placeData( page, data ) {
    this._cachedData.splice(page  * this._pageSize, this._pageSize, ...data);
  }

  private getPageForIndex( index: number ): number {
    return Math.floor( index / this._pageSize );
  }

  private viewData(range) {
    const startPage = this.getPageForIndex( range.start );
    const endPage = this.getPageForIndex( range.end - 1 );
    for ( let i = startPage; i <= endPage; i++ ) {
      this.fetchPage( i );
    }
  }

  private fetchPage( page: number ) {
    if ( this._fetchedPages.has( page ) ) {
      return;
    }
    this._fetchedPages.add( page );
    this._changePage.next(page);
  }

}
