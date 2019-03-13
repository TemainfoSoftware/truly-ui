/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import { Input, Directive, Renderer2, ElementRef } from '@angular/core';

@Directive( {
  selector: '[relativeWindowPosition]'
} )
export class RelativeWindowPosition {

  @Input() anchorElement;

  @Input() relativeElement;

  private renderer: Renderer2;

  private topDislocation = 0;

  constructor() {
  }

  setRenderer( renderer ) {
    this.renderer = renderer;
  }

  setAnchorElement( anchorElement: ElementRef ) {
    this.anchorElement = anchorElement;
  }

  setRelativeElement( relativeElement: ElementRef ) {
    this.relativeElement = relativeElement;
  }

  setPosition(topDislocation?: number) {
    this.topDislocation = topDislocation ? topDislocation : 0;
    this.fitInWindowX() ? this.setRelativeElementToRightAnchor() : this.setRelativeElementToLeftAnchor();
    this.fitInWindowY() ? this.setRelativeElementToTopAnchor() : this.setRelativeToBottomAnchor();
  }

  private setRelativeElementToTopAnchor() {
    this.renderer.setStyle( this.relativeElement, 'top',
     + this.anchorElement.offsetTop + 1 - this.topDislocation + 'px' );
  }

  private setRelativeToBottomAnchor() {
    this.renderer.setStyle( this.relativeElement, 'top',
      this.anchorElement.offsetTop - (this.relativeElement.offsetHeight) +
      this.anchorElement.offsetHeight - this.topDislocation + 'px' );
  }

  private setRelativeElementToRightAnchor() {
    this.renderer.setStyle( this.relativeElement, 'left',
      this.anchorElement.offsetLeft + this.anchorElement.offsetWidth + 1 + 'px' );
  }

  private setRelativeElementToLeftAnchor() {
    this.renderer.setStyle( this.relativeElement, 'left',
      this.anchorElement.offsetLeft - this.anchorElement.offsetWidth + 'px' );
  }

  private fitInWindowY() {
    const rest = Math.round( this.anchorElement.getBoundingClientRect().top + this.relativeElement.offsetHeight );
    return rest < window.innerHeight;
  }

  private fitInWindowX() {
    const rest = Math.round( this.anchorElement.getBoundingClientRect().right + this.relativeElement.offsetWidth );
    return rest < window.innerWidth;
  }

}
