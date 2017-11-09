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

import { Component, DoCheck, Input, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../modal.service';
import { ToneColorGenerator } from '../../core/helper/tonecolor-generator';
import { animate, style, transition, trigger } from '@angular/animations';

 @Component({
     selector: 'tl-container-modal',
     templateUrl: './container-modal.html',
     styleUrls: ['./container-modal.scss'],
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
 })
 export class TlContainerModal implements OnInit {

     @Input() containerColor = '#F2F2F2';

     @Input() height = '40px';

     @Input() boxColor = '#66cc99';

     @Input() modalBoxWidth = 150;

     @Input() arrowsColor = '#797979';

     @Input() limitStringBox = 12;

     @ViewChild('container') container;

     @ViewChild( 'wrapper' ) wrapper;

     public isScrolling = false;

     private boxColorInactive = '#6da78d';

     private borderBoxColor = '#54a378';

     private differ;

     constructor( public modalService: ModalService, private colorService: ToneColorGenerator, differs: KeyValueDiffers ) {
       //  this.differ = differs.find( {} ).create( null );
     }

     ngOnInit() {
       this.boxColorInactive = this.colorService.calculate(this.boxColor, -0.12);
       this.borderBoxColor = this.colorService.calculate(this.boxColor, -0.2);
     }

     showWindow(item, i) {
         this.modalService.activeModal = item;
         this.modalService.showModal( item, i );
     }

     validateScroll() {
         setTimeout( () => {
             this.wrapper.nativeElement.offsetWidth >= this.container.nativeElement.offsetWidth ?
                 this.isScrolling = true : this.isScrolling = false;
         }, 1 );
     }

     handleArrowRight() {
         if (  this.container.nativeElement.scrollLeft < this.wrapper.nativeElement.offsetWidth ) {
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

     // ngDoCheck() {
     //     const changes = this.differ.diff( this.modalService.forms );
     //     if ( changes ) {
     //         this.validateScroll();
     //     }
     // }

}
