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
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ContentChild, AfterViewInit, ChangeDetectorRef,
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { OverlayAnimation } from '../core/directives/overlay-animation';

@Component( {
  selector: 'tl-multiselect',
  templateUrl: './multiselect.html',
  styleUrls: [ './multiselect.scss' ],
  animations: [ OverlayAnimation ],
  providers: [
    [ MakeProvider( TlMultiSelect ) ]
  ]
} )
export class TlMultiSelect extends ValueAccessorBase<any> implements OnInit, AfterViewInit {

  @Input() keyColor: string;

  @Input() color = 'basic';

  @Input() data = [];

  @Input() query: string;

  @Input() label: string;

  @Input() labelSize = '100px';

  @Input() labelTag: string;

  @Input() detail: string;

  @Input() icon: string;

  @Input() defaultColorTag = '';

  @Input() defaultIconTag = null;

  @Input() openFocus = true;

  @Input() detailOnTag = null;

  @Input() keyValue = null;

  @Input() itemHeight = '30px';

  @Input() itemAmount = 5;

  @Input() minLengthSearch = 2;

  @Input() placeholder = '';

  @Input() sortAlphabetically = false;

  @Output() getSelecteds: EventEmitter<any> = new EventEmitter();

  @Output() tagClick: EventEmitter<any> = new EventEmitter();

  @Output() tagRemove: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'input' ) input;

  @ContentChild( NgModel ) model: NgModel;

  @ContentChild( FormControlName ) controlName: FormControlName;

  public typeOfData = 'complex';

  public isOpen = false;

  public filteredItens = [];

  public tags = [];

  public showIcon = true;

  private selectTag: number;

  private placeholderMessage: string;

  private dataSource = [];

  public hasValidator;

  public touched = false;

  public required = false;

  constructor( private change: ChangeDetectorRef ) {
    super();
  }

  ngOnInit() {
    this.placeholderMessage = this.placeholder;
    this.dataSource = this.data;
    this.validateTypeDataSource();
    this.setFilteredItems();
    this.validationProperty();
  }

  ngAfterViewInit() {
    this.validateHasModel();
    this.setRequired();
    this.handleValidator();
  }

  setRequired() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl && currentControl.control.errors ) {
      if ( currentControl.control.errors[ 'required' ] ) {
        this.required = true;
      }
    }
  }

  validateHasModel() {
    setTimeout( () => {
      if ( this.value ) {
        this.handleModelValueAsTags();
        this.cleanInput();
        this.removeElementsForFilter();
      }
      this.selectTag = this.tags.length;
    }, 1 );
  }

  handleModelValueAsTags() {
    this.setModelValueWithSourceKey();
    this.value.forEach( ( value ) => {
      let indexMock;
      indexMock = this.keyValue ? this.dataSource.findIndex( (item => this.getCompare(item, value)) ) :
        this.dataSource.findIndex( (item => JSON.stringify( item ) === JSON.stringify( value )) );
      if ( indexMock > -1 ) {
        this.tags.push( this.dataSource[ indexMock ] );
      }
    } );
  }

  getCompare(item, value) {
    if (value[this.keyValue]) {
      return item[this.keyValue] === value[this.keyValue];
    } else {
      return item[this.keyValue] === value;
    }
  }

  handleValidator() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl ) {
      this.hasValidator = currentControl.control.validator;
      this.change.detectChanges();
    }
  }

  setModelValueWithSourceKey() {
    for ( let item = 0; item < this.value.length; item++ ) {
      if ( this.value[ item ].source ) {
        return this.tags = this.value;
      }
    }
  }

  sortFilteredItens() {
    if ( this.sortAlphabetically ) {
      this.filteredItens.sort( ( a, b ) => {
        const compareX = this.isSimpleData() ? a : a[ this.query ];
        const compareY = this.isSimpleData() ? b : b[ this.query ];
        const x = compareX.toLowerCase();
        const y = compareY.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      } );
    }
  }

  validateTypeDataSource() {
    const key = Object.keys( this.dataSource )[ 0 ];
    if ( typeof this.data[ key ] === 'string' ) {
      this.typeOfData = 'simple';
    }
  }

  isSimpleData() {
    return this.typeOfData === 'simple';
  }

  removeElementsForFilter() {
    this.tags.forEach( ( value ) => {
      this.dataSource.forEach( ( value2, index, array ) => {
        const compareValue = this.isSimpleData() ? value : value[ this.query ];
        const compareValue2 = this.isSimpleData() ? value2 : value2[ this.query ];
        if ( JSON.stringify( compareValue ) === JSON.stringify( compareValue2 ) ) {
          this.dataSource.splice( index, 1 );
        }
      } );
    } );
    this.filteredItens = this.dataSource;
    this.sortFilteredItens();
  }

  validationProperty() {
    if ( !this.icon ) {
      this.showIcon = false;
    }
    if ( this.data === undefined || this.query === undefined && !this.isSimpleData() ) {
      throw new Error( 'The property [data] and property [query] are Required when using a complex array object ' + '' +
        'Example : ' + '<tl-multiselect [data]="source" [query]="name"' );
    }
    if ( !this.labelTag ) {
      this.labelTag = this.query;
    }
    if ( this.detail === undefined && this.detailOnTag !== null ) {
      throw new Error( 'You have to declare the [detail] property' );
    }
  }

  validateEmptySearch() {
    setTimeout( () => {
      if ( this.input.nativeElement.value === '' && this.isTagsEqualsZero() ) {
        return this.filteredItens = this.data;
      }
    }, 1 );
    this.sortFilteredItens();
  }

  handleKeyDown( $event ) {
    switch ( $event.keyCode ) {
      case KeyEvent.DELETE:
        this.stopEventKeyDown( $event );
        this.handleKeyDelete( $event );
        break;
      case KeyEvent.BACKSPACE:
        this.handleKeyBackspace();
        break;
      case KeyEvent.ARROWLEFT:
        this.stopEventKeyDown( $event );
        if ( !this.isTagsEqualsZero() ) {
          this.handleArrowLeft();
        }
        break;
      case KeyEvent.ARROWRIGHT:
        this.stopEventKeyDown( $event );
        if ( !this.isTagsEqualsZero() ) {
          this.handleArrowRight();
        }
        break;
    }
  }

  handleKeyDelete( $event ) {
    this.stopEventKeyDown( $event );
    this.deleteTagSelected();
  }

  handleKeyBackspace() {
    this.removeTagOnBackspace();
  }

  handleArrowRight() {
    if ( this.selectTag !== this.tags.length - 1 ) {
      this.selectTag++;
      this.cleanSelected();
      this.setSelectTagAsTrue();
    }
  }

  handleArrowLeft() {
    if ( this.selectTag !== 0 && this.tags.length !== 0 ) {
      this.selectTag--;
      this.cleanSelected();
      this.setSelectTagAsTrue();
    }
  }

  cleanSelected() {
    this.tags.forEach((item) => item.selected = false);
  }

  handleInputFocus() {
    this.touched = true;
    this.sortFilteredItens();
  }

  setFilteredItems() {
    this.validateEmptySearch();
    if ( !this.isTagsLengthMoreThanZero() ) {
      if ( this.isFilteredLengthEqualsDataLength() ) {
        this.filteredItens = this.data;
        this.sortFilteredItens();
      }
    }
  }

  removeTagOfFilter( tag? ) {
    this.filteredItens = this.filteredItens.filter( ( item ) => {
      return JSON.stringify( tag ) !== JSON.stringify( item );
    } );
    this.change.detectChanges();
    this.sortFilteredItens();
  }

  setSelectTagAsTrue() {
    this.tags[ this.selectTag ][ 'selected' ] = true;
  }

  setInputFocus() {
    this.input.nativeElement.focus();
  }

  addTag( item ) {
    if ( item[ 'option' ] ) {
      this.tags.push( item[ 'option' ][ 'optionItem' ] );
      this.placeholder = '';
      this.getSelecteds.emit( this.tags );
      this.setModelValue();
      this.removeTagOfFilter( item[ 'option' ][ 'optionItem' ] );
      this.removeElementsForFilter();
      this.cleanInput();
    }
  }

  handleArrowDown( $event ) {
    if ( this.isOpen ) {
      this.stopEventKeyDown( $event );
    }
  }

  stopEventKeyDown( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  setModelValue() {
    const modeltemp = [];
    this.tags.forEach( ( value ) => {
      modeltemp.push( value[ this.keyValue ] );
    } );
    this.value = modeltemp;
  }

  deleteTagSelected() {
    this.addTagSelectedToFiltered();
    this.removeTagSelectedOfTags();
    this.sortFilteredItens();
  }

  getTagSelected() {
    return this.tags.filter( ( item ) => item.selected )[0];
  }

  removeTagSelectedOfTags() {
    this.tags = this.tags.filter((item) => !item.selected );
  }

  addTagSelectedToFiltered() {
    this.filteredItens = [ ...this.filteredItens, this.getTagSelected() ];
  }

  searchItem( imputed ) {
    if ( this.isValueMoreOrEqualThanMinLengthSearch( imputed ) ) {
      !this.isTagsLengthMoreThanZero() ? this.filterOnData( imputed, this.dataSource ) :
        this.filterOnData( imputed, this.filteredItens );
    } else {
      this.removeElementsForFilter();
    }
  }

  filterOnData( imputed: string, dataSource: Array<any> ) {
    this.filteredItens = dataSource.filter( ( value ) => {
      const typeValue = this.isSimpleData() ? value : value[ this.query ];
      return typeValue.toString().toUpperCase().includes( imputed.toUpperCase().trim() );
    } );
  }

  isValueMoreOrEqualThanMinLengthSearch( value ) {
    return value.length >= this.minLengthSearch;
  }

  selectTagCtrlBindClick( item ) {
    this.setInputFocus();
  }

  selectTagClick( event, index, item? ) {
    this.tagClick.emit( item );
    this.selectTag = index;
    if ( event.ctrlKey ) {
      return this.selectTagCtrlBindClick( item );
    }
    this.setInputFocus();
  }

  changeColorTag( tag ) {
    if ( (this.keyColor) && (tag.effect) ) {
      if ( !tag.selected ) {
        return { 'background': tag.effect[ this.keyColor ] };
      }
      return { 'background': tag.effect[ this.keyColor ], 'opacity': 0.8 };
    }
  }

  changePlaceholder() {
    if ( this.tags.length === 0 ) {
      this.placeholder = this.placeholderMessage;
    }
  }

  removeTagOnBackspace() {
    if ( this.isInputValueEqualsEmpty() && this.isTagsLengthMoreThanZero() ) {
      this.removeTag( this.tags.length - 1 );
      this.setInputFocus();
    } else {
      this.setFilteredItems();
    }
  }

  removeTag( index, item? ) {
    if ( item ) {
      this.filteredItens.push( item );
    } else {
      this.filteredItens.push( this.tags[ index ] );
    }
    this.tagRemove.emit( item ? item : this.tags[ index ] );
    this.getSelecteds.emit( this.tags );
    this.tags.splice( index, 1 );
    this.changePlaceholder();
    this.setInputFocus();
    this.setModelValue();
    this.sortFilteredItens();
    this.cleanInput();
  }

  cleanInput() {
    setTimeout( () => {
      this.input.nativeElement.value = '';
    }, 1 );
  }

  isTagsEqualsZero() {
    return this.tags.length === 0;
  }

  isInputValueEqualsEmpty() {
    return this.input.nativeElement.value === '';
  }

  isTagsLengthMoreThanZero() {
    return this.tags.length > 0;
  }

  isFilteredLengthEqualsDataLength() {
    return this.filteredItens.length === this.dataSource.length;
  }

}

