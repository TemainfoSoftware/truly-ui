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
  AfterViewInit, SimpleChanges, OnChanges, Renderer2, OnDestroy,
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { TlListItem } from './list-item/list-item';
import { TlInput } from '../input/input';
import { I18nService } from '../i18n/i18n.service';
import { ListItemInterface } from '../dropdownlist/interfaces/list-item';
import { scrollIntoView } from '../core/helper/scrollIntoView';
import * as path from 'object-path';
import { Subscription } from 'rxjs';


export class GroupList {
  description: string;
  items: Array<any>;
}

@Component( {
  selector: 'tl-overlay-list',
  templateUrl: './overlay-list.html',
  styleUrls: [ './overlay-list.scss' ],
} )
export class TlOverlayList implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input( 'datasource' )
  set dataSource(data) {
    this._datasource = data;
    this.getFilteredData();
  }

  get dataSource() {
    return this._datasource;
  }

  @Input( 'searchOnList' ) searchOnList = false;

  @Input( 'itemHeight' ) itemHeight = '';

  @Input( 'inputModelIndex' ) inputModelIndex;

  @Input( 'optionSelected' ) optionSelected;

  @Input( 'typeOfData' ) typeOfData;

  @Input( 'keyText' ) keyText = 'text';

  @Input( 'groupBy' ) groupBy = null;

  @Input( 'keyIcon' ) keyIcon = 'icon';

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

  @ViewChild( 'list', {static: true} ) list: ElementRef;

  @ViewChild( TlInput, {static: true} ) tlInput: TlInput;

  @ViewChild( 'defaultPlaceholder', {static: true} ) defaultPlaceholder: ElementRef;

  @ViewChildren(TlListItem) items: QueryList<TlListItem>;

  public keyManager: ActiveDescendantKeyManager<TlListItem>;

  public notFound = false;

  public groups: GroupList[] = [];

  public unGrouped = [];

  public objectPath = path;

  public searchText = '';

  private _datasource = [];

  private numberItems = 0;

  private subscription = new Subscription();

  get emptyList() {
    return this.i18n.getLocale().OverlayList.emptyList;
  }

  constructor( private renderer: Renderer2,
               private i18n: I18nService ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.handleCustomInputEvents();
    this.keyManager = new ActiveDescendantKeyManager( this.items );
    this.keyManager.withWrap();
    this.handleActiveItem();
    this.handleModelOption();
    this.getFilteredData();
  }

  getFilteredData() {
    this.groups = [];
    this.unGrouped = [];
    if (!this.groupBy) {
      this.unGrouped = this.dataSource;
      return;
    }
    this.dataSource.forEach( ( value ) => {
      if (!this.objectPath.get(value, this.groupBy)) {
        this.unGrouped = this.getItemsGroup(this.objectPath.get(value, this.groupBy));
        return;
      }
      if ( !this.existGroup( this.objectPath.get(value, this.groupBy) ) ) {
        this.groups.push( {
          description: this.objectPath.get(value, this.groupBy),
          items: this.getItemsGroup( this.objectPath.get(value, this.groupBy) )
        } );
      }
    } );
  }

  existGroup( group ) {
    for ( const item of this.groups ) {
      if ( item.description === group ) {
        return true;
      }
    }
    return false;
  }

  getTextContent( item ) {
    return this.typeOfData === 'simple' ? item : this.objectPath.get(item, this.keyText);
  }

  getItemsGroup( group ) {
    const filter = this.dataSource.filter( ( item ) => this.objectPath.get(item, this.groupBy) === group);
    this.numberItems += filter.length;
    return filter;
  }

  handleCustomInputEvents() {
    if (this.customInput) {
      this.handleInputFocus();

      this.subscription.add(this.renderer.listen( this.customInput, 'keydown.enter', () => {
        if (this.hasDataOnDataSource()) {
          this.emitSelectOption();
        }
      }));

      this.subscription.add(this.renderer.listen( this.customInput, 'keydown.arrowdown', () => {
        this.keyManager.setNextItemActive();
        this.handleScrollIntoView();
      }));

      this.subscription.add(this.renderer.listen( this.customInput, 'keydown.arrowup', () => {
        this.keyManager.setPreviousItemActive();
        this.handleScrollIntoView();
      }));
    }
  }

  handleInputFocus() {
    if (this.searchOnList && !this.customFocus) {
      setTimeout(() => {
        this.tlInput.setFocus();
      }, 1);
    }
  }

  hasDataOnDataSource() {
    return this.dataSource.length > 0;
  }

  handleActiveItem() {
    setTimeout(() => {
      if (this.optionSelected) {
        this.setActiveItem( this.optionSelected.index );
        return;
      }
      this.setFirstItemActive();
    }, 1);
  }

  setFirstItemActive() {
    this.removeSelectedAll();
    this.keyManager.setFirstItemActive();
  }

  setActiveItem(index: number) {
    this.removeSelectedAll();
    this.keyManager.setActiveItem(index);
  }

  removeSelectedAll() {
    this.items.forEach((item) => item.selected = false);
  }

  handleScrollIntoView() {
    if (this.keyManager.activeItem) {
      scrollIntoView(this.keyManager.activeItem.element.nativeElement);
    }
  }

  handleInput( $event ) {
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

  handleClickOption( $event, item: TlListItem ) {
    this.stopEvent($event);
    this.keyManager.setActiveItem( item );
    this.emitSelectOption();
  }

  defaultOptionClick() {
    this.defaultOption.emit();
  }

  stopEvent($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  emitSelectOption() {
    this.selectOption.emit( <ListItemInterface>{
      option: this.keyManager.activeItem,
      index: this.keyManager.activeItemIndex
    });
  }

  keydownSearch( $event ) {
    this.searchText = $event.target.value;
    this.search.emit( $event.target.value );
    this.unGrouped = [];
  }

  setNotFound() {
    this.notFound = this.dataSource.length === 0;
  }

  ngOnChanges(changes: SimpleChanges ) {
    this.keyManager = new ActiveDescendantKeyManager( this.items );
    this.handleActiveItem();
    if (changes['datasource']) {
      this.setNotFound();
    }
    if (changes['inputModelIndex']) {
      this.handleModelOption();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

