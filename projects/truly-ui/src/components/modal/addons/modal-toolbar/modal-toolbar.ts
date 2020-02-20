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

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {Subscription} from 'rxjs';

@Component( {
  selector: 'tl-modal-toolbar',
  templateUrl: './modal-toolbar.html',
  styleUrls: [ './modal-toolbar.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TlModalToolbar implements OnInit, OnDestroy {

  @Input() containerColor = '';

  @Input() height = '30px';

  @Input() color = 'basic';

  @Input() modalBoxWidth = 150;

  @Input() limitStringBox = 12;

  @ViewChild( 'container', {static: true} ) container;

  @ViewChild( 'wrapper', {static: true} ) wrapper;

  public isScrolling = false;

  public activeModal: ComponentRef<any>;

  private subscription = new Subscription();

  constructor( public modalService: ModalService, private changes: ChangeDetectorRef ) {}

  ngOnInit() {
    this.subscribeFrontModal();
    this.subscribeChanges();
  }

  subscribeFrontModal() {
    this.subscription.add( this.modalService.frontModal.subscribe( ( value: any ) => {
      this.activeModal = value.activeModal;
      this.changes.detectChanges();
    } ) );
  }

  subscribeChanges() {
    this.subscription.add( this.modalService.changeModal.subscribe( () => {
      this.validateScroll();
      this.changes.detectChanges();
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
    this.isScrolling = scrollLeft >= this.wrapper.nativeElement.offsetWidth;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
