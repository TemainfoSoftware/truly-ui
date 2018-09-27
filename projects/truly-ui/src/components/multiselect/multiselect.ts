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
  ContentChild, AfterViewInit, ChangeDetectorRef, SimpleChanges, OnChanges,
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { OverlayAnimation } from '../core/directives/overlay-animation';
import { ListItemMeta } from '../overlaylist/overlay-list';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

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

  @Input() labelPlacement: 'left' | 'top' = 'left';

  @Input() debounceTime = 200;

  @Input() itemAmount = 5;

  @Input() minLengthSearch = 2;

  @Input() placeholder = 'Select item...';

  @Input() sortAlphabetically = false;

  @Input() onlyKeyValue = false;

  @Input() disabled = false;

  @Output() getSelecteds: EventEmitter<any> = new EventEmitter();

  @Output() tagClick: EventEmitter<any> = new EventEmitter();

  @Output() tagRemove: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'input' ) input;

  @ContentChild( NgModel ) model: NgModel;

  @ContentChild( FormControlName ) controlName: FormControlName;

  public typeOfData = 'complex';

  public isOpen = false;

  public filteredItems = [];

  public tags = [];

  public showIcon = true;

  public hasValidator;

  public subject: Subject<any> = new Subject();

  public touched = false;

  public required = false;

  private selectTag: number;

  private placeholderMessage: string;

  private dataSource = [];

  private subscription: Subscription = new Subscription();

  constructor( private change: ChangeDetectorRef ) {
    super();
  }

  ngOnInit() {
    this.placeholderMessage = this.placeholder;
    this.dataSource = [ ...this.data ];
    this.validateTypeDataSource();
    this.setFilteredItems();
    this.validationProperty();
    this.handleTyping();
  }

  ngAfterViewInit() {
    this.validateHasModel();
    this.setRequired();
    this.setDisabled();
    this.handleValidator();
  }

  setDisabled() {
    if (this.controlName) {
      this.disabled = this.controlName.disabled;
    }
  }

  handleTyping() {
    this.subscription.add( this.subject.pipe(
      map( event => event ),
      debounceTime( this.debounceTime ),
      distinctUntilChanged(),
    ).subscribe( ( value ) => {
      this.searchItem( value );
    } ) );
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
        this.cleanInput();
        this.handleModelValueAsTags();
        this.removeElementsForFilter();
        this.setModelValue();
      }
      this.selectTag = this.tags.length;
    }, 1 );
  }

  handleModelValueAsTags() {
    this.value.forEach( ( value ) => {
      let indexMock;
      indexMock = this.keyValue ? this.dataSource.findIndex( (item => this.getCompare( item, value )) ) :
        this.dataSource.findIndex( (item => JSON.stringify( item ) === JSON.stringify( value )) );
      if ( indexMock > -1 ) {
        this.tags.push( this.dataSource[ indexMock ] );
      }
    } );
  }

  getCompare( item, value ) {
    if ( value[ this.keyValue ] ) {
      return item[ this.keyValue ] === value[ this.keyValue ];
    } else {
      return item[ this.keyValue ] === value;
    }
  }

  handleValidator() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl ) {
      this.hasValidator = currentControl.control.validator;
      this.change.detectChanges();
    }
  }

  sortFilteredItems() {
    if ( this.sortAlphabetically ) {
      this.filteredItems.sort( ( a, b ) => {
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
        const compareValue = this.isSimpleData() ? value : value[ this.keyValue ];
        const compareValue2 = this.isSimpleData() ? value2 : value2[ this.keyValue ];
        if ( JSON.stringify( compareValue ) === JSON.stringify( compareValue2 ) ) {
          this.dataSource = this.dataSource.filter( ( filter, indexFilter ) => (indexFilter !== index) );
        }
      } );
    } );
    this.filteredItems = this.dataSource;
    this.sortFilteredItems();
  }

  validationProperty() {
    if ( !this.icon ) {
      this.showIcon = false;
    }
    if ( this.data === undefined || this.query === undefined && !this.isSimpleData() ) {
      throw new Error( 'The property [data] and property [query] are Required when using a complex array object ' + '' +
        'Example : ' + '<tl-multiselect [data]="source" [query]="name"' );
    }
    if ( !this.isSimpleData() && !this.keyValue ) {
      throw new Error( 'You must pass the [keyValue] property when not using an ArrayString as datasource' );
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
        return this.filteredItems = this.data;
      }
    }, 1 );
    this.sortFilteredItems();
  }

  handleKeyDown( $event ) {
    switch ( $event.keyCode ) {
      case KeyEvent.DELETE:
        this.stopEventKeyDown( $event );
        this.handleKeyDelete( $event );
        break;
      case KeyEvent.BACKSPACE:
        this.isOpen = true;
        this.handleKeyBackspace();
        break;
      case KeyEvent.ESCAPE:
        if ( this.isOpen ) {
          this.stopEventKeyDown( $event );
        }
        this.isOpen = false;
        break;
      case KeyEvent.ENTER:
        this.handleOverlayList();
        if ( this.isOpen ) {
          this.stopEventKeyDown( $event );
        }
        break;
      case KeyEvent.TAB:
        if ( this.isOpen ) {
          this.isOpen = false;
        }
        break;
      case KeyEvent.ARROWDOWN:
        this.handleIsOpen( $event );
        break;
      case KeyEvent.ARROWUP:
        this.handleIsOpen( $event );
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

  handleOverlayList() {
    if ( this.filteredItems.length === 0 ) {
      this.isOpen = false;
    }
  }

  handleIsOpen( $event ) {
    if ( this.isOpen ) {
      this.stopEventKeyDown( $event );
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
    this.tags.forEach( ( item ) => item.selected = false );
  }

  handleInputFocus() {
    this.touched = true;
    this.sortFilteredItems();
  }

  setFilteredItems() {
    this.validateEmptySearch();
    if ( !this.isTagsLengthMoreThanZero() ) {
      if ( this.isFilteredLengthEqualsDataLength() ) {
        this.filteredItems = this.data;
        this.sortFilteredItems();
      }
    }
  }

  removeTagOfFilter( tag? ) {
    this.filteredItems = this.filteredItems.filter( ( item ) => {
      return JSON.stringify( tag ) !== JSON.stringify( item );
    } );
    this.change.detectChanges();
    this.sortFilteredItems();
  }

  setSelectTagAsTrue() {
    this.tags[ this.selectTag ][ 'selected' ] = true;
  }

  setInputFocus() {
    this.input.nativeElement.focus();
  }

  addTag( item: ListItemMeta ) {
    if ( item.option ) {
      this.tags.push( item.option.item );
      this.placeholder = '';
      this.getSelecteds.emit( this.tags );
      this.setModelValue();
      this.removeTagOfFilter( item.option.item );
      this.removeElementsForFilter();
      this.handleAllSelected();
      this.cleanInput();
    }
  }

  handleAllSelected() {
    if ( this.filteredItems.length === 0 ) {
      this.isOpen = false;
      this.setInputFocus();
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
      modeltemp.push( this.onlyKeyValue ? value[ this.keyValue ] : value );
    } );
    this.value = modeltemp;
  }

  deleteTagSelected() {
    this.addTagSelectedToFiltered();
    this.removeTagSelectedOfTags();
    this.sortFilteredItems();
  }

  getTagSelected() {
    return this.tags.filter( ( item ) => item.selected )[ 0 ];
  }

  removeTagSelectedOfTags() {
    this.tags = this.tags.filter( ( item ) => !item.selected );
  }

  addTagSelectedToFiltered() {
    this.filteredItems = [ ...this.filteredItems, this.getTagSelected() ];
  }

  searchItem( imputed ) {
    if ( this.isValueMoreOrEqualThanMinLengthSearch( imputed ) ) {
      !this.isTagsLengthMoreThanZero() ? this.filterOnData( imputed, this.dataSource ) :
        this.filterOnData( imputed, this.filteredItems );
    } else {
      this.removeElementsForFilter();
    }
  }

  filterOnData( imputed: string, dataSource: Array<any> ) {
    this.filteredItems = dataSource.filter( ( value ) => {
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
      this.filteredItems.push( item );
    } else {
      this.filteredItems.push( this.tags[ index ] );
    }
    this.tagRemove.emit( item ? item : this.tags[ index ] );
    this.getSelecteds.emit( this.tags );
    this.tags.splice( index, 1 );
    this.changePlaceholder();
    this.setInputFocus();
    this.setModelValue();
    this.sortFilteredItems();
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
    return this.filteredItems.length === this.dataSource.length;
  }

}

