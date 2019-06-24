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
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'tl-icon',
  templateUrl: './icons.html',
  styleUrls: ['./icons.scss'],
})
export class TlIcons implements AfterViewInit {

  @Input() icon: string;

  @Input() lib: string;

  @Input() style: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() color: string;

  @Input() align: string;

  @ViewChild('content', {static: true} ) content: ElementRef<any>;

  @ViewChild(TemplateRef, {static: true} ) template: TemplateRef<any>;

  constructor(private change: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.contentIconCode();
  }

  contentIconCode() {
    if (this.content.nativeElement.innerText) {
      this.icon = this.content.nativeElement.innerText;

      if (this.isFullCode()) {
        this.lib = this.icon.substr(0, 2);
        this.lib = (this.lib === 'io') ? 'ion' : this.lib;

        this.getStyle();
      }
      this.change.detectChanges();
    }
  }

  isFullCode() {
    const space = this.icon.indexOf(' ');
    return space !== -1;
  }

  getStyle() {
    let fistSplit, secondSplit;

    if (this.lib === 'fa') {
      fistSplit = 0;
      secondSplit = this.icon.indexOf(' ');
    }

    if (this.lib === 'ion') {
      fistSplit = this.icon.indexOf('-') + 1;
      secondSplit = this.icon.indexOf('-', fistSplit) - fistSplit;
    }

    this.setStyle(fistSplit, secondSplit);
  }

  setStyle(start, length) {
    this.style = this.icon.substr(start, length);

    switch (this.lib) {
      case 'dx':
        this.setIcon(16);
        break;
      case 'fa':
        const fistSplit = this.icon.indexOf('-') + 1;
        this.setIcon(fistSplit);
        break;
      case 'ion':
        this.setIcon((start + length) + 1);
        break;
    }
  }

  setIcon(start: number) {
    this.icon = this.icon.substr(start);
  }

}
