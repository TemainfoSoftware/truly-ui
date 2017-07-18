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
import { Component, ComponentRef, ElementRef, EventEmitter, HostBinding,
    Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ModalService } from './modal.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ModalResult } from '../core/enums/modal-result';
import { ModalOptions } from './modal-options';

let globalZindex = 1;

@Component({
    selector: 'tl-modal',
    templateUrl: './modal.html',
    styleUrls: [ './modal.scss' ],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger(
            'enterAnimation', [
                state('enter', style({ transform: 'none', opacity: 1 })),
                state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
                state('exit', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
                transition('* => *', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
            ]
        )
    ]
})
export class TlModal implements OnInit, ModalOptions, OnDestroy {

    @Input() status = '';

    @Input() index;

    @Input() draggable = true;

    @Input() minimizable = true;

    @Input() maximizable = true;

    @Input() icon = '';

    @Input() title = 'My Modal';

    @Input() color = '#53C68C';

    @Input() height = '500px';

    @Input() width = '500px';

    @Input() fullscreen = false;

    @ViewChild( 'modal' ) modal: ElementRef;

    @ViewChild('body', {read: ViewContainerRef}) body;

    @HostBinding( '@enterAnimation' ) public animation;

    @Output() show: EventEmitter<any> = new EventEmitter();

    @Output() hide: EventEmitter<any> = new EventEmitter();

    @Output() maximize: EventEmitter<any> = new EventEmitter();

    public componentRef: ComponentRef<TlModal>;

    public ZIndex = 1;

    public modalResult;

    private serviceControl: ModalService;

    private maximized: boolean;

    private mousePressX;

    private mousePressY;

    private positionMouseMoveX;

    private positionMouseMoveY;

    private moving = false;

    private offsetLeftContent;

    private offsetTopContent;

    private offsetLeftModal;

    private offsetTopModal;

    private parent;

    private modalLeft;

    private modalTop;

    private positionX;

    private positionY;

    constructor( private element: ElementRef, private renderer: Renderer2 ) {}

    ngOnInit() {
        this.setZIndex();
        this.getBoundingContent();
        this.setModalCenterParent();
        this.resizeListener();
        this.mousemoveListener();
        this.mouseupListener();
        this.setDefaultDimensions();
        if (this.fullscreen) {
            this.maximizeModal();
        }
    }

    resizeListener() {
        this.renderer.listen( window, 'resize', () => {
            this.maximizeModal();
        } );
    }

    mousemoveListener() {
        this.renderer.listen( window, 'mousemove', ( event ) => {
            event.preventDefault();
            if ( !( this.moving && this.draggable) ) {
                return;
            }
            if ( this.isMouseOutOfTheWindowRight( event ) ) {
                this.setOffsetLeftModal( window.innerWidth - this.modal.nativeElement.offsetWidth );
                this.setMousePressX( window.innerWidth );
            }
            if ( this.isMouseOutOfTheWindowLeft( event ) ) {
                this.setOffsetLeftModal( this.getBoundingParentElement().left );
                this.setMousePressX( this.getBoundingParentElement().left );
            }
            this.positionMouseMoveX = event.clientX;
            this.positionMouseMoveY = event.clientY;
            this.setPosition();

        } );
    }

    mouseupListener() {
        this.renderer.listen( window, 'mouseup', () => {
            this.moving = false;
        } );
    }

    mouseDown( $event ) {
        if ( !this.maximized ) {
            this.setOffsetLeftModal( this.modal.nativeElement.offsetLeft );
            this.setOffsetTopModal( this.modal.nativeElement.offsetTop );
            this.setMousePressX( $event.clientX );
            this.setMousePressY( $event.clientY );
            this.moving = true;
        }
    }

    getModalPosition() {
        this.modalLeft = this.modal.nativeElement.offsetLeft;
        this.modalTop = this.modal.nativeElement.offsetTop;
    }

    setModalCenterParent() {
        this.modal.nativeElement.style.left = this.parent.offsetWidth / 2 + 'px';
        this.modal.nativeElement.style.top = window.innerHeight -
            this.modal.nativeElement.offsetHeight + 'px';
    }

    setComponentRef( component: ComponentRef<TlModal> ) {
        this.componentRef = component;
    }


    setMousePressX( position ) {
        this.mousePressX = position;
    }

    setMousePressY( position ) {
        this.mousePressY = position;
    }

    setPosition() {
        this.setLeftPosition();
        this.setTopPosition();
        this.setDefaultDimensions();
    }

    setLeftPosition() {
        if ( this.isOutOfWindowX() ) {
            return this.setLeftLimitOfArea();
        }

        if ( this.isOutOfWindowOnLeft() ) {
            return this.setContentLeftPosition();
        }

        this.setNewLeftPosition();
    }

    setTopPosition() {
        if ( this.isOutOfWindowY() ) {
            return this.setTopLimitOfArea();
        }

        if ( this.isOutOfWindowOnTop() ) {
            return this.setContentTopPositon();
        }

        this.setNewTopPosition();
    }

    setOverlay() {
        const app = document.getElementsByTagName('app-root');
        const overlay = document.createElement('div');
        overlay.setAttribute('class', 'overlay-modal');
        app[0].appendChild(overlay);
    }

    setOptions( options: Array<ModalOptions> ) {
        const self = this;
        Object.keys( options ).forEach(function (key) {
            self[ key ] = options[ key ];
        } );
    }

    setLeftLimitOfArea() {
        return this.modal.nativeElement.style.left = window.innerWidth - this.modal.nativeElement.offsetWidth + 'px';
    }

    setTopLimitOfArea() {
        return this.modal.nativeElement.style.top = window.innerHeight - this.modal.nativeElement.offsetHeight + 'px';
    }

    setOffsetLeftModal( offset ) {
        this.offsetLeftModal = offset;
    }

    setOffsetTopModal( offset ) {
        this.offsetTopModal = offset;
    }

    setContentTopPositon() {
        this.modal.nativeElement.style.top = this.offsetTopContent + 'px';
    }

    setContentLeftPosition() {
        this.modal.nativeElement.style.left = this.offsetLeftContent + 'px';
    }

    setNewTopPosition() {
        this.modal.nativeElement.style.top = this.offsetTopModal + this.positionMouseMoveY - this.mousePressY + 'px';
    }

    setNewLeftPosition() {
        this.modal.nativeElement.style.left = this.offsetLeftModal + this.positionMouseMoveX - this.mousePressX + 'px'
    }

    setServiceControl( service ) {
        this.serviceControl = service;
    }

    setDefaultDimensions() {
        if ( this.height && this.width ) {
            this.modal.nativeElement.style.height = this.height;
            this.modal.nativeElement.style.width = this.width;
        } else {
            this.modal.nativeElement.style.height = '500px';
            this.modal.nativeElement.style.width = '500px';
        }
    }

    setCurrentPosition() {
        this.modal.nativeElement.style.left = this.modalLeft + 'px';
        this.modal.nativeElement.style.top = this.modalTop + 'px';
    }

    isMouseOutOfTheWindowLeft( event ) {
        return event.clientX < this.offsetLeftContent
    }

    setZIndex() {
        this.serviceControl.setZIndex( this.modal, this.getZIndex() );
    }

    isMouseOutOfTheWindowRight( event ) {
        return event.clientX >= window.innerWidth - 1;
    }

    isOutOfWindowOnLeft() {
        return this.positionX < this.offsetLeftContent;
    }

    isOutOfWindowOnTop() {
        return this.positionY < this.offsetTopContent;
    }

    isOutOfWindowX() {
        this.positionX = this.offsetLeftModal + this.positionMouseMoveX - this.mousePressX;
        return this.positionX >= (window.innerWidth - this.modal.nativeElement.offsetWidth);
    }

    isOutOfWindowY() {
        this.positionY = this.offsetTopModal + this.positionMouseMoveY - this.mousePressY;
        return this.positionY >= (window.innerHeight - this.modal.nativeElement.offsetHeight);
    }

    minimizeModal() {
        if ( !(this.minimizable) ) {
            return;
        }
     this.serviceControl.minimize( this.componentRef );
     this.hide.emit();
    }

    closeModal() {
        this.serviceControl.execCallBack( ModalResult.MRCLOSE, this.componentRef );
        this.hide.emit();
    }

    maximizeModal() {
        if ( !(this.maximizable) ) {
            return;
        }
        if ( !this.maximized ) {
            this.getModalPosition();
            this.modal.nativeElement.style.left = this.getBoundingParentElement().left + 'px';
            this.modal.nativeElement.style.top = this.getBoundingParentElement().top + 'px';
            this.modal.nativeElement.style.width = this.getBoundingParentElement().width + 'px';
            this.modal.nativeElement.style.height = this.getBoundingParentElement().height + 20 + 'px';
            this.maximized = true;
            this.moving = false;
            this.maximize.emit();
        } else {
            this.restoreMaximize();
        }
    }

    restoreMaximize() {
        this.setDefaultDimensions();
        this.setCurrentPosition();
        this.maximized = false;
    }

    getBoundingParentElement() {
        return this.element.nativeElement.parentElement.getBoundingClientRect();
    }

    getBoundingContent() {
        this.parent = this.componentRef.instance.element.nativeElement.parentElement;
        this.offsetLeftContent = this.parent.offsetLeft;
        this.offsetTopContent = this.parent.offsetTop;
    }

    getZIndex() {
        this.ZIndex = globalZindex++;
        return this.ZIndex;
    }

    ngOnDestroy() {

    }

}

