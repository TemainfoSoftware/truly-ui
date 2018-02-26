/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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
import { Input, Directive, Renderer2 } from '@angular/core';

@Directive( {
  selector: '[relativeWindowPosition]'
} )
export class RelativeWindowPosition {

  @Input() anchorElement;

  @Input() relativeElement;

  private renderer: Renderer2;

  constructor() {}

  setRenderer( renderer ) {
    this.renderer = renderer;
  }

  setPosition() {
    this.renderer.setStyle( this.relativeElement, 'position', 'fixed' );
    this.fitInWindowX() ? this.setRelativeElementToLeftAnchor() : this.setRelativeElementToRightAnchor();
  }

  private fitInWindowX() {
    const totalWidth = Math.round( this.anchorElement.getBoundingClientRect().left + this.anchorElement.offsetWidth );
    return (window.innerWidth - totalWidth) < this.relativeElement.offsetWidth;
  }

  private setRelativeElementToLeftAnchor() {
    this.renderer.setStyle( this.relativeElement, 'left',
      this.anchorElement.getBoundingClientRect().left - this.relativeElement.offsetWidth + 1 + 'px' );
  }

  private setRelativeElementToRightAnchor() {
    this.renderer.setStyle( this.relativeElement, 'left',
      this.anchorElement.getBoundingClientRect().left + this.anchorElement.offsetWidth - 1 + 'px' );
  }

}
