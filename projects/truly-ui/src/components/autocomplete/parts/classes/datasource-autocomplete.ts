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
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { DataSourceInterface } from '../interfaces';

export class DataSourceAutocomplete extends DataSource<string | undefined> {
  public dataStream: BehaviorSubject<any>;

  public loadMoreData = new Subject();

  private totalLength = 0;

  private pageSize = 0;

  private lazyMode = false;

  private fetchedPages = new Set<number>();

  private cachedData = [];

  private subscription = new Subscription();

  constructor( public config: DataSourceInterface ) {
    super();
    this.totalLength = this.config.totalLength;
    this.pageSize = this.config.pageSize;
    this.lazyMode = this.config.lazyMode;
    this.cachedData = this.config.dataSource;
    this.dataStream = new BehaviorSubject<(any | undefined)[]>( this.cachedData );
  }

  connect( collectionViewer: CollectionViewer ): Observable<(string | undefined)[]> {
    this.subscription.add( collectionViewer.viewChange.subscribe( range => {
      const startPage = this.getPageForIndex( range.start );
      const endPage = this.getPageForIndex( range.end - 1 );
      for ( let i = startPage; i <= endPage; i++ ) {
        this.fetchPage( i );
      }
    } ) );
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex( index: number ): number {
    return Math.floor( index / this.pageSize );
  }

  private fetchPage( page: number ) {
    if ( this.fetchedPages.has( page ) ) {
      return;
    }
    this.fetchedPages.add( page );
    const skip = page * this.pageSize;
    this.cachedData.slice( skip, this.pageSize );

    if ( !this.lazyMode ) {
      this.dataStream.next( this.cachedData );
    } else {
      this.loadMoreData.next( { skip: skip, limit: this.pageSize } );
    }
  }
}
