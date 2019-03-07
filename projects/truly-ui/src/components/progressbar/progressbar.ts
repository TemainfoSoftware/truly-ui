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
  Component, OnInit, Input, SimpleChanges, OnChanges,
} from '@angular/core';

@Component( {
  selector: 'tl-progressbar',
  templateUrl: './progressbar.html',
  styleUrls: [ './progressbar.scss' ],
} )
export class TlProgressBar implements OnInit, OnChanges {

  @Input() min = 0;

  @Input() max = 100;

  @Input() position = 0;

  @Input() unit = '';

  @Input() height = '15px';

  @Input() shape: 'default' | 'rounded' = 'rounded';

  @Input() progressInfo: 'none' | 'percentage' | 'detailed' = 'percentage';

  @Input() mode: 'determinate' | 'indeterminate' = 'determinate';

  @Input() color: 'basic' | 'primary' | 'success' | 'danger' | 'warning' | 'information' = 'primary';

  constructor() {}

  ngOnInit() {}

  getProgressDescription() {
    return Math.round( ((this.position - this.min) / (this.max - this.min)) * 100 );
  }

  ngOnChanges( change: SimpleChanges ) {
    if ( change.progress ) {
      if (this.position < this.min) {
        this.position = this.min;
      }
      if ( (!change.progress.firstChange) && isNaN( change.progress.currentValue ) ) {
        this.position = 0;
      }
    }
  }

}

