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
  Component, Input, Optional, Inject, OnInit, OnChanges, ViewChildren,
  EventEmitter, Output, ChangeDetectorRef, QueryList, AfterViewInit, ViewChild, ElementRef, OnDestroy, ContentChild,
  AfterContentInit,
} from '@angular/core';
import { FormControlName } from '@angular/forms';

import { MakeProvider } from '../core/base/value-accessor-provider';
import { NgModel } from '@angular/forms';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { I18nService } from '../i18n/i18n.service';
import { AUTOCOMPLETE_CONFIG, AutoCompleteConfig } from './interfaces/autocomplete.config';
import { DataSourceList } from '../core/classes/datasource-list';
import { TlItemSelectedDirective } from '../core/directives/itemSelected/item-selected.directive';
import { scrollIntoView } from '../core/helper/scrollIntoView';
import { SelectedItemService } from './services/selected-item.service';
import { Subscription } from 'rxjs';

import * as objectPath from 'object-path';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { TlInput } from '../input/input';

@Component( {
  selector: 'tl-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrls: [ './autocomplete.scss' ],
  providers: [ MakeProvider( TlAutoComplete ), SelectedItemService ],
} )
export class TlAutoComplete extends ValueAccessorBase<any> implements OnChanges, OnDestroy, AfterViewInit, AfterContentInit {

  @Input( 'data' )
  set data( value ) {
    this._data = value;
  }

  get data() {
    return this._data;
  }

  @Input('control')
  set control(item) {
    this._control = item;
  }

  get control() {
    if (this._control) {
      return this._control;
    }
    if (this.controlName || this.model) {
      return this.controlName ? this.controlName : this.model;
    }
    return this._control;
  }

  @Input() totalLength = 1000;

  @Input() rowsPage = 100;

  @Input() lazyMode = false;

  @Input() rowHeight = 40;

  @Input() debounceTime = 200;

  @Input() keyText = '';

  @Input() keyValue = null;

  @Input() openFocus = true;

  @Input() loading = true;

  @Input() disabled: boolean = null;

  @Input() required: boolean = null;

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

  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'input', {static: true}  ) input: ElementRef;

  @ViewChild( CdkVirtualScrollViewport, {static: true}  ) cdkVirtualScroll: CdkVirtualScrollViewport;

  @ViewChildren( TlItemSelectedDirective  ) listItems: QueryList<TlItemSelectedDirective>;

  @ContentChild( NgModel, {static: true}  ) model: NgModel;

  @ContentChild( FormControlName, {static: true}  ) controlName: FormControlName;

  @ViewChild( TlInput, {static: true}  ) tlinput: TlInput;

  public keyManager: ActiveDescendantKeyManager<TlItemSelectedDirective>;

  public dataSource: DataSourceList;

  public isOpen = false;

  public focused = false;

  public closeHover = false;

  public selected;

  public description = '';

  public trigger;

  public positionOverlay: 'top' | 'bottom' | 'center';

  public nothingFound = false;

  public messageLoading = this.i18n.getLocale().AutoComplete.messageLoading;

  public nothingFoundMessage = this.i18n.getLocale().AutoComplete.nothingFoundMessage;

  private filtering = false;

  private modelInitialized = false;

  private lastItemScrolled = 0;

  private subscription: Subscription = new Subscription();

  private _data = [];

  private _control;

  constructor( @Optional() @Inject( AUTOCOMPLETE_CONFIG ) autoCompleteConfig: AutoCompleteConfig,
               private change: ChangeDetectorRef, private i18n: I18nService, private itemSelectedService: SelectedItemService ) {
    super();
    this.setOptions( autoCompleteConfig );
  }

  ngAfterContentInit() {
    this.handleModelLazy();
    this.handleModelCached();
    this.listenModelChanges();
    this.change.markForCheck();
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager( this.listItems );
    this.validateKeyValue();
  }

  getNativeInput() {
    return this.tlinput.getNativeInput();
  }

  private validateKeyValue() {
    if ( !this.isModelModeString() && !this.keyValue && !this.identifier ) {
      throw Error( 'The AutoComplete should have an [identifier] key property, ' +
        ' because the property [keyValue] is null and the list is working on [modelMode] \'object\'' );
    }
  }

  private listenModelChanges() {
    if ( this.control ) {
      this.control.valueChanges.subscribe( ( value ) => {
        if ( this.dataSource ) {
          this.handleModelLazy();
          this.handleModelCached();
        }
      } );
    }
  }

  private handleItemSelected() {
    if ( this.itemSelectedService.itemSelected ) {
      this.scrollToIndex().then( value => {
        setTimeout( () => {
          this.keyManager.setActiveItem( this.itemSelectedService.itemSelected.indexSelected );
        }, 200 );
      } );
    }
  }


  private scrollToIndex() {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        this.cdkVirtualScroll.scrollToIndex( this.lastItemScrolled );
        this.change.markForCheck();
        resolve();
      }, 200 );
    } );
  }


  onScrollIndexChange( $event ) {
    if ( $event > 0 ) {
      this.lastItemScrolled = $event;
    }
  }

  onInput() {
    this.setIsOpen( true );
    this.setFiltering( true );
  }

  onHoverClose() {
    this.closeHover = true;
  }

  onLeaveClose() {
    this.closeHover = false;
  }

  onClickClose() {
    if ( !this.control.disabled ) {
      this.value = '';
      this.setDescriptionValue( '' );
      this.closeHover = false;
      this.selected = null;
      this.tlinput.setFocus();
      this.setIsOpen( true );
    }
  }

  onBackdropClick() {
    this.setIsOpen( false );
    this.setFiltering( false );
  }

  private handleModelLazy() {
    if ( this.value && this.lazyMode && !this.modelInitialized ) {
      if ( !this.isModelModeString() ) {
        this.setDescriptionValue( objectPath.get( this.value, this.keyText ) );
      } else {
        console.warn( 'The item provided is was not found, emitting filter' );
        this.filter.emit( this.getFilters( this.value ) );
      }
      this.handleKeyModelValue( this.value );
    }
  }

  private setDescriptionValue( value: string ) {
    this.description = value;
  }

  private handleModelCached() {
    if ( this.dataSource && !this.lazyMode && this.dataSource.getCachedData() ) {
      this.dataSource.getCachedData().forEach( ( value ) => {
        if ( this.value ) {
          if ( String( this.getItemCompare( value ) ) === String( this.getCompareModel() ) ) {
            this.setDescriptionValue( objectPath.get( value, this.keyText ) );
            this.handleKeyModelValue( value );
          }
        }
      } );
    }
  }

  private getItemCompare( value ) {
    if ( !this.keyValue || this.isModelModeString() ) {
      return objectPath.get( value, this.identifier );
    }
    return objectPath.get( value, this.keyValue );
  }

  private handleKeyModelValue( value ) {
    this.modelInitialized = true;
    this.selected = value;
    if ( !this.isModelModeString() && this.keyValue ) {
      this.value = objectPath.get( value, this.keyValue );
      return;
    }
    if ( this.isModelModeString() && !this.keyValue ) {
      this.value = objectPath.get( value, this.identifier );
      return;
    }
    if ( this.isModelModeString() && this.keyValue ) {
      this.value = objectPath.get( value, this.keyValue );
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

  private setSelected( itemDirective: TlItemSelectedDirective ) {
    this.selected = itemDirective.itemSelected;
    this.keyManager.setActiveItem( itemDirective );
    this.itemSelectedService.itemSelected = itemDirective;
  }

  stopEvent( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  handleKeyArrowDown( $event ) {
    this.handleEventOpenList( $event );
    if ( !this.keyManager.activeItem ) {
      this.keyManager.setFirstItemActive();
      return;
    }
    this.keyManager.onKeydown( $event );
    scrollIntoView( this.keyManager.activeItem.element.nativeElement );
  }

  handleKeyArrowUp( $event ) {
    this.handleEventOpenList( $event );
    if ( !this.keyManager.activeItem ) {
      this.keyManager.setFirstItemActive();
      return;
    }
    this.keyManager.onKeydown( $event );
    scrollIntoView( this.keyManager.activeItem.element.nativeElement );
  }

  handleKeyBackspace() {
    this.value = null;
  }

  handleEventOpenList( $event ) {
    if ( this.isOpen ) {
      this.stopEvent( $event );
    }
  }

  handleKeyEscape( $event ) {
    if ( this.isOpen ) {
      $event.stopPropagation();
    }
    this.setIsOpen( false );
  }

  handleKeyEnter() {
    if ( this.keyManager.activeItem && this.isOpen ) {
      if ( this.keyManager.activeItem.itemSelected ) {
        this.selectItem.emit( this.keyManager.activeItem.itemSelected );
        this.setSelected( <TlItemSelectedDirective>this.keyManager.activeItem );
        this.setDescriptionValue( objectPath.get( this.keyManager.activeItem.itemSelected, this.keyText ) );
        this.handleKeyModelValue( this.keyManager.activeItem.itemSelected );
      }
    }
    this.setIsOpen( false );
  }

  handleFocus() {
    this.focused = true;
    if ( this.openFocus && !this.keyManager.activeItem && !this.isDisabled && !this.disabled ) {
      this.setIsOpen( true );
    }
  }

  private isModelModeString() {
    return this.modelMode === 'string';
  }

  private getCompareModel() {
    if ( this.keyValue && !this.isModelModeString() ) {
      return objectPath.get( this.value, this.keyValue );
    }
    if ( !this.isModelModeString() && !this.keyValue ) {
      return objectPath.get( this.value, this.identifier );
    }
    return this.value;
  }

  onSelectItem( value: any, item: TlItemSelectedDirective ) {
    this.setDescriptionValue( objectPath.get( value, this.keyText ) );
    this.handleKeyModelValue( value );
    this.tlinput.setFocus();
    this.setIsOpen( false );
    this.setSelected( item );
    this.change.detectChanges();
    this.selectItem.emit( value );
  }

  private setUpData( value? ) {
    if ( !this.dataSource ) {
      this.dataSource = new DataSourceList( {
        dataSource: value,
        pageSize: this.rowsPage,
        totalLength: this.totalLength,
        lazyMode: this.lazyMode
      } );
      this.listenLoadData();
      this.handleModelCached();
    }
    this.loading = false;
    this.dataSource.setData( value );
    this.setNotFound( value.length === 0 );
    this.setFirstItemActive();
  }

  private setFirstItemActive() {
    if ( this.keyManager ) {
      setTimeout( () => {
        this.keyManager.setFirstItemActive();
      }, 100 );
    }
  }

  private listenLoadData() {
    if ( !this.dataSource ) {
      return;
    }
    this.subscription.add( this.dataSource.loadMoreData.subscribe( ( data: any ) => {
      this.lazyLoad.emit( { skip: data.skip, limit: data.limit, ...this.getFilters( this.description ) } );
    } ) );
  }

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
    this.change.detectChanges();
  }

  private setIsOpen( value: boolean ) {
    this.isOpen = value;
  }

  getItemText( item ) {
    return objectPath.get( item, this.keyText );
  }

  toggleIsOpen() {
    if ( !this.disabled && !this.isDisabled ) {
      this.isOpen = !this.isOpen;
      this.tlinput.setFocus();
      this.handleItemSelected();
    }
  }

  private getFilters( term: string ) {
    const fields = {};
    fields[ this.searchBy ] = { matchMode: 'contains', value: term };
    return { fields: fields, operator: 'or' };
  }

  private setScrollVirtual() {
    if ( this.cdkVirtualScroll ) {
      this.cdkVirtualScroll.elementRef.nativeElement.scrollTop = 0;
    }
  }

  onFilter( $event ) {
    this.setScrollVirtual();
    this.setFiltering( true );
    this.dataSource.resetPages();
    if ( this.lazyMode ) {
      this.filter.emit( this.getFilters( $event ) );
      return;
    }
    if ( $event ) {
      this.dataSource.setArray( $event.length );
      this.setUpData( $event );
      setTimeout( () => {
        this.keyManager.setActiveItem( 0 );
      }, 100 );
      return;
    }
    this.dataSource.setData( [] );
    this.setNotFound( true );
    this.selected = null;
  }

  private setFiltering( value: boolean ) {
    this.filtering = value;
  }

  private setNotFound( value: boolean ) {
    this.nothingFound = value;
  }

  ngOnChanges( { data, totalLength }: any ) {
    if ( totalLength && !totalLength[ 'firstChange' ] ) {
      if ( this.dataSource ) {
        this.dataSource.setArray( totalLength[ 'currentValue' ] );
      }
    }
    if ( data && !data[ 'firstChange' ] && this.lazyMode ) {
      this.setUpData( data[ 'currentValue' ] );
      return;
    }
    if ( data && data[ 'currentValue' ] !== undefined && !this.lazyMode ) {
      if ( data[ 'currentValue' ].length > 0 ) {
        this.setUpData( data[ 'currentValue' ] );
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
