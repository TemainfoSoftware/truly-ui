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
  ViewContainerRef, HostBinding, HostListener
} from '@angular/core';

import * as objectPath from 'object-path';
import { TlDatatableColumn } from './column/datatable-column';
import { DatePipe } from '@angular/common';
@Component( {
  selector: 'tl-datatable-cell',
  template: `
      <ng-container *ngIf="isTemplate; else textTemplate">
        <ng-container *ngTemplateOutlet="collumn.template; context: {$implicit: content}"></ng-container>
      </ng-container>
      <ng-template #textTemplate>{{ getDeepContent(content) }}</ng-template>
    `,
  styles: [`
    :host {
      display: table-cell;
      vertical-align: inherit;

      box-sizing: border-box;
      padding: 0 5px;
      overflow: hidden;
      white-space: nowrap;
      align-items: center;
    }
  `],
  providers: [
    DatePipe
  ]
})
export class TlDatatableCell implements OnInit {

  @Input('content') content: string | object;

  @Input('collumn') collumn: TlDatatableColumn;

  @HostBinding('class.ui-cel') cellClass = true;

  @HostBinding('style.height') height = '0px';

  @HostBinding('style.text-align') get textAlign() {
    return this.collumn.alignment;
  }

  constructor( private datePipe: DatePipe) {}

  ngOnInit() {}

  get isTemplate() {
    return this.collumn.template instanceof TemplateRef;
  }

  getDeepContent( fullContent ) {
      const content = objectPath.get(fullContent, this.collumn.field);

      switch ( this.collumn.type ) {
        case 'date' : {
          return this.datePipe.transform( content, this.collumn.format );
        }
        default : return content;
      }
  }
}
