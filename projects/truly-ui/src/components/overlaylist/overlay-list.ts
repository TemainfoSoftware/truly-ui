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
  Component, EventEmitter, OnInit, Output, Input, ViewChild, ElementRef, ViewChildren, QueryList,
  AfterViewInit } from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ListOptionDirective } from './directives/listoption.directive';



@Component( {
  selector: 'tl-overlay-list',
  templateUrl: './overlay-list.html',
  styleUrls: [ './overlay-list.scss' ],
} )
export class TlOverlayList implements OnInit, AfterViewInit {

  @Input( 'datasource' ) datasource = [];

  @Input( 'searchOnList' ) searchOnList = false;

  @Input( 'height' ) height = '';

  @Input( 'inputModelIndex' ) inputModelIndex;

  @Input( 'optionSelected' ) optionSelected;

  @Input( 'typeOfData' ) typeOfData;

  @Input( 'keyText' ) keyText = 'text';

  @Input( 'icon' ) icon = null;

  @Input( 'defaultIcon' ) defaultIcon = null;

  @Input( 'defaultOptionText' ) defaultOptionText = 'Reset';

  @Input( 'width' ) width = '120px';

  @Input( 'scroll' ) scroll;

  @Input( 'calculatedHeight' ) calculatedHeight;

  @Output() selectOption: EventEmitter<any> = new EventEmitter();

  @Output() defaultOption: EventEmitter<any> = new EventEmitter();

  @Output() search: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'list' ) list: ElementRef;

  @ViewChild( 'defaultPlaceholder' ) defaultPlaceholder: ElementRef;

  @ViewChildren( ListOptionDirective ) options: QueryList<ListOptionDirective>;
  keyManager: ActiveDescendantKeyManager<ListOptionDirective>;

  constructor() {
  }

  ngOnInit() {
    this.handleScroll();
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager( this.options );
    this.keyManager.withWrap();
    this.handleActiveItem();
    this.handleModelOption();
  }

  handleActiveItem() {
    this.optionSelected ?
      this.keyManager.setActiveItem( this.optionSelected.optionIndex ) : this.keyManager.setFirstItemActive();
  }

  handleKeyEvents( $event: KeyboardEvent ) {
    this.keyManager.onKeydown( $event );
    $event.stopPropagation();
  }

  handleKeyUp( $event ) {
    if ( this.searchOnList ) {
      this.keydownSearch( $event );
    }
  }

  handleScroll() {
    if ( this.scroll ) {
      this.calculatedHeight = parseInt( this.height, 10 ) * this.scroll + 'px';
    }
  }

  handleModelOption() {
    if ( this.inputModelIndex ) {
      this.keyManager.setActiveItem( this.inputModelIndex );
    }
  }

  handleClickOption( index: number ) {
    this.keyManager.setActiveItem( index );
    this.emitSelectOption();
  }

  clickDefaultOption() {
    this.defaultOption.emit();
  }

  emitSelectOption() {
    this.selectOption.emit( { option: this.keyManager.activeItem, optionIndex: this.keyManager.activeItemIndex } );
  }

  keydownSearch( $event ) {
    this.search.emit( $event.target.value );
  }


}

