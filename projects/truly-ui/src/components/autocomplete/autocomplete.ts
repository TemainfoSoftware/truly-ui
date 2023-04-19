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
  Component, Input, Optional, Inject, OnChanges, ViewChildren,
  EventEmitter, Output, ChangeDetectorRef, QueryList, AfterViewInit, ViewChild, ElementRef, OnDestroy,
  AfterContentInit, TemplateRef, Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';

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
  providers: [ SelectedItemService ],
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

  @Input() totalLength = 1000;

  @Input() filterOperator = '%';

  @Input() rowsPage = 100;

  @Input() lazyMode = false;

  @Input() rowHeight = 40;

  @Input() template: TemplateRef<any>;

  @Input() debounceTime = 200;

  @Input() keyText = '';

  @Input() keyValue = null;

  @Input() openFocus = true;

  @Input() chainFilter = false;

  @Input() loading = false;

  @Input() clearButton = true;

  @Input() clearOnSelect = false;

  @Input() disabled: boolean = null;

  @Input() required: boolean = null;

  @Input() color = 'basic';

  @Input() labelPlacement: 'top' | 'left' = 'left';

  @Input() textBefore = null;

  @Input() textAfter = null;

  @Input() iconBefore = null;

  @Input() iconAfter = null;

  @Input() labelSize = '100px';

  @Input() height = '23px';

  @Input() containerHeight = '200px';

  @Input() searchBy = '';

  @Input() label = '';

  @Input() identifier = null;

  @Input() placeholder = 'Search...';

  @Input() modelMode: 'string' | 'object' = 'object';

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  @Output() changeSelected: EventEmitter<any> = new EventEmitter();

  @Output() filter: EventEmitter<any> = new EventEmitter();

  @Output() clickAddon: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'input', {static: true}  ) input: ElementRef;

  @ViewChild( CdkVirtualScrollViewport, {static: false}  ) cdkVirtualScroll: CdkVirtualScrollViewport;

  @ViewChildren( TlItemSelectedDirective  ) listItems: QueryList<TlItemSelectedDirective>;

  @ViewChild( TlInput, {static: true}  ) tlinput: TlInput;

  public keyManager: ActiveDescendantKeyManager<TlItemSelectedDirective>;

  public dataSource: DataSourceList;

  public isOpen = false;

  public focused = false;

  public selected;

  public description = '';

  public trigger;

  public positionOverlay: 'top' | 'bottom' | 'center';

  public nothingFound = false;

  public tempContainerHeight;

  public messageLoading = this.i18n.getLocale().AutoComplete.messageLoading;

  public nothingFoundMessage = this.i18n.getLocale().AutoComplete.nothingFoundMessage;

  private filtering = false;

  private modelInitialized = false;

  private lastItemScrolled = 0;

  private subscription: Subscription = new Subscription();

  private _data = [];

  private _control;

  constructor( @Optional() @Inject( AUTOCOMPLETE_CONFIG ) autoCompleteConfig: AutoCompleteConfig,
               private change: ChangeDetectorRef, private i18n: I18nService,
               private itemSelectedService: SelectedItemService,
               @Optional() @Self() public ngControl: NgControl ) {
    super();
    this.setControl();
    this.setOptions( autoCompleteConfig );
  }

  get control() {
    return this.ngControl?.control;
  }

  setControl() {
    if ( this.ngControl ) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit() {
    this.handleModelLazy();
    this.handleModelCached();
    this.listenModelChanges();
    this.change.markForCheck();
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager( this.listItems );
    this.tempContainerHeight = this.containerHeight;
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
        this.keyManager.setActiveItem( this.itemSelectedService.itemSelected.indexSelected );
      } );
    }
  }


  private scrollToIndex(): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        if (this.cdkVirtualScroll) {
          this.cdkVirtualScroll.scrollToIndex(this.lastItemScrolled);
          this.change.markForCheck();
        }
        resolve();
      }, 200);
    });
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

  close() {
    if ( !this.control.disabled ) {
      this.value = null;
      this.setDescriptionValue( '' );
      this.selected = null;
    }
  }

  onBackdropClick() {
    this.setIsOpen( false );
    this.setFiltering( false );
  }

  private handleModelLazy() {
    if (this.value && this.lazyMode) {
      const value = objectPath.get(this.value, this.keyText);
      if ( value ) {
        this.setDescriptionValue(value);
        this.handleKeyModelValue(this.value);
        this.changeSelected.emit(this.value);
      }
    }
  }

  private setDescriptionValue( value: string ) {
    this.description = value;
  }

  private handleModelCached() {
    if ( this.dataSource && !this.lazyMode && this.data.length > 0 ) {
      this.data.forEach( ( value ) => {
        if ( this.value ) {
          if ( String( this.getItemCompare( value ) ) === String( this.getCompareModel() ) ) {
            this.setDescriptionValue( objectPath.get( value, this.keyText ) );
            this.handleKeyModelValue( value );
            this.changeSelected.emit( value );
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
    if ( this.loading ) {
      this.stopEvent($event);
      return;
    }
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

  handleKeyEnter($event) {
    if ( this.keyManager.activeItem && this.isOpen ) {
      if ( this.keyManager.activeItem.itemSelected ) {
        this.selectItem.emit( this.keyManager.activeItem.itemSelected );
        this.setSelected( <TlItemSelectedDirective>this.keyManager.activeItem );
        this.setDescriptionValue( objectPath.get( this.keyManager.activeItem.itemSelected, this.keyText ) );
        this.handleKeyModelValue( this.keyManager.activeItem.itemSelected );
      }
      this.handleClose($event);
    }
  }

  handleFocus() {
    this.focused = true;
    if ( this.openFocus && !this.keyManager.activeItem && !this.isDisabled && !this.disabled ) {
      if ( this.openFocus ) {
        this.setIsOpen( true );
      }
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
    this.setSelected( item );
    this.selectItem.emit( value );
    this.handleClose();
    this.change.detectChanges();
  }

  handleClose($event?) {
    if ( this.clearOnSelect ) {
      this.setDescriptionValue( '' );
      this.tlinput.setFocus();
      this.selected = null;
      if ( $event ) {
        $event.stopPropagation();
      }
    }
    this.setIsOpen( false );
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
    this.dataSource.setData( value );
    this.loading = false;
    // this.setContainerHeight( value );
    this.setNotFound( value.length === 0 );
    this.setFirstItemActive();
  }

  setContainerHeight( data ) {
    if ( this.filtering ) {
      const currentHeight = parseInt(this.containerHeight, 10);
      const maxContent = Math.round(currentHeight / this.rowHeight);
      if ( data.length === 0 ) {
        this.tempContainerHeight = this.rowHeight + 'px';
      } else if ( data.length <= maxContent ) {
        this.tempContainerHeight = (data.length * this.rowHeight) + 'px';
      } else {
        this.tempContainerHeight = this.containerHeight;
      }
      this.change.detectChanges();
    }
  }

  private setFirstItemActive() {
    if ( this.keyManager ) {
      setTimeout( () => {
        this.keyManager.setFirstItemActive();
      }, 100 );
    }
  }

  private listenLoadData() {
    this.subscription.add( this.dataSource.loadMoreData.subscribe( ( data: any ) => {
      this.lazyLoad.emit( { skip: data.skip, limit: data.limit, ...this.getFilters( this.description ) } );
      this.loading = true;
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
    fields[ this.searchBy ] = !this.chainFilter ? { matchMode: 'contains', value: term } :
      term.split(this.filterOperator).map(( value ) => {
      return { matchMode: 'contains', value: value };
    });
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
    if ( data && this.lazyMode ) {
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
    if ( this.dataSource ) {
      this.dataSource.unsubscribe();
    }
  }

}
