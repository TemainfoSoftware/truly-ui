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
import { isVisibleInList } from '../core/helper/check-element-on-list';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ListOptionDirective } from '../misc/listoption.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { KeyEvent } from '../core/enums/key-events';
import { I18nService } from '../i18n/i18n.service';
import { AUTOCOMPLETE_CONFIG, AutoCompleteConfig } from './parts/interfaces/autocomplete.config';
import { DataSourceList } from '../core/classes/datasource-list';
import { TlItemSelectedDirective } from '../core/directives/itemSelected/item-selected.directive';

@Component( {
  selector: 'tl-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrls: [ './autocomplete.scss' ],
  providers: [ MakeProvider( TlAutoComplete ) ],
} )
export class TlAutoComplete extends ElementBase<string> implements OnInit, OnChanges, AfterViewInit {

  @Input( 'data' )
  set data( value ) {
    this._data = value;
  }

  get data() {
    return this._data;
  }

  @Input() totalLength = 1000;

  @Input() rowsPage = 100;

  @Input() lazyMode = false;

  @Input() rowHeight = 40;

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

  @Input() identifier = null;

  @Input() placeholder = 'Search...';

  @Input() modelMode: 'string' | 'object' = 'object';

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @Output() select: EventEmitter<any> = new EventEmitter();

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @ViewChild( NgModel ) model: NgModel;

  @ViewChild( 'input' ) input: ElementRef;

  @ViewChild( CdkVirtualScrollViewport ) cdkVirtualScroll: CdkVirtualScrollViewport;

  @ViewChildren( TlItemSelectedDirective ) listItems: QueryList<TlItemSelectedDirective>;

  public keyManager: ActiveDescendantKeyManager<TlItemSelectedDirective>;

  public dataSource: DataSourceList;

  public selected = null;

  private _data;

  public isOpen = false;

  public focused = false;

  public positionOverlay;

  public nothingFound = false;

  public searchControl = new FormControl( '' );

  public messageLoading = this.i18n.getLocale().AutoComplete.messageLoading;

  public nothingFoundMessage = this.i18n.getLocale().AutoComplete.nothingFoundMessage;

  public filtering = false;

  private activeItem;

  private container;

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>,
               @Optional() @Inject( AUTOCOMPLETE_CONFIG ) autoCompleteConfig: AutoCompleteConfig,
               @Optional() @Inject( NG_ASYNC_VALIDATORS ) asyncValidators: Array<any>,
               private change: ChangeDetectorRef, private i18n: I18nService ) {
    super( validators, asyncValidators );
    this.setOptions( autoCompleteConfig );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager( this.listItems );
    this.keyManager.withWrap();
    this.handleModel();
    this.handleInitList();
    this.change.detectChanges();
  }

  private handleModel() {
    this.model.valueChanges.subscribe( () => {
      if ( this.dataSource ) {
        this.handleModelLazy();
        this.handleModelCached();
      }
    } );
  }

  private handleModelLazy() {
    if ( this.model.value && this.lazyMode ) {
      if (!this.isModelModeString()) {
        this.setDescriptionValue( this.model.value[ this.keyText ] );
      }
      this.handleKeyModelValue( this.model.value );
    }
  }

  private setDescriptionValue( value: string ) {
    this.input.nativeElement.value = value;
  }

  private handleModelCached() {
    this.dataSource.getCachedData().forEach( ( value ) => {
      if ( this.model.value ) {
        if ( String( this.getItemCompare( value ) ) === String( this.getCompareModel() ) ) {
          this.setDescriptionValue( value[ this.keyText ] );
          this.handleKeyModelValue( value );
        }
      }
    } );
  }

  private getItemCompare( value ) {
    if ( !this.keyValue || this.isModelModeString()) {
      return value[ this.identifier ];
    }
    return value[this.keyValue];
  }

  private setContainer() {
    this.container = this.cdkVirtualScroll.elementRef.nativeElement;
  }

  private handleKeyModelValue( value ) {
    if ( !this.isModelModeString() && this.keyValue ) {
      this.value = value[ this.keyValue ];
      return;
    }
    if ( this.isModelModeString() && !this.keyValue ) {
      this.value = value[this.identifier];
      return;
    }
    if ( this.isModelModeString() && this.keyValue ) {
      this.value = value[this.keyValue];
      return;
    }
    this.value = value;
  }

  private setOptions( options: AutoCompleteConfig ) {
    if ( options ) {
      const self = this;
      Object.keys( options ).forEach( function ( key ) {
        self[ key ] = options[ key ];
      } );
    }
  }

  private setSelected( item: TlItemSelectedDirective ) {
    setTimeout(() => {
      this.keyManager.setActiveItem( item );
    });
  }

  handleKeyArrowDown( $event ) {
    this.stopEvent( $event );
    if ( this.isIndexSelectedEqualLastItem() ) {
      return;
    }
    this.keyManager.onKeydown( $event );
    this.setActiveItem();
    if ( !isVisibleInList( this.activeItem.element.nativeElement, this.container, this.rowHeight ) ) {
      this.patchScrollValue( this.rowHeight );
    }
  }

  private stopEvent( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  handleKeyArrowUp( $event ) {
    this.stopEvent( $event );
    if ( this.isIndexSelectedEqualFirst() ) {
      return;
    }
    this.keyManager.onKeydown( $event );
    this.setActiveItem();
    if ( !isVisibleInList( this.activeItem.element.nativeElement, this.container, this.rowHeight ) ) {
      this.decreaseScrollValue( this.rowHeight );
      return;
    }
    if ( this.isIndexSelectedLowerThanOne() && this.isScrollTopGreaterThanZero() ) {
      this.resetScrollValue();
    }
  }

  private isIndexSelectedEqualLastItem() {
    return this.keyManager.activeItem[ 'indexSelected' ] === this.dataSource.getCachedData().length - 1;
  }

  private patchScrollValue( value: number ) {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop += value;
  }

  private isScrollTopGreaterThanZero() {
    return this.cdkVirtualScroll.elementRef.nativeElement.scrollTop > 0;
  }

  private isIndexSelectedEqualFirst() {
    return this.activeItem.indexSelected === 0;
  }

  private isIndexSelectedLowerThanOne() {
    return this.activeItem.indexSelected <= 1;
  }

  private setActiveItem() {
    this.activeItem = this.keyManager.activeItem as TlItemSelectedDirective;
  }

  private resetScrollValue() {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop = 0;
    this.change.detectChanges();
  }

  private decreaseScrollValue( value: number ) {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop -= value;
  }

  private isModelModeString() {
    return this.modelMode === 'string';
  }

  private getCompareModel() {
    if (this.keyValue && !this.isModelModeString()) {
      return this.model.value[this.keyValue];
    }
    if (!this.isModelModeString() && !this.keyValue) {
      return this.model.value[this.identifier];
    }
    return this.model.value;
  }

  handleBlur() {
    this.setSelected( this.activeItem );
    this.setDescriptionValue( this.activeItem.itemSelected[ this.keyText ] );
    this.handleKeyModelValue( this.activeItem.itemSelected );
    this.isOpen = false;
  }

  handleFocus() {
    this.focused = true;
    if ( this.openFocus && !this.selected ) {
      this.isOpen = true;
    }
  }

  selectItem( value, item: TlItemSelectedDirective ) {
    this.setDescriptionValue( value[ this.keyText ] );
    this.setSelected( item );
    this.handleKeyModelValue( value );
    this.input.nativeElement.focus();
    this.select.emit( value );
    this.isOpen = false;
    this.change.detectChanges();
  }

  private setUpData( value? ) {
    if ( !this.dataSource ) {
      this.dataSource = new DataSourceList( {
        dataSource: value,
        pageSize: this.rowsPage,
        totalLength: this.totalLength,
        lazyMode: this.lazyMode
      } );
      this.dataSource.addPage( 0 );
    }
    this.listenLoadData();
    this.setNotFound( false );
    this.dataSource.setData( value );
  }

  private listenLoadData() {
    if ( !this.dataSource ) {
      return;
    }
    this.dataSource.loadMoreData.subscribe( ( data: any ) => {
      this.lazyLoad.emit( { skip: data.skip, limit: data.limit, ...this.getFilters(this.searchControl.value) } );
    } );
  }

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
    this.change.detectChanges();
  }

  setIsOpen( value: boolean ) {
    this.isOpen = value;
    this.handleInitList();
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
    this.handleInitList();
    this.input.nativeElement.focus();
  }

  private handleInitList() {
    if ( this.isOpen ) {
      setTimeout( () => {
        this.setContainer();
        this.setSelected( this.listItems.toArray()[ 0 ] );
      } );
    }
  }

  getItemDescription( item ) {
    if ( !item ) {
      return undefined;
    }
    return item[ this.keyText ];
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
    if ( this.lazyMode ) {
      this.filter.emit( this.getFilters( $event ) );
      return;
    }
    if ( $event ) {
      this.setUpData( $event );
      this.dataSource.dataStream.next( $event );
      this.setSelected(this.listItems.toArray()[0]);
      return;
    }
    this.dataSource.dataStream.next( [] );
    this.setNotFound( true );
  }

  setFiltering( value: boolean ) {
    this.filtering = value;
  }

  private setNotFound( value: boolean ) {
    this.nothingFound = value;
  }

  ngOnChanges( { data, totalLength }: any ) {
    if ( data && !data[ 'firstChange' ] && this.lazyMode ) {
      this.setUpData( data[ 'currentValue' ] );
      return;
    }
    if ( data && data[ 'currentValue' ] ) {
      this.setUpData( data[ 'currentValue' ] );
    }
    if ( totalLength && !totalLength[ 'firstChange' ] ) {
      this.dataSource.setArray( totalLength[ 'currentValue' ] );
    }
    if ( this.filtering ) {
      this.setUpData( data[ 'currentValue' ] );
      this.dataSource.addPage( 0 );
      this.dataSource.dataStream.next( data[ 'currentValue' ] );
      this.listenLoadData();
    }
  }

}
