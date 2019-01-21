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
  EventEmitter, Output, ChangeDetectorRef, QueryList, AfterViewInit, NgZone, ViewChild, ContentChild, ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { MakeProvider } from '../core/base/value-accessor-provider';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { DataSourceAutocomplete } from './parts/classes/datasource-autocomplete';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ListOptionDirective } from '../misc/listoption.directive';
import { CdkScrollable, CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { KeyEvent } from '../core/enums/key-events';
import { I18nService } from '../i18n/i18n.service';

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

  @Input() openFocus = false;

  @Input() color = 'basic';

  @Input() labelPlacement: 'top' | 'left' = 'left';

  @Input() labelSize = '100px';

  @Input() height = '23px';

  @Input() searchBy = '';

  @Input() label = '';

  @Input() placeholder = 'Search...';

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @ViewChild( NgModel ) model: NgModel;

  @ViewChild( 'input' ) input: ElementRef;

  @ViewChild( CdkVirtualScrollViewport ) cdkVirtualScroll: CdkVirtualScrollViewport;

  @ViewChildren( ListOptionDirective ) items: QueryList<ListOptionDirective>;

  public keyManager: FocusKeyManager<ListOptionDirective>;

  public dataSource: DataSourceAutocomplete;

  public selected = null;

  public selectedIndex = null;

  public isOpen = false;

  public focused = false;

  public positionOverlay;

  public nothingFound = false;

  public searchControl = new FormControl( '' );

  public messageLoading = this.i18n.getLocale().AutoComplete.messageLoading;

  public nothingFoundMessage = this.i18n.getLocale().AutoComplete.nothingFoundMessage;

  public filtering = false;

  private modelInitialized = false;

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any>, private change: ChangeDetectorRef, private i18n: I18nService ) {
    super( validators, asyncValidators );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager( this.items );
    this.keyManager.withWrap();
    this.handleModel();
  }

  private handleModel() {
    this.model.valueChanges.subscribe( () => {
      if ( this.dataSource && !this.modelInitialized) {
        this.lazyMode ? this.handleModelLazy() : this.handleModelCached();
      }
    } );
  }

  private handleModelLazy() {
    this.lazyLoad.emit( { term: this.model.model, modelValue: true } );
  }

  private handleModelCached() {
    this.dataSource.getCachedData().forEach( ( value, index ) => {
      if ( String( value[ this.keyValue ] ) === String( this.model.model ) ) {
        this.selectedIndex = index;
        this.selected = value[ this.keyText ];
      }
    } );
  }

  handleKeyEvents( $event: KeyboardEvent, item, i ) {
    this.keyManager.onKeydown( $event );
    if ($event.keyCode === KeyEvent.ENTER) {
      this.selectItem(item, i);
      this.setFocus();
    }
  }

  handleBlur() {
    this.isOpen = false;
  }

  handleArrowDown($event) {
    if (this.isOpen) {
      $event.stopPropagation();
    }
    this.setActiveItemFirst();
  }

  handleFocus() {
    this.focused = true;
    if ( this.openFocus ) {
      this.isOpen = true;
    }
  }

  selectItem( $event, index: number ) {
    this.selectedIndex = index;
    this.selected = $event[ this.keyText ];
    this.value = $event[ this.keyValue ];
    this.isOpen = false;
  }

  setActiveItemFirst() {
    setTimeout( () => {
      this.keyManager.setFirstItemActive();
    }, 100 );
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

  private setFocus() {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  }

  private getFilters( term: string ) {
    const fields = {};
    fields[ this.searchBy ] = { matchMode: 'contains', value: term };
    return { fields: fields, operator: 'or' };
  }

  private setScrollVirtual() {
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
    if ( !this.lazyMode ) {
      this.dataSource.dataStream.next( $event );
    }
  }

  private setFiltering( value: boolean ) {
    this.filtering = value;
  }

  private setNotFound( value: boolean ) {
    this.nothingFound = value;
  }

  private setUpFilterData( data ) {
    this.setNotFound( data.length === 0 );
    this.dataSource = new DataSourceAutocomplete( {
      dataSource: data,
      lazyMode: this.lazyMode,
      totalLength: this.totalLength,
      pageSize: this.pageSize
    } );
  }

  ngOnChanges( changes ) {
    if ( changes[ 'data' ] && this.model.model && !this.modelInitialized) {
      this.selected = changes[ 'data' ].currentValue[ 0 ][ this.keyText ];
      this.modelInitialized = true;
    }
    if ( changes[ 'totalLength' ] ) {
      if ( !changes[ 'totalLength' ].firstChange ) {
        this.setUpData();
        this.dataSource.setData( this.data );
        this.dataSource.addPage( 0 );
        this.setNotFound( this.data.length === 0 );
        this.listenLoadData();
        return;
      }
    }
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
