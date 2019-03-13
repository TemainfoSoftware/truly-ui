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
import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive( {
  selector: '[fixedPosition]'
} )
export class FixedPositionDirective implements AfterViewInit {

  @Input() positionY = 'above';

  @Input() positionX = 'after';

  @Input() overlapTrigger = false;

  @Input() target;

  constructor( private renderer: Renderer2, private hostElement: ElementRef ) {}

  ngAfterViewInit() {
    this.listenScroll();
  }

  setPositioning() {
    if ( this.target && this.hostElement ) {
      this.validateTypeTarget();
      this.renderer.setStyle( this.hostElement.nativeElement, 'position', 'fixed' );
      this.setLeftPosition();
      this.setPositionY();
      this.setPositionX();
    }
  }

  private listenScroll() {
    this.renderer.listen(window, 'scroll', () => {
      this.setPositioning();
    });
  }

  private validateTypeTarget() {
    if ( this.target.localName === 'tl-button' ) {
      this.target = this.target.firstElementChild;
    }
  }

  private setLeftPosition() {
    this.renderer.setStyle( this.hostElement.nativeElement, 'left',
      this.target.getBoundingClientRect().left + 'px' );
  }

  private setPositionY() {
    switch ( this.positionY ) {
      case 'bellow' :
        this.setBellowPosition();
        break;
      case 'above':
        this.setAbovePosition();
        break;
    }
  }

  private setPositionX() {
    switch ( this.positionX ) {
      case 'after' :
        this.setAfterPosition();
        break;
      case 'before':
        this.setBeforePosition();
        break;
    }
  }

  private setBeforePosition() {
    this.renderer.setStyle( this.hostElement.nativeElement, 'left',
      this.target.getBoundingClientRect().left + 'px' );
  }

  private setAfterPosition() {
    this.renderer.setStyle( this.hostElement.nativeElement, 'left',
      this.target.getBoundingClientRect().right - this.hostElement.nativeElement.offsetWidth + 'px' );
  }

  private setAbovePosition() {
    const calcPos = this.target.getBoundingClientRect().top - this.hostElement.nativeElement.offsetHeight;
    const calcOverlap = !this.overlapTrigger ? calcPos : calcPos + this.target.offsetHeight;
    this.renderer.setStyle( this.hostElement.nativeElement, 'top', calcOverlap + 'px' );
  }

  private setBellowPosition() {
    const calcPos = this.target.getBoundingClientRect().top;
    const calcOverlap = !this.overlapTrigger ? calcPos + this.target.offsetHeight : calcPos;
    this.renderer.setStyle( this.hostElement.nativeElement, 'top', calcOverlap + 'px' );
  }

}

