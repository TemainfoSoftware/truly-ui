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
  Component, EventEmitter, OnInit, Output, Input, ViewChild, ElementRef, ViewChildren, QueryList,
  AfterViewInit, SimpleChanges, OnChanges, Renderer2,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { KeyEvent } from '../core/enums/key-events';
import { TlListItem } from './list-item/list-item';
import { TlInput } from '../input/input';
import { I18nService } from '../i18n/i18n.service';
import { ListItemInterface } from '../dropdownlist/interfaces/list-item';

@Component( {
  selector: 'tl-overlay-list',
  templateUrl: './overlay-list.html',
  styleUrls: [ './overlay-list.scss' ],
} )
export class TlOverlayList implements OnInit, AfterViewInit, OnChanges {

  @Input( 'datasource' ) datasource = [];

  @Input( 'searchOnList' ) searchOnList = false;

  @Input( 'itemHeight' ) itemHeight = '';

  @Input( 'inputModelIndex' ) inputModelIndex;

  @Input( 'optionSelected' ) optionSelected;

  @Input( 'typeOfData' ) typeOfData;

  @Input( 'keyText' ) keyText = 'text';

  @Input() keyIcon = 'icon';

  @Input( 'icon' ) icon = null;

  @Input( 'defaultIcon' ) defaultIcon = null;

  @Input( 'defaultOptionText' ) defaultOptionText = 'Reset';

  @Input( 'width' ) width = '120px';

  @Input( 'maxHeight' ) maxHeight = '200px';

  @Input( 'customInput' ) customInput;

  @Input( 'customFocus' ) customFocus;

  @Input( 'hasDefaultOption' ) hasDefaultOption = false;

  @Output() selectOption: EventEmitter<ListItemInterface> = new EventEmitter();

  @Output() defaultOption: EventEmitter<any> = new EventEmitter();

  @Output() search: EventEmitter<any> = new EventEmitter();

  @Output() findByLetter: EventEmitter<any> = new EventEmitter();

  @ViewChild( 'list' ) list: ElementRef;

  @ViewChild( TlInput ) inputSearch: TlInput;

  @ViewChild( 'defaultPlaceholder' ) defaultPlaceholder: ElementRef;

  @ViewChildren(TlListItem) items: QueryList<TlListItem>;
  public keyManager: FocusKeyManager<TlListItem>;

  public notFound = false;

  get emptyList() {
    return this.i18n.getLocale().OverlayList.emptyList;
  }

  constructor( private renderer: Renderer2, private i18n: I18nService ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.handleCustomInputEvents();
    this.keyManager = new FocusKeyManager( this.items );
    this.keyManager.withWrap();
    this.handleActiveItem();
    this.handleModelOption();
  }

  handleCustomInputEvents() {
    if (this.customInput) {
      this.renderer.listen( this.customInput, 'keydown', ($event) => {
        if (this.isKeyCodeEnter($event) && this.hasDataOnDataSource()) {
          this.handleActiveItem();
          this.emitSelectOption();
        }
        this.handleKeyEvents($event);
      });
    }
  }

  hasDataOnDataSource() {
    return this.datasource.length > 0;
  }

  isKeyCodeEnter($event) {
    return $event.keyCode === KeyEvent.ENTER;
  }

  handleActiveItem() {
    setTimeout(() => {
      this.optionSelected ?
        this.keyManager.setActiveItem( this.optionSelected.index ) : this.keyManager.setFirstItemActive();
    }, 1);
  }

  handleKeyEvents( $event: KeyboardEvent ) {
    this.keyManager.onKeydown( $event );
  }

  handleKeyUp( $event ) {
    if ( this.searchOnList ) {
      this.keydownSearch( $event );
    }
  }

  handleModelOption() {
    if ( this.inputModelIndex && this.items ) {
      this.keyManager.setActiveItem( this.inputModelIndex );
    }
  }

  handleSearchByLetter($event) {
    this.findByLetter.emit($event.key);
  }

  handleClickOption( index: number, $event ) {
    this.stopEvent($event);
    this.keyManager.setActiveItem( index );
    this.emitSelectOption();
  }

  defaultOptionClick() {
    this.defaultOption.emit();
  }

  stopEvent($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  searching() {
    this.customFocus ? this.customFocus.focus() : this.inputSearch.setFocus();
  }

  emitSelectOption() {
    this.selectOption.emit( <ListItemInterface>{
      option: this.keyManager.activeItem,
      index: this.keyManager.activeItemIndex
    });
  }

  keydownSearch( $event ) {
    this.search.emit( $event.target.value );
  }

  setNotFound() {
    this.notFound = this.datasource.length === 0;
  }

  ngOnChanges(changes: SimpleChanges ) {
    this.keyManager = new FocusKeyManager( this.items );
    this.handleActiveItem();
    if (changes['datasource']) {
      this.setNotFound();
    }
    if (changes['inputModelIndex']) {
      this.handleModelOption();
    }
  }
}

