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
  Component, OnDestroy, Input, Output,
  AfterContentInit, EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import * as objectPath from 'object-path';

@Component( {
  selector: 'tl-filter-container',
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'filterContainer',
} )
export class TlFilterContainer implements AfterContentInit, OnDestroy {

  constructor() {
  }

  @Input( 'searchTerm' )
  set term( searchTerm: string ) {
    this._term = searchTerm || '';
    this.filtering.next( this._term );
  }

  get term() {
    return this._term;
  }

  @Input() source = [];

  @Input() searchBy = '';

  @Input() lazyMode = '';

  @Input() debounceTime = 200;

  @Output() filter: EventEmitter<any> = new EventEmitter();

  public filtering: Subject<any> = new Subject();

  private _term = '';

  ngAfterContentInit() {
    this.filtering.pipe(
      debounceTime( this.debounceTime ),
      distinctUntilChanged( ( oldValue, newValue ) => oldValue === newValue ),
    ).subscribe( ( term: string ) => {
      this.filter.emit( this.search( term ) );
    } );
  }

  search( searchTerm: string ) {
    if ( this.lazyMode ) {
      return searchTerm;
    }
    if (!this.searchBy) {
      throw Error('Property [searchBy] is null, declare a key to search on list');
    }
    const filtered = [];
    this.source.forEach( ( value ) => {
      if ( String( objectPath.get( value, this.searchBy ).toLowerCase() ).indexOf( String( searchTerm.toLowerCase().trim() ) ) > -1 ) {
        filtered.push( value );
      }
    } );
    return filtered.length > 0 ? filtered : null;
  }

  ngOnDestroy() {
  }

}
