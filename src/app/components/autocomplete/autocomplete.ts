/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
  ChangeDetectionStrategy, Component, ContentChild, EventEmitter,
  Injector, Input, OnDestroy, Output, Renderer2, TemplateRef, ViewChild,
  Optional, Inject, OnInit, AfterViewInit
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { KeyEvent } from '../core/enums/key-events';
import { TlListBox } from '../listbox/listbox';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';

@Component( {
  selector: 'tl-autocomplete',
  templateUrl: './autocomplete.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

export class TlAutoComplete extends ElementBase<string> implements OnInit, AfterViewInit, OnDestroy {

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

  @Input() disabled = false;

  @Input() autocomplete = 'off';

  @Input() placeholder;

  @Input() clearButton = false;

  @Input() id = '';

  @Input() labelDetail = '';

  @Input() labelName = '';

  @Input() openFocus = false;

  @Input() lazyMode = false;

  @Input() searchQuery = [];

  @Input() rowHeight = 30;

  @Input() listStripped = false;

  @ViewChild( NgModel ) model: NgModel;

  @ViewChild( 'input' ) tlinput;

  @ViewChild( 'autoComplete' ) autoComplete;

  @ViewChild( 'autocompleteList' ) list;

  @ViewChild( TlListBox ) listBox: TlListBox;

  @ContentChild( TemplateRef ) customTemplate: TemplateRef<any>;

  @Output() addNew: EventEmitter<any> = new EventEmitter();

  @Output() clickItem: EventEmitter<any> = new EventEmitter();

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  public listLeftPosition;

  public listTopPosition;

  private documentListener = [];

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any>, injector: Injector, private renderer: Renderer2 ) {
    super( validators, asyncValidators, injector );
  }

  ngOnInit() {
    this.handleCustom();
  }

  ngAfterViewInit() {
    this.listenerKeyDown();
    this.listenClickDocument();
    this.listenScrollDocument();
    this.validationProperty();
    this.listBox.showList = false;
    this.listBox.detectChanges();
    this.getAutoCompleteWidth();
  }

  listenerKeyDown() {
    this.renderer.listen( this.tlinput.input.nativeElement, 'keydown', ( $event ) => {
      this.handleKeyDown( $event );
    } );
  }

  handleCustom() {
    if ( this.customTemplate ) {
      this.listBox.customInput = true;
      this.listBox.template = this.customTemplate;
    }
  }

  validationProperty() {
    if ( (!this.labelName && !this.listBox.isDataArrayString()) ) {
      throw new Error( 'The [labelName] property is required to show the content on input while selecting' );
    }
  }

  listenScrollDocument() {
    this.documentListener.push( this.renderer.listen( document, 'scroll', ( $event ) => {
      this.listBox.showList = false;
      this.listBox.detectChanges();
    } ) );
  }

  listenClickDocument() {
    this.documentListener.push( this.renderer.listen( document, 'click', ( $event ) => {
      if ( this.isNotRelatedWithAutocomplete( $event ) ) {
        this.listBox.showList = false;
        this.listBox.detectChanges();
        return;
      }
      this.handleOpenOnFocus();
    } ) );
  }

  onFocusInput( $event ) {
    this.setListPosition();
    this.handleOpenOnFocus();
  }

  /*  onKeyUp( $event ) {
   if ( JSON.stringify( this.initialModel ) === JSON.stringify( this.model ) ) {
   $event.stopPropagation();
   }
   }*/

  handleOpenOnFocus() {
    if ( this.openFocus && !this.listBox.showList && this.isAvailableInput() ) {
      this.listBox.showList = true;
      this.listBox.detectChanges();
    }
  }

  isAvailableInput() {
    return !this.tlinput.disabled && !this.tlinput.readonly;
  }

  handleKeyDown( $event ) {
    switch ( $event.keyCode ) {
      case KeyEvent.ENTER:
        this.closeList( $event );
        return;
      case KeyEvent.ESCAPE:
        this.handleEscape();
        return;
    }
  }

  handleEscape() {
    this.handleFilteredListNotSelected();
  }

  handleFilteredListNotSelected() {
    if ( this.listBox.showList && this.listBox.filteredData.length > 0 && !this.listBox.itemSelected ) {
      this.listBox.handleClickItem( this.listBox.dataService.datasource[ 0 ], 0 );
    }
  }

  closeList( $event ) {
    $event.preventDefault();
    if ( this.listBox.showList ) {
      $event.stopPropagation();
    }
    this.listBox.showList = false;
    this.listBox.resetCursors();
    this.listBox.detectChanges();
  }

  onAddNew() {
    this.addNew.emit();
  }

  onInputFocusOut( $event ) {
    if ( !this.isRelatedTargetLi( $event ) ) {
      this.listBox.showList = false;
      this.listBox.detectChanges();
    }
  }

  onClickItemList( $event ) {
    if ( $event ) {
      this.clickItem.emit( $event );
      this.setInputValue( $event );
      this.tlinput.input.nativeElement.focus();
    }
  }

  setInputValue( $event ) {
    this.value =
        !this.listBox.isDataArrayString() ? $event.row[ this.labelName ] : $event.row;
  }

  setListPosition() {
    this.listLeftPosition = document.activeElement.getBoundingClientRect().left;
    this.listTopPosition = document.activeElement.getBoundingClientRect().top + this.tlinput.input.nativeElement.offsetHeight;
  }

  isNotRelatedWithAutocomplete( $event ) {
    if ( this.isTargetEqualsClearButton( $event ) ) {
      return false;
    }
    if ( !this.existAutocompleteInputInPath( $event ) ) {
      return true;
    }
    if ( this.isTargetEqualsLi ) {
      return false;
    }
    return !this.isTargetEqualsListBox( $event ) &&
      !this.isTargetParentEqualsLi( $event ) &&
      !this.isTargetEqualsInputSearch( $event );
  }

  isTargetEqualsListBox( $event ) {
    return $event.target.className === 'list-box-container';
  }

  isTargetEqualsLi( $event ) {
    return $event.target.nodeName === 'LI';
  }

  isTargetParentEqualsLi( $event ) {
    return $event.target.parentElement.nodeName === 'LI' || $event.target.parentElement.nodeName === 'UL';
  }

  isTargetEqualsClearButton( $event ) {
    return $event.target.className.includes( '-clearbutton' );
  }

  isRelatedTargetLi( $event ) {
    if ( $event.relatedTarget ) {
      return $event.relatedTarget.nodeName === 'LI';
    }
  }

  isTargetEqualsInputSearch( $event ) {
    return $event.target === this.tlinput.input.nativeElement;
  }

  onLazyLoadAutocomplete( $event ) {
    this.lazyLoad.emit( $event );
  }

  existAutocompleteInputInPath( $event ) {
    for ( let input = 0; input < $event.path.length; input++ ) {
      if ( this.tlinput.input.nativeElement === $event.path[ input ] ) {
        return true;
      }
    }
    return false;
  }

  getAutoCompleteWidth() {
    return this.tlinput.input.nativeElement.offsetWidth;
  }

  /*    highlight( text: string, search ): string {
   if ( typeof search !== 'object' ) {
   if ( search && text ) {
   let pattern = search.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&' );
   pattern = pattern.split( ' ' ).filter( ( t ) => {
   return t.length > 0;
   } ).join( '|' );
   const regex = new RegExp( pattern, 'gi' );

   return text.replace( regex, ( match ) => `<strong>${match}</strong>` );
   }
   return text;
   }
   }*/

  ngOnDestroy() {
    this.documentListener.forEach( ( listener ) => {
      listener();
    } );
  }

}
