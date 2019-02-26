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
  ContentChild,
  ViewChild,
  ElementRef, OnChanges
} from '@angular/core';

import { debounceTime } from 'rxjs/internal/operators';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { Subject } from 'rxjs';
import { ElementBase } from '../input/core/element-base';
import { FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel, } from '@angular/forms';
import { OverlayAnimation } from '../core/directives/overlay-animation';
import { KeyEvent } from '../core/enums/key-events';
import { DROPDOWN_CONFIG, DropdownConfig } from './interfaces/dropdown.config';
import { ListItemInterface } from './interfaces/list-item';
import { TlListItem } from '../overlaylist/list-item/list-item';

@Component( {
  selector: 'tl-dropdown-list',
  templateUrl: './dropdownlist.html',
  styleUrls: [ './dropdownlist.scss' ],
  animations: [ OverlayAnimation ],
  providers: [
    [ MakeProvider( TlDropDownList ) ]
  ]
} )
export class TlDropDownList extends ElementBase<string> implements OnInit, OnChanges, AfterViewInit {

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

  @Input( 'keyValue' ) keyValue = null;

  @Input( 'maxHeight' ) maxHeight = '150px';

  @Input( 'identifier' ) identifier = null;

  @Input( 'preSelected' ) preSelected = '';

  @Input( 'defaultOption' ) defaultOption = false;

  @Input( 'width' ) width = '120px';

  @Input( 'placeholder' ) placeholder = 'Select Item';

  @Input( 'modelMode' ) modelMode: 'string' | 'object' = 'object';

  @Input( 'searchOnList' ) searchOnList = false;

  @Input( 'placeholderIcon' ) placeholderIcon = 'ion-navicon-round';

  @ContentChild( NgModel ) model: NgModel;

  @ContentChild( FormControlName ) controlName: FormControlName;

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
    this.subject.pipe( debounceTime( this.debounceTime ) ).subscribe( searchTextValue => {
      this.onSearch( searchTextValue );
    } );
  }

  ngAfterViewInit() {
    this.listenModelChange();
  }

  onSearch( searchTextValue ) {
    const filter = [];
    this.datasource = this.data.slice();
    this.datasource.filter( ( item ) => {
      if ( (item[ this.keyText ].substr( 0, searchTextValue.length ).toLowerCase()) === (searchTextValue.toLowerCase()) ) {
        filter.push( item );
      }
    } );
    this.datasource = filter;
  }

  onKeyDown( $event ) {
    this.handleSelectInLetter( $event.key );
    const keyEvent = {
      [KeyEvent.SPACE]: () => this.handleKeySpace( $event ),
      [KeyEvent.ARROWDOWN]: () => this.stopEvent( $event ),
      [KeyEvent.ARROWUP]: () => this.stopEvent( $event ),
    };
    if ( keyEvent[ $event.keyCode ] ) {
      keyEvent[ $event.keyCode ]();
    }
  }

  onFindByLetter( value: string ) {
    this.handleSelectInLetter( value );
  }

  onSelectOption( $event: ListItemInterface ) {
    this.isOpen = false;
    this.optionSelected = $event;
    this.selectedDescription = this.isSimpleData() ? $event.option.item : $event.option.item[ this.keyText ];
    this.handleKeyModelValue( $event.option.item );
    this.setInputFocus();
  }

  onDefaultOption() {
    this.value = '';
    this.selectedDescription = this.placeholder;
    this.optionSelected = null;
    this.isOpen = false;
  }

  private isModelModeString() {
    return this.modelMode === 'string';
  }

  private handleKeySpace( $event ) {
    this.stopEvent( $event );
    if ( !this.isOpen ) {
      this.isOpen = true;
    }
  }

  private initializeComponent() {
    this.setUpComponent();
    this.validateData();
    this.getModelValue();
  }

  private setUpComponent() {
    this.datasource = this.data;
    this.disabled = false;
    this.isLoading = false;
  }

  private validateData() {
    const key = Object.keys( this.data )[ 0 ];
    if ( typeof this.data[ key ] === 'string' ) {
      this.typeOfData = 'simple';
    }
  }

  private setInputFocus() {
    this.wrapper.nativeElement.focus();
  }

  private isSimpleData() {
    return this.typeOfData === 'simple';
  }

  private getModel() {
    return this.model ? this.model : this.controlName;
  }

  private listenModelChange() {
    if (this.getModel()) {
      this.getModel().valueChanges.subscribe( () => {
        this.getModelValue();
      } );
    }
  }

  private handleKeyModelValue( itemValue ) {
    if ( this.isSimpleData() ) {
      return this.value = itemValue;
    }
    if ( !this.keyValue ) {
      return this.value = itemValue;
    }
    return this.value = itemValue[ this.keyValue ];
  }

  private getModelValue() {
    if (!this.getModel()) {
      return;
    }
    this.datasource.forEach( ( value, index ) => {
      if ( this.getModel().value ) {
        if ( this.getCompare( value ) === this.getCompareModel() ) {
          this.selectedDescription = this.getDescription( value );
          this.indexOptionSelectedModel = index;
          this.handleKeyModelValue( value );
          return;
        }
      }
    } );
  }

  private setOptions( options: DropdownConfig ) {
    if ( options ) {
      const self = this;
      Object.keys( options ).forEach( function ( key ) {
        self[ key ] = options[ key ];
      } );
    }
  }

  private getCompareModel() {
    if ( this.isSimpleData() ) {
      return this.getModel().value;
    }
    if ( !this.keyValue ) {
      return this.getModel().value[ this.identifier ];
    }
    if ( this.isModelModeString() ) {
      return this.getModel().value;
    }
    return this.getModel().value[ this.keyValue ];
  }

  private getCompare( value ) {
    if ( this.isSimpleData() ) {
      return value;
    }
    if ( !this.keyValue ) {
      return value[ this.identifier ];
    }
    return value[ this.keyValue ];
  }

  private getDescription( value ) {
    if ( this.isSimpleData() ) {
      return value;
    }
    return value[ this.keyText ];
  }

  private handleSelectInLetter( keyInput: string ) {
    const selected = this.selectByFirst( keyInput );
    if ( selected ) {
      this.selectedDescription = this.getDescription( selected.option );
      this.optionSelected = { option: selected.option, index: selected.index };
      this.handleKeyModelValue( selected.option );
    }
  }

  private stopEvent( $event ) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  private selectByFirst( keyInput: string ): ListItemInterface {
    let selected: ListItemInterface = null;
    this.datasource.forEach( ( option: TlListItem, index: number ) => {
      if ( this.getFirstLetterOfItem( option ) === this.getKeyInputLowerCase( keyInput ) ) {
        selected = <ListItemInterface>{ option, index };
        return;
      }
    } );
    return selected;
  }

  private getKeyInputLowerCase( keyInput: string ): string {
    return String( keyInput ).toLowerCase();
  }

  private getFirstLetterOfItem( item ): string {
    return String( item[ this.keyText ] ).substring( 0, 1 ).toLowerCase();
  }

  ngOnChanges( changes ) {
    if ( changes[ 'data' ] ) {
      if ( changes[ 'data' ].currentValue ) {
        this.initializeComponent();
      }
    }
  }

}
