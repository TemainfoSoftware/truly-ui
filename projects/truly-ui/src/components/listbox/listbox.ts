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
  AfterViewInit, Component, Output, Input, QueryList, ViewChildren, ViewChild,
  TemplateRef, Renderer2, EventEmitter, OnDestroy, OnChanges, SimpleChanges, AfterContentInit
} from '@angular/core';
import {ActiveDescendantKeyManager} from '@angular/cdk/a11y';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ListBase} from './classes/list-base';
import {KeyEvent} from '../core/enums/key-events';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {DataSourceList} from '../core/classes/datasource-list';
import {TlInput} from '../input/input';
import {I18nService} from '../i18n/i18n.service';
import {TlItemSelectedDirective} from '../core/directives/itemSelected/item-selected.directive';
import {scrollIntoView} from '../core/helper/scrollIntoView';

@Component({
  selector: 'tl-listbox',
  templateUrl: './listbox.html',
  styleUrls: ['./listbox.scss'],
})
export class TlListBox extends ListBase implements AfterViewInit, OnDestroy, OnChanges {

  @Input('data')
  set data(value) {
    this._data = value;
    this.setUpData(value);
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

  @Input() loading = true;

  @Input() searchControl: FormControl;

  @Input() height = '200px';

  @Input() debounceTime = 200;

  @Input() searchBy = null;

  @Input() nothingFoundMessage = this.i18nService.getLocale().Listbox.notFoundText;

  @Input() totalLength = 100;

  @Input() rowsPage = 10;

  @Input() lazyMode = false;

  @Output() clickItem: EventEmitter<any> = new EventEmitter();

  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  @ViewChild(CdkVirtualScrollViewport, {static: true} ) cdkVirtualScroll: CdkVirtualScrollViewport;

  @ViewChildren(TlItemSelectedDirective) listItems: QueryList<TlItemSelectedDirective>;

  private subscription = new Subscription();

  private _data = [];

  private _inputElement;

  public dataSource: DataSourceList;

  public nothingFound = true;

  constructor(private renderer: Renderer2, private i18nService: I18nService) {
    super();
  }

  ngAfterViewInit() {
    this.listKeyManager = new ActiveDescendantKeyManager(this.listItems);
    this.listKeyManager.withTypeAhead();
    this.initializeListBox();
    this.handleListeners();
  }

  private handleListeners() {
    this.subscription.add(this.renderer.listen(this.getElementTarget(), 'keydown', ($event) => {
      const event = {
        [KeyEvent.ARROWDOWN]: () => this.handleKeyArrowDown($event),
        [KeyEvent.ARROWUP]: () => this.handleKeyArrowUp($event),
        [KeyEvent.ENTER]: () => this.onKeyEnter()
      };
      if (event[$event.keyCode]) {
        event[$event.keyCode]();
      }
    }));
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

  select(index: number) {
    this.listKeyManager.setActiveItem( index );
    if (this.listKeyManager.activeItem) {
      this.selectItem.emit((this.listKeyManager.activeItem as TlItemSelectedDirective).itemSelected);
    }
  }

  setSelected(item: TlItemSelectedDirective) {
    this.listKeyManager.setActiveItem(item);
    this.setInputFocus();
  }

  onKeyEnter() {
    this.selectItem.emit((this.listKeyManager.activeItem as TlItemSelectedDirective).itemSelected);
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
    if ( value && value.length > 0) {
      this.dataSource = new DataSourceList({
        dataSource: value || this.data,
        pageSize: this.rowsPage,
        totalLength: this.totalLength,
        lazyMode: this.lazyMode
      });
      this.loading = false;
      this.nothingFound = false;
      this.dataSource.dataStream.next(value || this.data);
    } else {
      this.loading = false;
      this.nothingFound = true;
      if (this.dataSource) {
        this.dataSource.dataStream.next([]);
      }
    }
  }

  getMessage() {
    if (this.nothingFound) {
      return this.nothingFoundMessage;
    }
    return null;
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

  onWheel() {
    this.scrollingByArrows = false;
  }

  onFilter($event) {
    if ($event) {
      this.setScrollVirtual();
      this.setUpData($event);
      return;
    }
    this.nothingFound = true;
    this.loading = false;
    this.dataSource.dataStream.next([]);
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
    if ( this.inputElement ) {
      this.inputElement.focus();
    }
  }

  private setActiveItem() {
    this.activeItem = this.listKeyManager.activeItem as TlItemSelectedDirective;
  }

  handleKeyArrowUp($event) {
    this.scrollingByArrows = true;
    this.listKeyManager.onKeydown($event);
    this.setActiveItem();
    scrollIntoView(this.activeItem.element.nativeElement);
  }

  handleKeyArrowDown($event) {
    this.scrollingByArrows = true;
    this.listKeyManager.onKeydown($event);
    this.setActiveItem();
    scrollIntoView(this.activeItem.element.nativeElement);
  }

  private isScrollDown() {
    return this.scrollTop > this.lastScrollTop;
  }

  ngOnChanges({loading}: SimpleChanges) {
    if (loading && loading['currentValue']) {
      this.loading = true;
      this.nothingFound = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
