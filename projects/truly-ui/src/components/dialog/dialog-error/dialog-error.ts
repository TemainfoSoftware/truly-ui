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
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { I18nService } from '../../i18n/i18n.service';
import { DialogDefaultBehavior } from '../dialog-default-behavior';
import { Modal } from '../../modal/interfaces/modal-options';
import { TlButton } from '../../button/button';

@Modal({
  icon: 'fas fa-times-circle',
  title: 'Error',
  color: 'danger',
  width: '400px',
  height: 'auto',
  draggable: true,
  maximizable: false,
  minimizable: false,
  backdrop: true,
  closeOnOK: true
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
export class TlDialogError extends DialogDefaultBehavior implements OnInit {

    message = '';

    exceptionName = '';

    exceptionMessage = '';

    get textOk() {
      return this.i18n.getLocale().Dialog.textOk;
    }

    get exceptionBoxDescription() {
      return this.i18n.getLocale().Dialog.exceptionBoxDescription;
    }

    @ViewChild( TlButton, {static: true}  ) button: TlButton;

    @HostBinding( '@enterAnimation' ) public animation;

    public errorlog: boolean;

    constructor( private i18n: I18nService ) {
        super();
    }

    ngOnInit() {
      this.button.setFocus();
    }

    open(value) {
        this.errorlog = !value;
    }
}
