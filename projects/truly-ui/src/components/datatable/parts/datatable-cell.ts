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

@Component( {
  selector: 'tl-datatable-cell',
  template: `
    <ng-container *ngIf="isTemplate; else textTemplate">
      <ng-container *ngTemplateOutlet="templateContent; context: {$implicit: data}"></ng-container>
    </ng-container>
    <ng-template #textTemplate>{{ templateContent }}</ng-template>
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
  `]
})
export class TlDatatableCell implements OnInit {

  @Input('tabIndex') tabIndex: string;

  @Input('align') align: string;

  @Input('content')
  set content( value: TemplateRef<any> | string ) {
    this.templateContent = value;
  }

  @Input('data') data;

  get content() {
    return this.templateContent;
  }

  @HostBinding('class.ui-cel') cellClass = true;

  @HostBinding('style.height') height = '0px';

  @HostBinding('style.text-align') get textAlign() {
    return this.align;
  }

  templateContent;

  constructor( ) {}

  ngOnInit() {}

  get isTemplate() {
    return this.templateContent instanceof TemplateRef;
  }

}
