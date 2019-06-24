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
import { AfterViewInit, Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';

const allSubs = [];
let highestWidth = 0;

@Component( {
  selector: 'tl-popupmenu-item',
  templateUrl: './popupmenu-item.html',
  styleUrls: [ './popupmenu-item.scss' ],
} )
export class TlPopupMenuItem implements AfterViewInit, OnDestroy {

  public icon = '';

  public label = '';

  public subItem = '';

  public callBack = Function();

  public styleConfig = { position: '', left: 0, top: 0 };

  @ViewChild( 'wrapperItem', {static: true} ) wrapperItem;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {}

  fitWidth() {
    setTimeout(() => {
      allSubs.push(this.wrapperItem);
      if (this.wrapperItem.nativeElement.offsetWidth > highestWidth) {
        highestWidth = this.wrapperItem.nativeElement.offsetWidth;
      }
      this.setMaxWidth();
    }, 10);

  }

  setBorders( index, lastIndex ) {
    if (index === 0) {
      this.renderer.addClass(this.wrapperItem.nativeElement, 'borderTop');
      return;
    }
    if (index === lastIndex) {
      this.renderer.addClass(this.wrapperItem.nativeElement, 'borderBottom');
    }
  }

  dispatchCallback(MouseEvent: MouseEvent) {
    if (this.callBack) {
      this.callBack(MouseEvent);
    }
  }

  setMaxWidth() {
    allSubs.forEach((item) => {
      item.nativeElement.style.width = highestWidth + 'px';
    });
  }

  ngOnDestroy() {
    allSubs.splice(allSubs.indexOf(this.wrapperItem.nativeElement), 1);
  }

}
