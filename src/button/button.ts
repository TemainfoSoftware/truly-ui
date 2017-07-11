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
import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { ModalResult } from '../core/enums/modal-result';

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

    @Input() iconLeftTextButton = '';

    @Input() iconRightTextButton = '';

    @Input() disabled: boolean = null;

    @Input() toggle: boolean;

    @Input() buttonSelected: boolean;

    @Input() toggleClass: string;

    @Input() toggleClassName: string;

    @Input() buttonClass;

    @Input() mdResult: ModalResult;

    @ViewChild( 'buttonBox' ) buttonBox: ElementRef;

    constructor(private modalService: ModalService) {
        this.toggle = false;
        this.buttonSelected = false;
    }

    ngAfterContentInit() {
        if ( ! ModalResult.propertyIsEnumerable( this.mdResult ) && this.mdResult !== undefined) {
            throw new EvalError( this.mdResult + ' is not valid ModalResult value');
        }
    }

    clickToggle() {
        this.buttonSelected = !this.buttonSelected;
        if (this.toggle) {
            if (this.buttonSelected) {
                this.toggleClassName = this.toggleClass ? this.toggleClass : '-toggle';
            } else {
                this.toggleClassName = '';
            }
        }
        this.isButtonOnModal();
    }

    isButtonOnModal() {
        if (this.buttonBox.nativeElement.offsetParent.parentElement.localName === 'tl-modal') {
            this.modalService.execCallBack(ModalResult[ this.mdResult ]);
        }
    }

}

