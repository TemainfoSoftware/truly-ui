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
    AfterContentInit, Component, ElementRef, Input, ViewChild, Output, EventEmitter,
} from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { ModalResult } from '../core/enums/modal-result';

let uniqueIndex = 0;

@Component( {
    selector : 'tl-button',
    templateUrl : './button.html',
    styleUrls : [ './button.scss' ]
} )
export class TlButton implements AfterContentInit {

    @Input() type = 'button';

    @Input() text = '';

    @Input() iconAddonBefore = '';

    @Input() buttonAddonBeforeClass;

    @Input() iconAddonAfter = '';

    @Input() buttonAddonAfterClass;

    @Input() size;

    @Input() defaultFocus: boolean;

    @Input() iconLeftTextButton = '';

    @Input() iconRightTextButton = '';

    @Input() disabled: boolean = null;

    @Input() toggle: boolean;

    @Input() toggleClass: string;

    @Input() toggleClassName: string;

    @Input() buttonClass = '';

    @Input() mdResult: ModalResult;

    @Output() isSelected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild( 'buttonBox' ) buttonBox: ElementRef;

    private _buttonSelected = true;

    private tabindex;

    @Input() set buttonSelected( value: boolean ) {
        this._buttonSelected = value;
        this.executeToggle();
    }

    constructor( public button: ElementRef, public modalService: ModalService ) {
        this.toggleClassName = '';
        this.toggle = false;
        this.tabindex = uniqueIndex++;
    }

    keydown( $event ) {
        if ( $event.key === 'Enter' ) {
            this.clickToggle();
        }
        if ( $event.key === 'Escape' ) {
            this.modalService.execCallBack( ModalResult.MRCLOSE, this.buttonBox.nativeElement.offsetParent.parentElement );
        }
    }

    ngAfterContentInit() {
        if ( this.defaultFocus ) {
            this.buttonBox.nativeElement.focus();
        }
        if ( !ModalResult.propertyIsEnumerable( String( this.mdResult ) ) && this.mdResult !== undefined ) {
            throw new EvalError( this.mdResult + ' is not valid ModalResult value' );
        }
        this.hasText();
    }

    clickToggle() {
        this.executeToggle();
        this.dispatchCallback();
    }

    executeToggle() {
        if ( this.toggle ) {
            if ( this._buttonSelected ) {
                this.toggleClassName = this.toggleClass ? this.toggleClass : '-toggle';
                this.isSelected.emit( { selected : this._buttonSelected } );
                this._buttonSelected = false;
            } else {
                this.toggleClassName = '';
                this.isSelected.emit( { selected : this._buttonSelected } );
                this._buttonSelected = true;
            }
        }
    }

    hasText() {
        if ( !this.text ) {
            throw new EvalError( 'You must pass some value to the text property of the button element.' );
        }
    }

    dispatchCallback() {
        const listModals = document.querySelectorAll( 'tl-modal' );
        if ( listModals.length > 0 ) {
            this.modalService.execCallBack( ModalResult[ this.mdResult ], this.findParentOfChildren( listModals ) );
        }
    }

    findParentOfChildren( listModals ) {
        let parent;
        for ( let child = 0; child < listModals.length; child++ ) {
            const listElements = listModals[ child ].querySelectorAll( '*' );
            for ( let child2 = 0; child2 < listElements.length; child2++ ) {
                if ( listElements[ child2 ] === this.button.nativeElement ) {
                    return parent = listModals[ child ];
                }
            }
        }
    }
}

