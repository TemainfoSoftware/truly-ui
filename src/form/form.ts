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
import {
    AfterViewInit, Component, Input, Renderer2, ViewChild,
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';


@Component( {
    selector: 'tl-form',
    templateUrl: '../form/form.html',
    styleUrls: ['../form/form.scss']
} )
export class TlForm implements AfterViewInit {

    @Input() lastElement;
    @Input() initialFocus;

    @ViewChild( 'buttonOk' ) buttonOk;
    @ViewChild( 'buttonCancel' ) buttonCancel;

    private listenFocusOut;
    private listenDown;
    private listenEnter;

    constructor( private renderer: Renderer2 ) {

    }

    ngAfterViewInit() {
        if ( this.initialFocus ) {
            this.initialFocus.element.nativeElement.focus();
        }
    }

    handleKeysForm( $event ) {
        this.returnListen();
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWUP :
                this.backTabIndex();
                break;
            case KeyEvent.ARROWDOWN :
                break;
            case KeyEvent.ENTER :
                break;
        }
    }

    returnListen() {
        if ( document.activeElement === this.lastElement.element.nativeElement ) {
            this.listenFocusOut = this.renderer.listen( this.lastElement.element.nativeElement, 'focusout', () => {
                this.buttonOk.buttonBox.nativeElement.focus();
            } );
        }
    }


    backTabIndex() {
        this.listenFocusOut();
        if ( this.getActiveElement() === this.buttonOk.buttonBox.nativeElement ) {
            this.lastElement.element.nativeElement.focus();
        }
    }


    getActiveElement() {
        return document.activeElement;
    }

}
