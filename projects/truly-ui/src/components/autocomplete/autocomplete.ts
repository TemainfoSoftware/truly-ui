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
  Component, ContentChild, EventEmitter,
  Input, OnDestroy, Output, TemplateRef, ViewChild,
  Optional, Inject, OnInit, AfterViewInit, OnChanges, Renderer2,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { TlListBox } from '../listbox/listbox';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'tl-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrls: [ './autocomplete.scss' ],
  animations: [
    trigger(
      'enterAnimation', [
        state( 'true', style( { opacity: 1, transform: 'translate(0%,0%)' } ) ),
        state( 'false', style( { opacity: 0, transform: 'translate(0%,-3%)', flex: '0' } ) ),
        transition( '1 => 0', animate( '100ms' ) ),
        transition( '0 => 1', animate( '100ms' ) ),
      ]
    )
  ],
  providers: [ MakeProvider( TlAutoComplete ) ]
} )

export class TlAutoComplete extends ElementBase<string> implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() data: Array<any>;

  @Input() label = 'AutoComplete 1';

  @Input() labelSize;

  @Input() iconBefore;

  @Input() iconAfter;

  @Input() textBefore;

  @Input() textAfter;

  @Input() textAlign = 'left';

  @Input() labelPlacement = 'left';

  @Input() readonly = false;

  @Input() disabled = true;

  @Input() autocomplete = 'off';

  @Input() placeholder;

  @Input() clearButton = false;

  @Input() id = '';

  @Input() modelValue = '';

  @Input() labelDetail = '';

  @Input() labelName = '';

  @Input() openFocus = false;

  @Input() lazyMode = false;

  @Input() searchQuery = [];

  @Input() rowHeight = 30;

  @Input() listStripped = false;

  @Input() charsToSearch = 2;

  @Input() rowsClient = 5;

  @Input() addNewMessage = 'Add New';

  @ViewChild( NgModel ) model: NgModel;

  @ViewChild( 'inputWriter' ) tlinput;

  @ViewChild( 'autoComplete' ) autoComplete;

  @ViewChild( 'autocompleteList' ) list;

  @ViewChild( TlListBox ) listBox: TlListBox;

  @ContentChild( TemplateRef ) customTemplate: TemplateRef<any>;

  @Output() addNew: EventEmitter<any> = new EventEmitter();

  @Output() clickItem: EventEmitter<any> = new EventEmitter();

  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  public widthInput;

  public loading = true;

  public isOpen = false;

  private  listener;

  public trigger;

  private listeners: Subscription = new Subscription();

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any>, private renderer: Renderer2 ) {
    super( validators, asyncValidators );
  }

  ngOnInit() {
    this.getWidth();
  }

  ngAfterViewInit() {
    this.validateModelValueProperty();
    this.validationProperty();
    this.listenContainer();
  }

  listenContainer() {
    this.renderer.listen(document, 'click', () => {
      this.isOpen = false;
    });
  }

  handleModelInit() {
    setTimeout( () => {
      if ( this.model.model ) {
        for ( let item = 0; item < this.data.length; item++ ) {
          if ( String( this.getValueNested( this.modelValue, this.data[ item ] ) ) === String( this.model.viewModel ) ) {
            this.clickItem.emit( { index: item, row: this.data[ item ] } );
            return this.tlinput.value = this.getValueNested( this.labelName, this.data[ item ] );
          }
        }
      }
    }, 1 );
  }

  getValueNested( nestedKeys: string, data: Array<any> ) {
    return nestedKeys.split( '.' ).reduce( ( a, b ) => a[ b ], data );
  }

  onClearInput() {
    this.value = '';
  }

  validationProperty() {
    if ( (!this.labelName && !this.listBox.isDataArrayString()) ) {
      throw new Error( 'The [labelName] property is required to show the content on input while selecting' );
    }
  }

  onFocusInput() {
    this.getWidth();
    this.handleOpenOnFocus();
  }

  handleOpenOnFocus() {
    if ( (this.openFocus) && (this.isAvailableInput()) ) {
      this.isOpen = true;
    }
  }

  isAvailableInput() {
    return !this.tlinput.disabled && !this.tlinput.readonly;
  }

  onAddNew() {
    this.addNew.emit();
  }

  onClickItemList( $event ) {
    if ( $event ) {
      this.clickItem.emit( $event );
      this.setInputValue( $event );
      this.tlinput.input.nativeElement.focus();
      this.isOpen = false;
    }
  }

  onSelectItemList( $event ) {
    if ( $event ) {
      this.selectItem.emit( $event );
      this.setInputValue( $event );
      this.tlinput.input.nativeElement.focus();
    }
  }

  setInputValue( $event ) {
    this.tlinput.value = this.getValueNested( this.labelName, $event.row );
    this.value = !this.listBox.isDataArrayString() ? this.getValueNested( this.modelValue, $event.row ) : $event.row;
    this.listBox.detectChanges();
  }

  getWidth() {
    this.widthInput = this.tlinput.input.nativeElement.offsetWidth;
  }

  onLazyLoadAutocomplete( $event ) {
    this.lazyLoad.emit( $event );
  }

  validateModelValueProperty() {
    if ( !this.modelValue ) {
      throw new Error( 'The [modelValue] property must be specified.' );
    }
  }

  ngOnDestroy() {
    this.listeners.unsubscribe();
  }

  ngOnChanges( changes ) {
    if ( (!changes.data.previousValue) && (changes.data.currentValue) ) {
      this.loading = false;
      this.disabled = false;
      this.handleModelInit();
    }
  }

}
