/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
import { AfterViewInit, Component, HostBinding, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { DialogDefaultBehavior } from '../dialog-default-behavior';
import { Modal } from '../../modal/modal-options';
@Modal({
  icon: 'ion-close-circled',
  title: 'Error',
  color: 'danger',
  width: '400px',
  height: 'auto',
  draggable: true,
  maximizable: false,
  minimizable: false,
  backdrop: false
})
@Component({
    selector: 'tl-dialog-error',
    templateUrl: './dialog-error.html',
    styleUrls: ['../dialog.scss', './dialog-error.scss'],
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
export class TlDialogError extends DialogDefaultBehavior implements AfterViewInit {

    message = '';

    textOk = 'Ok';

    exceptionName = '';

    exceptionMessage = '';

    @ViewChild('button') button;

    @HostBinding( '@enterAnimation' ) public animation;

    public errorlog: boolean;

    constructor() {
        super();
    }

    ngAfterViewInit() {
        this.buttonAction = this.button;
    }

    open(value) {
        this.errorlog = !value;
    }
}
