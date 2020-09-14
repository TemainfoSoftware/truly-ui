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
  Component,
  Input,
  OnInit,
  Injector,
  ContentChild,
  TemplateRef,
  ViewChild,
  ViewContainerRef, HostBinding, HostListener, ElementRef
} from '@angular/core';
import { FilterOptionsService } from '../../services/datatable-filter-options.service';
import {FocusableOption, Highlightable} from '@angular/cdk/a11y';

@Component( {
  selector: 'tl-datatable-row',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;

        font-size: 1em;
        height: 23px;
        outline: none;
        margin: 0;
        content: none;
    }
  `],
  exportAs: 'rowItem'
} )
export class TlDatatableRow implements OnInit, Highlightable {

  public selected = false;

  @Input() content;

  @Input('row') row;

  @Input('index') index;

  @HostBinding( 'class.selected') get isSelected() {
    return this.selected;
  }

  constructor(public element: ElementRef) {}

  ngOnInit() {}

  setActiveStyles(): void {
    this.selected = true;
  }

  setInactiveStyles(): void {
    this.selected = false;
  }

}
