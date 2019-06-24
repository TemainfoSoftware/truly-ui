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

import { ChangeDetectorRef, Component, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component( {
  selector: 'tl-modal-toolbar',
  templateUrl: './modal-toolbar.html',
  styleUrls: [ './modal-toolbar.scss' ],
  animations: [
    trigger(
      'onCreateElement', [
        transition( ':enter', [
          style( { opacity: 0 } ),
          animate( '100ms ease-in', style( { opacity: 1 } ) )
        ] ),
        transition( ':leave', [
          style( { opacity: 1 } ),
          animate( '100ms ease-out', style( { opacity: 0 } ) )
        ] )
      ]
    )
  ]
} )
export class TlModalToolbar implements OnInit {

  @Input() containerColor = '';

  @Input() height = '30px';

  @Input() color = 'basic';

  @Input() modalBoxWidth = 150;

  @Input() arrowsColor = '';

  @Input() limitStringBox = 12;

  @ViewChild( 'container', {static: true} ) container;

  @ViewChild( 'wrapper', {static: true} ) wrapper;

  public isScrolling = false;

  public activeModal: ComponentRef<any>;

  private subscription = new Subscription();

  constructor( public modalService: ModalService ) {}

  ngOnInit() {
    this.subscribeFrontModal();
    this.subscribeChanges();
  }

  subscribeFrontModal() {
    this.subscription.add( this.modalService.frontModal.subscribe( ( value: any ) => {
      this.activeModal = value.activeModal;
    } ) );
  }

  subscribeChanges() {
    this.subscription.add( this.modalService.changeModal.subscribe( () => {
      this.validateScroll();
    } ) );
  }

  showWindow( item: ComponentRef<any> ) {
    this.modalService.showModal( item );
  }

  validateScroll() {
    setTimeout( () => {
      this.wrapper.nativeElement.offsetWidth >= this.container.nativeElement.offsetWidth ?
        this.isScrolling = true : this.isScrolling = false;
    }, 1 );
  }

  handleArrowRight() {
    if ( this.container.nativeElement.scrollLeft < this.wrapper.nativeElement.offsetWidth ) {
      this.container.nativeElement.scrollLeft += 300;
    }
    this.handleScrollFinish();
  }

  handleArrowLeft() {
    if ( this.container.nativeElement.scrollLeft > 0 ) {
      this.container.nativeElement.scrollLeft -= 300;
    }
    this.handleScrollFinish();
  }

  handleScrollFinish() {
    const scrollLeft = this.container.nativeElement.scrollLeft + this.container.nativeElement.offsetWidth;
    scrollLeft >= this.wrapper.nativeElement.offsetWidth ? this.isScrolling = false : this.isScrolling = true;
  }

  getTextContainerItem( value ) {
    if ( value.length > this.limitStringBox ) {
      let subStr = '';
      const strArray = value.split( '' );
      strArray.forEach( ( value2, index, array ) => {
        if ( index <= this.limitStringBox ) {
          subStr += value2;
        }
      } );
      subStr += '...'.trim();
      return subStr;
    } else {
      return value;
    }
  }
}
