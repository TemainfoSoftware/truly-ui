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
  Input, Component, Output, EventEmitter,
  ElementRef
} from '@angular/core';


@Component( {
    selector: 'tl-backdrop',
    templateUrl: './backdrop.html',
    styleUrls: [ './backdrop.scss' ],
} )
export class TlBackdrop {

    @Input() position = { zIndex: 0 };

    @Input() width = '100%';

    @Input() height = '100%';

    @Output() click = new EventEmitter();

    public hidden = false;

    constructor( public backdrop: ElementRef) {}

    setBackdropOptions(object) {
      this.width = object.width;
      this.height = object.height;
      this.position.zIndex = object.zIndex;
    }

    hideBackdrop() {
      this.hidden = true;
    }

    showBackdrop() {
      this.hidden = false;
    }

    clickBackdrop($event) {
      this.click.emit($event);
    }

}
