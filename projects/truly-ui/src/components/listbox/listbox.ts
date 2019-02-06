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
  AfterViewInit, Component, Output, Input, QueryList, ViewChildren, ViewChild,
  TemplateRef, Renderer2, EventEmitter, OnDestroy
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ListBase } from './parts/classes/list-base';
import { isVisibleInList } from '../core/helper/check-element-on-list';
import { KeyEvent } from '../core/enums/key-events';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DataSourceList } from '../core/classes/datasource-list';
import { TlInput } from '../input/input';
import { TlItemSelectedDirective } from './parts/directives/item-selected.directive';
import { I18nService } from '../i18n/i18n.service';

@Component( {
  selector: 'tl-listbox',
  templateUrl: './listbox.html',
  styleUrls: [ './listbox.scss' ],
} )
export class TlListBox extends ListBase implements AfterViewInit, OnDestroy {

  @Input('data')
  set data( value ) {
    this._data = value;
    this.setUpData();
  }

  get data() {
    return this._data;
  }

  @Input() rowHeight = 40;

  @Input() template: TemplateRef<any>;

  @Input('inputElement')
  set inputElement(value) {
    this._inputElement = value;
    if (value instanceof TlInput) {
      this._inputElement = value.getNativeInput();
    }
  }

  get inputElement() {
    return this._inputElement;
  }

  @Input() keyText = 'description';

  @Input() color = 'basic';

  @Input() searchControl: FormControl;

  @Input() height = '200px';

  @Input() debounceTime = 200;

  @Input() searchBy = 'description';

  @Input() nothingToShowMessage = this.i18nService.getLocale().Listbox.notFoundText;

  @Input() totalLength = 100;

  @Input() rowsPage = 10;

  @Input() lazyMode = false;

  @Output() clickItem: EventEmitter<any> = new EventEmitter();

  @ViewChild( CdkVirtualScrollViewport ) cdkVirtualScroll: CdkVirtualScrollViewport;

  @ViewChildren( TlItemSelectedDirective ) listItems: QueryList<TlItemSelectedDirective>;

  private subscription = new Subscription();

  private _data = [];

  private _inputElement;

  public dataSource: DataSourceList;

  public nothingToShow = true;

  constructor(private renderer: Renderer2, private i18nService: I18nService) {
    super();
  }

  ngAfterViewInit() {
    this.listKeyManager = new ActiveDescendantKeyManager( this.listItems );
    setTimeout(() => {
      this.initializeListBox();
      this.handleListeners();
    }, 200);
  }

  private handleListeners() {
    this.subscription.add(this.renderer.listen(this.getElementTarget(), 'keydown', ($event) => {
      const event = {
        [KeyEvent.ARROWDOWN] : () => this.handleKeyArrowDown($event),
        [KeyEvent.ARROWUP] : () => this.handleKeyArrowUp($event)
      };
      if (event[$event.keyCode]) {
        event[$event.keyCode]();
      }
    }));
  }

  private stopEvent($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  private getElementTarget() {
    return this.inputElement ? this.inputElement : this.cdkVirtualScroll.elementRef.nativeElement;
  }

  private initializeListBox() {
    this.setSelected(this.listItems.toArray()[0]);
    this.setItemsByRowSet();
    this.setItemsByScroll();
    this.setContainer();
  }

  private setScrollTop() {
    this.scrollTop = this.cdkVirtualScroll.elementRef.nativeElement.scrollTop;
  }

  setSelected( item: TlItemSelectedDirective ) {
    this.listKeyManager.setActiveItem( item );
    this.setInputFocus();
  }

  onClickItem(item: any) {
    this.clickItem.emit(item);
  }

  private setItemsByRowSet() {
    this.itemsByRowSet = Math.floor(this.cdkVirtualScroll.elementRef.nativeElement.offsetHeight / this.rowHeight);
  }

  private setItemsByScroll() {
    this.itemsByScroll = Math.floor(this.cdkVirtualScroll.elementRef.nativeElement.scrollTop / this.rowHeight);
  }

  private setContainer() {
    this.container = this.cdkVirtualScroll.elementRef.nativeElement;
  }

  private setScrollVirtual() {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop = 0;
  }

  private setUpData(value?) {
    this.dataSource = new DataSourceList( {
      dataSource: value || this.data,
      pageSize: this.rowsPage,
      totalLength: this.totalLength,
      lazyMode: this.lazyMode
    } );
    this.nothingToShow = false;
    this.dataSource.dataStream.next( value || this.data );
  }

  onScroll() {
    if (!this.scrollingByArrows) {
      clearTimeout(this.isScrolling);
      this.isScrolling = setTimeout(() => {
        this.setItemsByScroll();
        this.setScrollTop();
        this.isScrollDown() ? this.setScrollBottomItem() : this.setScrollTopItem();
        this.setLastScrollTop();
      }, 66);
    }
  }

  onFilter( $event ) {
    if ($event) {
      this.setScrollVirtual();
      this.setUpData( $event );
      this.nothingToShow = false;
      return;
    }
    this.dataSource.dataStream.next( [] );
    this.nothingToShow = true;
  }

  onWheel() {
    this.scrollingByArrows = false;
  }

  private getItemByIndex(index: number) {
    return this.listItems.filter((item) => item.indexSelected === index)[0];
  }

  private setScrollTopItem() {
    this.setSelected(this.getItemByIndex(this.itemsByScroll));
  }

  private setLastScrollTop() {
    this.lastScrollTop = this.scrollTop;
  }

  private setScrollBottomItem() {
    const index = Math.round(this.itemsByRowSet + this.itemsByScroll) - 1;
    this.setSelected(this.getItemByIndex(index));
  }

  private setInputFocus() {
    this.inputElement ? this.inputElement.focus() : this.cdkVirtualScroll.elementRef.nativeElement.focus();
  }

  private setActiveItem() {
    this.activeItem = this.listKeyManager.activeItem as TlItemSelectedDirective;
  }

  handleKeyArrowUp( $event ) {
    this.stopEvent($event);
    this.scrollingByArrows = true;
    this.listKeyManager.onKeydown( $event );
    this.setActiveItem();
    if ( !isVisibleInList( this.activeItem.element.nativeElement, this.container, this.rowHeight ) ) {
      this.decreaseScrollValue(this.rowHeight);
    }
    if ( this.isIndexSelectedEqualFirst() && this.isScrollTopGreaterThanZero()) {
      this.resetScrollValue();
    }
  }

  handleKeyArrowDown( $event ) {
    this.stopEvent($event);
    this.scrollingByArrows = true;
    if ( this.isIndexSelectedEqualLastItem() ) {
      return;
    }
    this.listKeyManager.onKeydown( $event );
    this.setActiveItem();
    if ( !isVisibleInList( this.activeItem.element.nativeElement, this.container, this.rowHeight ) ) {
      this.patchScrollValue(this.rowHeight);
    }
  }

  private resetScrollValue() {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop = 0;
  }

  private decreaseScrollValue( value: number ) {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop -= value;
  }

  private patchScrollValue( value: number ) {
    this.cdkVirtualScroll.elementRef.nativeElement.scrollTop += value;
  }

  private isScrollTopGreaterThanZero() {
    return this.cdkVirtualScroll.elementRef.nativeElement.scrollTop > 0;
  }

  private isIndexSelectedEqualFirst() {
    return this.activeItem.indexSelected === 0;
  }

  private isIndexSelectedEqualLastItem() {
    return this.listKeyManager.activeItem['indexSelected'] === this.dataSource.getCachedData().length - 1;
  }

  private isScrollDown() {
    return this.scrollTop > this.lastScrollTop;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
