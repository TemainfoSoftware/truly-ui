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
import { Component, Input, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component( {
  selector: 'tl-list-item',
  templateUrl: './list-item.html',
  styleUrls: [ './list-item.scss' ],
  exportAs: 'listItem'
} )
export class TlListItem implements Highlightable {

  @Input() item;

  @Input() disabled = false;

  @Input() grouped = true;

  @Input() height = '30px';

  @Input() template: TemplateRef<any>;

  public selected = false;

  @ViewChild('listElement', {static: true}) element: ElementRef;

  setActiveStyles(): void {
    this.selected = true;
  }

  setInactiveStyles(): void {
    this.selected = false;
  }

}
