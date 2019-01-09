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
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  ElementRef, OnChanges
} from '@angular/core';

import { debounceTime } from 'rxjs/internal/operators';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { Subject } from 'rxjs';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { OverlayAnimation } from '../core/directives/overlay-animation';
import { KeyEvent } from '../core/enums/key-events';
import { ListItemMeta } from '../overlaylist/overlay-list';
import { DROPDOWN_CONFIG, DropdownConfig } from './interfaces/dropdown.config';

@Component( {
  selector: 'tl-dropdown-list',
  templateUrl: './dropdownlist.html',
  styleUrls: [ './dropdownlist.scss' ],
  animations: [ OverlayAnimation ],
  providers: [
    [ MakeProvider( TlDropDownList ) ]
  ]
} )
export class TlDropDownList extends ElementBase<string> implements OnInit, OnChanges {

  @Input( 'data' ) data: any[] = [];

  @Input( 'keyText' ) keyText = 'keyText';

  @Input( 'icon' ) icon = null;

  @Input( 'label' ) label: string;

  @Input( 'showOnlyIcon' ) showOnlyIcon = false;

  @Input( 'debounceTime' ) debounceTime = 200;

  @Input( 'disabled' ) disabled = true;

  @Input( 'labelPlacement' ) labelPlacement = 'left';

  @Input( 'labelSize' ) labelSize = '100px';

  @Input( 'itemHeight' ) itemHeight = '23px';

  @Input( 'keyValue' ) keyValue = 'value';

  @Input( 'maxHeight' ) maxHeight = '150px';

  @Input( 'preSelected' ) preSelected = '';

  @Input( 'width' ) width = '120px';

  @Input( 'placeholder' ) placeholder = 'Select Item';

  @Input( 'searchOnList' ) searchOnList = false;

  @Input( 'placeholderIcon' ) placeholderIcon = 'ion-navicon-round';

  @ViewChild( NgModel ) model: NgModel;

  @ViewChild( 'wrapper' ) wrapper: ElementRef;

  public typeOfData = 'complex';

  public selectedDescription = '';

  public indexOptionSelectedModel;

  public optionSelected;

  public isOpen = false;

  public datasource = [];

  public isLoading = true;

  private subject = new Subject();

  constructor( @Optional() @Inject( DROPDOWN_CONFIG ) dropdownConfig: DropdownConfig,
               @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>,
               @Optional() @Inject( NG_ASYNC_VALIDATORS ) asyncValidators: Array<any> ) {
    super( validators, asyncValidators );
    this.setOptions( dropdownConfig );
  }

  ngOnInit() {
    this.listenModelChange();
    this.subject.pipe( debounceTime( this.debounceTime ) ).subscribe( searchTextValue => {
      this.handleSearch( searchTextValue );
    } );
  }

  initializeComponent() {
    this.setUpComponent();
    this.validateData();
    this.getModelValue();
  }

  setUpComponent() {
    this.datasource = this.data;
    this.disabled = false;
    this.isLoading = false;
  }

  validateData() {
    const key = Object.keys( this.data )[ 0 ];
    if ( typeof this.data[ key ] === 'string' ) {
      this.typeOfData = 'simple';
    }
  }

  handleSearch( searchTextValue ) {
    const filter = [];
    this.datasource = this.data.slice();
    this.datasource.filter( ( item ) => {
      if ( (item[ this.keyText ].substr( 0, searchTextValue.length ).toLowerCase()) === (searchTextValue.toLowerCase()) ) {
        filter.push( item );
      }
    } );
    this.datasource = filter;
  }

  onSelectOption( $event: ListItemMeta ) {
    this.optionSelected = $event;
    this.selectedDescription = this.isSimpleData() ? $event.option.item : $event.option.item[ this.keyText ];
    this.value = this.isSimpleData() ? $event.option.item : $event.option.item[ this.keyValue ];
    this.isOpen = false;
    this.setInputFocus();
  }

  onDefaultOption() {
    this.value = '';
    this.selectedDescription = this.placeholder;
    this.optionSelected = null;
    this.isOpen = false;
  }

  setInputFocus() {
    this.wrapper.nativeElement.focus();
  }

  isSimpleData() {
    return this.typeOfData === 'simple';
  }

  listenModelChange() {
    this.model.valueChanges.subscribe( () => {
      this.getModelValue();
    } );
  }

  getModelValue() {
    this.datasource.forEach( ( value, index ) => {
      if ( this.getCompare( value ) === this.model.model ) {
        this.selectedDescription = this.getDescription( value );
        this.indexOptionSelectedModel = index;
      }
    } );
  }

  setOptions( options: DropdownConfig ) {
    if ( options ) {
      const self = this;
      Object.keys( options ).forEach( function ( key ) {
        self[ key ] = options[ key ];
      } );
    }
  }

  getCompare( value ) {
    return this.isSimpleData() ? value : value[ this.keyValue ];
  }

  getDescription( value ) {
    return this.isSimpleData() ? value : value[ this.keyText ];
  }

  onKeyDown( $event ) {
    switch ( $event.keyCode ) {
      case KeyEvent.SPACE:
        $event.stopPropagation();
        $event.preventDefault();
        if ( !this.isOpen ) {
          this.isOpen = true;
        }
        break;
    }
  }

  ngOnChanges(changes) {
    if (changes['data']) {
      if (changes['data'].currentValue) {
        this.initializeComponent();
      }
    }
  }

}
