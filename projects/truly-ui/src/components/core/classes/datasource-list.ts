/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import { DataSourceInterface } from '../interfaces/datasource-list.interface';

export class DataSourceList extends DataSource<string | undefined> {

  public dataStream: BehaviorSubject<any>;

  public loadMoreData = new Subject();

  private totalLength = 0;

  private pageSize = 0;

  private lazyMode = false;

  private fetchedPages = new Set<number>();

  private cachedData = [];

  private subscription = new Subscription();

  private arrayTotal = [];

  private currentPage = 0;

  constructor( public config: DataSourceInterface ) {
    super();
    this.setProprieties(config);
    this.cachedData = this.config.dataSource;
    this.dataStream = new BehaviorSubject<(any | undefined)[]>( this.arrayTotal );
    this.resetData();
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

  addPage(page: number) {
    this.fetchedPages.add( page );
  }

  public setArray( value ) {
    this.arrayTotal.length = value;
    this.dataStream.next( this.arrayTotal );
  }

  public resetData() {
    this.arrayTotal = Array.from<string>({length: this.totalLength });
    this.dataStream.next( this.arrayTotal );
  }

  public resetPages() {
    this.fetchedPages = new Set<number>();
    this.fetchedPages.add(0);
  }

  private setProprieties(config) {
    Object.keys(config).forEach((value) => {
      this[value] = config[value];
    });
  }

  public getCachedData() {
    return this.cachedData;
  }

  public setData(data: Array<any>) {
    this.cachedData = data;
    this.arrayTotal.splice(this.currentPage * this.pageSize, this.pageSize,
        ...data);
    this.dataStream.next( this.arrayTotal );
  }

  private getPageForIndex( index: number ): number {
    return Math.floor( index / this.pageSize );
  }

  private emitCachedData(skip: number) {
    this.cachedData.slice( skip, this.pageSize );
    this.dataStream.next( this.cachedData );
  }

  private emitLoadData(skip: number) {
    this.loadMoreData.next( { skip: skip, limit: this.pageSize + skip } );
  }

  private fetchPage( page: number ) {
    this.currentPage = page;
    if ( this.fetchedPages.has( page ) ) {
      return;
    }
    this.addPage(page);
    const skip = page * this.pageSize;
    !this.lazyMode ? this.emitCachedData(skip) : this.emitLoadData(skip);
  }

}
