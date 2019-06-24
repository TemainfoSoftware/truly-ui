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
  AfterViewInit, Component, ElementRef, Input,
  ViewChild
} from '@angular/core';
import {FixedPositionDirective} from '../../misc/fixed-position.directive';

@Component({
  selector: 'tl-tab',
  templateUrl: './tab.html',
  styleUrls: [ './tab.scss' ]
})
export class TlTab implements AfterViewInit {

  @Input() title = 'New Tab';

  @Input() padding = true;

  @ViewChild( 'tabComponents', {static: true} ) tabComponents: ElementRef;

  public height = 'auto';

  public selected;

  public lastComponent;

  public background;

  public firstComponent;

  public trulyComponents = ['input'];

  constructor() {}

  ngAfterViewInit() {
    const components = this.tabComponents.nativeElement.querySelectorAll('*');
    const focusableComponents = [];
    for (let element = 0; element < components.length; element++) {
      if (this.trulyComponents.indexOf(components[element].localName) >= 0) {
        focusableComponents.push(components[element]);
      }
    }
    this.lastComponent = focusableComponents[focusableComponents.length - 1];
    this.firstComponent = focusableComponents[0];
  }

}
