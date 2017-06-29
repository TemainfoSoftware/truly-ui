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
import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, ComponentRef, HostBinding, } from '@angular/core';
import { ModalService } from './modal.service';
import { trigger, style, animate, transition } from '@angular/animations';

let globalZindex = 0;

@Component({
    selector: 'tl-modal',
    templateUrl: './modal.html',
    styleUrls: [ './modal.scss' ],
    animations: [
        trigger(
            'enterAnimation', [
                transition( ':enter', [
                    style( { opacity: 0 } ),
                    animate( '200ms', style( { opacity: 1 } ) )
                ] ),
                transition( ':leave', [
                    style( { opacity: 1 } ),
                    animate( '200ms', style( { opacity: 0 } ) )
                ] )
            ]
        )
    ]
})
export class TlModal implements OnInit {

    @Input() label = '';

    @Input() status = '';

    @Input() index;

    @ViewChild( 'modal' ) modal: ElementRef;

    @HostBinding( '@enterAnimation' ) public animation;

    public componentRef: ComponentRef<TlModal>;

    public ZIndex = 0;

    private serviceControl: ModalService;

    private initOffsetLeft;

    private maximized: boolean;

    private initOffsetTop;

    private mousePressX;

    private mousePressY;

    private clientX;

    private clientY;

    private moving = false;

    private offsetLeftContent;
    private offsetTopContent;


    private offsetLeftModal;
    private offsetTopModal;

    constructor( private element: ElementRef, private renderer: Renderer2 ) {
    }

    ngOnInit() {
        this.setZIndex();
        const outlet = document.getElementById( 'content' );
        this.offsetLeftContent = outlet.offsetLeft;
        this.offsetTopContent = outlet.offsetTop;

        this.renderer.listen( window, 'resize', ( event ) => {
            this.maximizeModal();
        } );

        this.renderer.listen( window, 'mousemove', ( event ) => {
            if ( this.moving ) {
                this.clientX = event.clientX;
                this.clientY = event.clientY;
                this.offsetLeftModal = this.modal.nativeElement.offsetLeft;
                this.offsetTopModal = this.modal.nativeElement.offsetTop;
                this.setPosition();
            }
        } );


        this.renderer.listen(window, 'mouseup', (event) => {
            this.moving = false;
            if ( this.offsetLeftModal < this.offsetLeftContent ) {
                this.modal.nativeElement.style.left = this.offsetLeftContent + 'px';
            }
            if (this.offsetTopModal < this.offsetTopContent) {
                this.modal.nativeElement.style.top = this.offsetTopContent + 'px';
            }
        });


    }

    mouseDown( $event ) {
        if ( !this.maximized ) {
            this.initOffsetLeft = $event.target.offsetParent.offsetLeft;
            this.initOffsetTop = $event.target.offsetParent.offsetTop;
            this.mousePressX = $event.clientX;
            this.mousePressY = $event.clientY;
            this.moving = true;
        }
    }

    setComponentRef( component: ComponentRef<TlModal> ) {
        this.componentRef = component;
    }

    setPosition() {
        this.modal.nativeElement.style.opacity = 1;
        this.modal.nativeElement.style.left = this.initOffsetLeft + this.clientX - this.mousePressX + 'px';
        this.modal.nativeElement.style.top = this.initOffsetTop + this.clientY - this.mousePressY + 'px';
        this.modal.nativeElement.style.width = '500px';
        this.modal.nativeElement.style.height = '500px';
        this.modal.nativeElement.style.cursor = 'pointer';
    }

    setServiceControl( service ) {
        this.serviceControl = service;
    }

    minimizeModal() {
        this.serviceControl.minimize( this.componentRef );
    }

    closeModal() {
        this.serviceControl.close( this.componentRef );
    }

    maximizeModal() {
        if ( !this.maximized ) {
            this.modal.nativeElement.style.left = this.getBoundingParentElement().left + 'px';
            this.modal.nativeElement.style.top = this.getBoundingParentElement().top + 'px';
            this.modal.nativeElement.style.width = this.getBoundingParentElement().width + 'px';
            this.modal.nativeElement.style.height = this.getBoundingParentElement().height + 20 + 'px';
            this.maximized = true;
            this.moving = false;
        } else {
            this.restoreMaximize();
        }
    }

    restoreMaximize() {
        this.maximized = false;
        this.setPosition();
    }

    getBoundingParentElement() {
        return this.element.nativeElement.parentElement.getBoundingClientRect();
    }

    setZIndex() {
        this.serviceControl.setZIndex( this.getZIndex() );
    }

    getZIndex() {
        this.ZIndex = globalZindex++;
        return this.ZIndex;
    }

}

