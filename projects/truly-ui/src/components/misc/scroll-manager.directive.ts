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
import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';

@Directive( {
  selector: '[scrollManager]'
} )
export class ScrollManager implements OnInit, AfterViewInit {

  @Input() elementController: HTMLElement;

  @Input() listItemHeight: string;

  private cursorIndex = 1;

  private numberItemsContainer: number;

  private currentScroll = 0;

  constructor( private renderer: Renderer2, private scrollContainer: ElementRef ) {
  }

  ngOnInit() {
    this.listenController();
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.numberItemsContainer =
        Math.floor( this.scrollContainer.nativeElement.offsetHeight / parseInt( this.listItemHeight, 10 ) );
    } );
  }

  listenController() {
    if ( this.elementController ) {
      this.renderer.listen( this.elementController, 'keydown', ( $event ) => {
        if ( this.isArrowUp( $event ) ) {
          this.onArrowUp();
        } else if ( this.isArrowDown( $event ) ) {
          this.onArrowDown();
        }
      } );
    }
  }

  isArrowUp( $event ) {
    return $event.keyCode === KeyEvent.ARROWUP;
  }

  isArrowDown( $event ) {
    return $event.keyCode === KeyEvent.ARROWDOWN;
  }

  onArrowUp() {
    if ( this.cursorIndex === 1 && this.currentScroll === 0 ) {
      this.cursorIndex = this.numberItemsContainer;
      return this.setScrollTop( 10000 );
    }

    if ( this.cursorIndex > 1 ) {
      this.cursorIndex--;
    } else {
      this.setScrollTop( this.currentScroll - parseInt( this.listItemHeight, 10 ) );
    }
  }

  setScrollTop( value: number ) {
    this.scrollContainer.nativeElement.scrollTop = value;
    this.currentScroll = this.scrollContainer.nativeElement.scrollTop;
  }

  onArrowDown() {
    if ( (this.getContainerHeight() + this.getScrollTop()) >= this.getScrollHeight() ) {
      this.cursorIndex = 1;
      return this.setScrollTop( 0 );
    }

    if ( this.cursorIndex < this.numberItemsContainer ) {
      this.cursorIndex++;
    } else {
      this.setScrollTop( this.currentScroll + parseInt( this.listItemHeight, 10 ) );
    }
  }

  getContainerHeight() {
    return this.scrollContainer.nativeElement.offsetHeight;
  }

  getScrollHeight() {
    return this.scrollContainer.nativeElement.scrollHeight;
  }

  getScrollTop() {
    return this.scrollContainer.nativeElement.scrollTop;
  }

}
