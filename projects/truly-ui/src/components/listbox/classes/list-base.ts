/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { TlItemSelectedDirective } from '../../core/directives/itemSelected/item-selected.directive';

export class ListBase {
  private _scrollTop = 0;

  set scrollTop( value: number ) {
    this._scrollTop = value;
  }

  get scrollTop() {
    return this._scrollTop;
  }

  private _itemsByRowSet = 0;

  set itemsByRowSet( value: number ) {
    this._itemsByRowSet = value;
  }

  get itemsByRowSet() {
    return this._itemsByRowSet;
  }

  private _itemsByScroll = 0;

  set itemsByScroll( value: number ) {
    this._itemsByScroll = value;
  }

  get itemsByScroll() {
    return this._itemsByScroll;
  }

  private _scrollingByArrows = false;

  set scrollingByArrows( value: boolean ) {
    this._scrollingByArrows = value;
  }

  get scrollingByArrows() {
    return this._scrollingByArrows;
  }

  private _lastScrollTop = 0;

  set lastScrollTop( value: number ) {
    this._lastScrollTop = value;
  }

  get lastScrollTop() {
    return this._lastScrollTop;
  }

  private _container: HTMLElement;

  set container( value: HTMLElement ) {
    this._container = value;
  }

  get container() {
    return this._container;
  }

  private _activeItem: TlItemSelectedDirective;

  set activeItem( value: TlItemSelectedDirective ) {
    this._activeItem = value;
  }

  get activeItem() {
    return this._activeItem;
  }

  private _listKeyManager: ActiveDescendantKeyManager<TlItemSelectedDirective>;

  set listKeyManager( value: ActiveDescendantKeyManager<TlItemSelectedDirective> ) {
    this._listKeyManager = value;
  }

  get listKeyManager() {
    return this._listKeyManager;
  }

  private _isScrolling = null;

  set isScrolling(value: any ) {
    this._isScrolling = value;
  }

  get isScrolling() {
    return this._isScrolling;
  }

  constructor() {
  }

}
