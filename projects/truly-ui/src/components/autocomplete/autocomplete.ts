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
  Component, Input, Optional, Inject, OnInit, OnChanges, ViewChildren,
  EventEmitter, Output, ChangeDetectorRef, QueryList, AfterViewInit, NgZone, ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { MakeProvider } from '../core/base/value-accessor-provider';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { DataSourceAutocomplete } from './parts/classes/datasource-autocomplete';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ListOptionDirective } from '../misc/listoption.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component( {
  selector: 'tl-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrls: [ './autocomplete.scss' ],
  providers: [ MakeProvider( TlAutoComplete ) ],
} )
export class TlAutoComplete extends ElementBase<string> implements OnInit, OnChanges, AfterViewInit {

  @Input() data = [];

  @Input() totalLength = 1000;

  @Input() pageSize = 100;

  @Input() lazyMode = false;

  @Input() itemSize = 50;

  @Input() debounceTime = 200;

  @Input() keyText = '';

  @Input() keyValue = '';

  @Input() labelPlacement: 'top' | 'left' = 'left';

  @Input() labelSize = '100px';

  @Input() height = '23px';

  @Input() searchBy = '';

  @Input() label = '';

  @Input() placeholder = 'Search...';

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @ViewChild( CdkVirtualScrollViewport ) cdkVirtualScroll: CdkVirtualScrollViewport;

  @ViewChildren( ListOptionDirective ) items: QueryList<ListOptionDirective>;

  public keyManager: FocusKeyManager<ListOptionDirective>;

  public dataSource: DataSourceAutocomplete;

  public model: NgModel;

  public selected = null;

  public isOpen = false;

  public focused = false;

  public positionOverlay;

  public nothingFound = false;

  public searchControl = new FormControl( '' );

  public messageLoading = 'Carregando...';

  public filtering = false;

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any>, private change: ChangeDetectorRef ) {
    super( validators, asyncValidators );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager( this.items );
    this.keyManager.withWrap();
  }

  handleKeyEvents( $event: KeyboardEvent ) {
    this.keyManager.onKeydown( $event );
  }

  selectItem( $event ) {
    this.selected = $event[ this.keyText ];
    this.value = $event[ this.keyValue ];
  }

  private setUpData() {
    this.dataSource = new DataSourceAutocomplete( {
      dataSource: this.data,
      pageSize: this.pageSize,
      totalLength: this.totalLength,
      lazyMode: this.lazyMode
    } );
  }

  private listenLoadData() {
    if ( !this.dataSource ) {
      return;
    }
    this.dataSource.loadMoreData.subscribe( ( data: any ) => {
      this.lazyLoad.emit( { skip: data.skip, limit: data.limit, term: this.searchControl.value } );
    } );
  }

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
    this.change.detectChanges();
  }

  getItemDescription( item ) {
    if ( !item ) {
      return undefined;
    }
    return item[ this.keyText ];
  }

  getFilters( term: string ) {
    const fields = {};
    fields[ this.searchBy ] = { matchMode: 'contains', value: term };
    return  { fields: fields, operator: 'or' };
  }

  setScrollVirtual() {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop = 0;
  }

  onFilter( $event ) {
    this.setScrollVirtual();
    this.setFiltering( true );
    setTimeout( () => {
      if ( this.lazyMode ) {
        this.filter.emit( this.getFilters( $event ) );
        return;
      }
      if ( $event.length === 0 ) {
        this.setFiltering( false );
        this.setUpFilterData( $event );
        return;
      }
    }, 100 );
    this.setUpFilterData( $event );
  }

  private setFiltering( value: boolean ) {
    this.filtering = value;
  }

  private setNotFound( value: boolean ) {
    this.nothingFound = value;
  }

  private setUpFilterData( data ) {
    this.setNotFound( data.length === 0 );
    this.dataSource = new DataSourceAutocomplete({
      dataSource: data,
      lazyMode: this.lazyMode,
      totalLength: this.totalLength,
      pageSize: this.pageSize
    });
  }

  ngOnChanges( changes ) {
    if ( changes[ 'data' ].firstChange ) {
      this.setUpData();
      this.listenLoadData();
      return;
    }
    if ( this.filtering ) {
      this.setUpFilterData( changes[ 'data' ].currentValue );
      this.dataSource.setData( changes[ 'data' ].currentValue );
      this.dataSource.addPage( 0 );
      this.listenLoadData();
      return;
    }
    if ( this.dataSource ) {
      this.dataSource.setData( changes[ 'data' ].currentValue );
      this.listenLoadData();
    }
  }

}
