/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  Component, OnDestroy, Input, Output, Optional, Inject, ViewChild, AfterViewInit, OnChanges, Renderer2,
  ChangeDetectionStrategy, AfterContentInit, EventEmitter, QueryList, ViewChildren,
} from '@angular/core';
import { SearchableHighlightDirective } from './directives/searchable-highlight.directive';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterService } from '../filter.service';

@Component( {
  selector: 'tl-filter-container',
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'filterContainer',
} )
export class TlFilterContainer implements AfterContentInit, OnDestroy {

  constructor( private filterService: FilterService) {}
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
      const filter = this.search( term );
      this.filter.emit( filter );
    } );
  }

  search( searchTerm: string ) {
    if (this.lazyMode) {
      return searchTerm;
    }
    const filtered = [];
    this.source.forEach( ( value ) => {
      if ( String( value[ this.searchBy ].toLowerCase() ).indexOf( String(searchTerm.toLowerCase().trim()) ) > -1 ) {
        filtered.push(value);
      }
    } );
    return filtered;
  }

  private handleHighlighters( token, searchTerm: string ) {
    const highlighters = this.filterService.getHighlighters();
    for (let i = 0; i < highlighters.length; i++) {
      highlighters[i].highlight( token, searchTerm );
    }
  }

  ngOnDestroy() {

  }

}
