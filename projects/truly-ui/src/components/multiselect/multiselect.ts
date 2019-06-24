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
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ContentChild, AfterViewInit, ChangeDetectorRef, OnDestroy,
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { FormControl, FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { OverlayAnimation } from '../core/directives/overlay-animation';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ListItemInterface } from '../dropdownlist/interfaces/list-item';
import { MultiSelectErrorMessages } from './enums/error-messages';
import { scrollIntoView } from '../core/helper/scrollIntoView';

@Component( {
  selector: 'tl-multiselect',
  templateUrl: './multiselect.html',
  styleUrls: [ './multiselect.scss' ],
  animations: [ OverlayAnimation ],
  providers: [
    [ MakeProvider( TlMultiSelect ) ]
  ]
} )
export class TlMultiSelect extends ValueAccessorBase<any> implements OnInit, AfterViewInit, OnDestroy {

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

  @ViewChild( 'input', {static: true} ) input;

  @ContentChild( NgModel, {static: true} ) model: NgModel;

  @ContentChild( FormControlName, {static: true} ) controlName: FormControlName;

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

  private control;

  constructor( private change: ChangeDetectorRef ) {
    super();
  }

  ngOnInit() {
    this.placeholderMessage = this.placeholder;
    this.dataSource = [ ...this.data ];
    this.validateTypeDataSource();
    this.setFilteredItems();
    this.validateProperties();
    this.handleTyping();
  }

  ngAfterViewInit() {
    this.validateHasModel();
    this.setControl();
    this.setRequired();
    this.setDisabled();
    this.handleValidator();
    this.listenControlChanges();
  }

  private listenControlChanges() {
    this.subscription.add(this.control.valueChanges.subscribe(() => {
      this.validateHasModel();
    }));
  }

  private setDisabled() {
    if ( this.controlName ) {
      this.disabled = this.controlName.disabled;
    }
  }

  private handleTyping() {
    this.subscription.add( this.subject.pipe(
      map( event => event ),
      debounceTime( this.debounceTime ),
      distinctUntilChanged(),
    ).subscribe( ( value ) => {
      this.searchItem( value );
    } ) );
  }

  private handleOpenOnFocus() {
    if ( this.openFocus ) {
      this.isOpen = true;
    }
  }

  private setRequired() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl && currentControl.control.errors ) {
      if ( currentControl.control.errors[ 'required' ] ) {
        this.required = true;
      }
    }
  }

  private setControl() {
    this.control = this.model ? this.model : this.controlName;
  }

  private validateHasModel() {
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

  private handleModelValueAsTags() {
    this.value.forEach( ( value ) => {
      let indexMock;
      indexMock = this.keyValue ? this.dataSource.findIndex( (item => this.getCompare( item, value )) ) :
        this.dataSource.findIndex( (item => JSON.stringify( item ) === JSON.stringify( value )) );
      if ( indexMock > -1 ) {
        this.tags.push( this.dataSource[ indexMock ] );
      }
    } );
  }

  private getCompare( item, value ) {
    return value[ this.keyValue ] ? (item[ this.keyValue ] === value[ this.keyValue ]) : (item[ this.keyValue ] === value);
  }

  private handleValidator() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl ) {
      this.hasValidator = currentControl.control.validator;
      this.change.detectChanges();
    }
  }

  private sortFilteredItems() {
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

  private validateTypeDataSource() {
    const key = Object.keys( this.dataSource )[ 0 ];
    if ( typeof this.data[ key ] === 'string' ) {
      this.typeOfData = 'simple';
    }
  }

  isSimpleData() {
    return this.typeOfData === 'simple';
  }

  private removeElementsForFilter() {
    this.tags.forEach( ( value ) => {
      this.dataSource.forEach( ( value2, index ) => {
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

  private validateProperties() {
    if ( !this.icon ) {
      this.showIcon = false;
    }
    if ( this.isDataUndefined() || this.isQueryUndefined() && !this.isSimpleData() ) {
      throw new Error( <string>MultiSelectErrorMessages.DATAUNDEFINED );
    }
    if ( !this.isSimpleData() && !this.keyValue ) {
      throw new Error( <string>MultiSelectErrorMessages.NOTSIMPLE_AND_NOTKEYVALUE );
    }
    if ( !this.labelTag ) {
      this.labelTag = this.query;
    }
    if ( this.isUndefinedDetail() && this.hasDetailOnTagProperty() ) {
      throw new Error( <string>MultiSelectErrorMessages.NOTDETAIL_AND_WITHDETAILTAG );
    }
  }

  private isQueryUndefined() {
    return this.query === undefined;
  }

  private isDataUndefined() {
    return this.data === undefined;
  }

  private isUndefinedDetail() {
    return this.detail === undefined;
  }

  private hasDetailOnTagProperty() {
    return this.detailOnTag !== null;
  }

  private validateEmptySearch() {
    setTimeout( () => {
      if ( this.input.nativeElement.value === '' && this.hasTags() ) {
        return this.filteredItems = this.data;
      }
    }, 1 );
    this.sortFilteredItems();
  }

  handleKeyDown( $event ) {
    const keyEvent = {
      [KeyEvent.DELETE]: () => this.handleKeyDelete( $event ),
      [KeyEvent.BACKSPACE]: () => this.handleKeyBackspace(),
      [KeyEvent.ESCAPE]: () => this.handleKeySpace( $event ),
      [KeyEvent.ENTER]: () => this.handleKeyEnter( $event ),
      [KeyEvent.TAB]: () => this.handleKeyTab(),
      [KeyEvent.ARROWDOWN]: () => this.handleIsOpen( $event ),
      [KeyEvent.ARROWUP]: () => this.handleIsOpen( $event ),
      [KeyEvent.ARROWLEFT]: () => this.handleArrowLeft( $event ),
      [KeyEvent.ARROWRIGHT]: () => this.handleArrowRight( $event )
    };
    if ( keyEvent[ $event.keyCode ] ) {
      keyEvent[ $event.keyCode ]();
    }
  }

  private handleOverlayList() {
    if ( this.filteredItems.length === 0 ) {
      this.isOpen = false;
    }
  }

  handleClickWrapper() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
    this.setInputFocus();
  }

  setInputFocus() {
    this.input.nativeElement.focus();
  }

  private handleIsOpen( $event ) {
    if ( this.isOpen ) {
      this.stopEventKeyDown( $event );
    }
  }

  private handleKeyDelete( $event ) {
    this.stopEventKeyDown( $event );
    this.deleteTagSelected();
  }

  private handleKeyBackspace() {
    this.isOpen = true;
    this.removeTagOnBackspace();
  }

  private handleArrowRight( $event ) {
    this.stopEventKeyDown( $event );
    if ( !this.isSelectedTagEqualsLastTag() && this.hasTags() ) {
      this.selectTag++;
      this.cleanSelected();
      this.setSelectTagAsTrue();
    }
  }

  private handleKeyEnter( $event ) {
    this.handleOverlayList();
    if ( this.isOpen ) {
      this.stopEventKeyDown( $event );
    }
  }

  private handleKeySpace( $event ) {
    if ( this.isOpen ) {
      this.stopEventKeyDown( $event );
    }
    this.isOpen = false;
  }

  private handleKeyTab() {
    if ( this.isOpen ) {
      this.isOpen = false;
    }
  }

  private isSelectedTagEqualsLastTag() {
    return this.selectTag === this.tags.length - 1;
  }

  private handleArrowLeft( $event ) {
    this.stopEventKeyDown( $event );
    if ( this.hasTags() && !this.hasTagSelected() ) {
      this.selectTag--;
      this.cleanSelected();
      this.setSelectTagAsTrue();
    }
  }

  private hasTagSelected() {
    return this.selectTag > 0;
  }

  private cleanSelected() {
    this.tags.forEach( ( item ) => item.selected = false );
  }

  handleInputFocus() {
    this.touched = true;
    this.sortFilteredItems();
    this.handleOpenOnFocus();
  }

  private setFilteredItems() {
    this.validateEmptySearch();
    if ( !this.isTagsLengthMoreThanZero() ) {
      if ( this.isFilteredLengthEqualsDataLength() || this.filteredItems.length === 0 ) {
        this.filteredItems = this.data;
        this.sortFilteredItems();
      }
    }
  }

  private removeTagOfFilter( tag? ) {
    this.filteredItems = this.filteredItems.filter( ( item ) => {
      return JSON.stringify( tag ) !== JSON.stringify( item );
    } );
    this.change.detectChanges();
    this.sortFilteredItems();
  }

  private setSelectTagAsTrue() {
    this.tags[ this.selectTag ][ 'selected' ] = true;
  }

  handleArrowDown( $event ) {
    if ( this.isOpen ) {
      this.stopEventKeyDown( $event );
    }
  }

  addTag( item: ListItemInterface ) {
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

  private handleAllSelected() {
    if ( this.filteredItems.length === 0 ) {
      this.isOpen = false;
    }
  }

  private stopEventKeyDown( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  private setModelValue() {
    const modeltemp = [];
    this.tags.forEach( ( value ) => {
      modeltemp.push( this.onlyKeyValue ? value[ this.keyValue ] : value );
    } );
    this.value = modeltemp;
  }

  private deleteTagSelected() {
    this.addTagSelectedToFiltered();
    this.removeTagSelectedOfTags();
    this.sortFilteredItems();
  }

  private getTagSelected() {
    return this.tags.filter( ( item ) => item.selected )[ 0 ];
  }

  private removeTagSelectedOfTags() {
    this.tags = this.tags.filter( ( item ) => !item.selected );
  }

  private addTagSelectedToFiltered() {
    this.filteredItems = [ ...this.filteredItems, this.getTagSelected() ];
  }

  private searchItem( imputed ) {
    if ( this.isValueMoreOrEqualThanMinLengthSearch( imputed ) ) {
      !this.isTagsLengthMoreThanZero() ? this.filterOnData( imputed, this.dataSource ) :
        this.filterOnData( imputed, this.filteredItems );
    } else {
      this.removeElementsForFilter();
    }
  }

  private filterOnData( imputed: string, dataSource: Array<any> ) {
    this.filteredItems = dataSource.filter( ( value ) => {
      const typeValue = this.isSimpleData() ? value : value[ this.query ];
      return typeValue.toString().toUpperCase().includes( imputed.toUpperCase().trim() );
    } );
  }

  private isValueMoreOrEqualThanMinLengthSearch( value ) {
    return value.length >= this.minLengthSearch;
  }

  selectTagClick( index, item? ) {
    this.tagClick.emit( item );
    this.selectTag = index;
  }

  private changePlaceholder() {
    if ( !this.hasTags() ) {
      this.placeholder = this.placeholderMessage;
    }
  }

  private removeTagOnBackspace() {
    if ( this.isInputValueEqualsEmpty() && this.isTagsLengthMoreThanZero() ) {
      this.removeTag( this.tags.length - 1 );
    } else {
      this.setFilteredItems();
    }
  }

  removeTag( index, item? ) {
    this.filteredItems.push( item ? item : this.tags[ index ] );
    this.tagRemove.emit( item ? item : this.tags[ index ] );
    this.getSelecteds.emit( this.tags );
    this.tags.splice( index, 1 );
    this.changePlaceholder();
    this.setModelValue();
    this.sortFilteredItems();
    this.cleanInput();
  }

  private cleanInput() {
    setTimeout( () => {
      this.input.nativeElement.value = '';
    }, 1 );
  }

  private hasTags() {
    return this.tags.length > 0;
  }

  private isInputValueEqualsEmpty() {
    return this.input.nativeElement.value === '';
  }

  private isTagsLengthMoreThanZero() {
    return this.tags.length > 0;
  }

  private isFilteredLengthEqualsDataLength() {
    return this.filteredItems.length === this.dataSource.length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

