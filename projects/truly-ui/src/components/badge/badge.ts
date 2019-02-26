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

import {Component, Input} from '@angular/core';

@Component({
  selector: 'tl-badge',
  templateUrl: './badge.html',
  styleUrls: ['./badge.scss'],
})
export class TlBadge {

  @Input() count: number;

  @Input() maxCount: number;

  @Input() onlyDot: boolean;

  @Input() color = 'basic';

  public value: number | string;

  public limit: number | string;

  overFlowCount(value: number, limit?: number): number | string {
    if (limit !== undefined) {
      if (value > limit) {
        this.value = limit + '+';
      } else {
        this.value = value;
      }
    } else {
      if (value > 99) {
        this.value = 99 + '+';
      } else {
        this.value = value;
      }
    }
    return this.value;
  }

}
