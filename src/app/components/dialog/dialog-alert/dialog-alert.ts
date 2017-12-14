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
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DialogDefaultBehavior } from '../dialog-default-behavior';
import { Modal } from '../../modal/modal-options';

@Modal({
  icon: 'ion-alert-circled',
  title: 'Alerta',
  color: '#FFC284',
  width: '400px',
  height: 'auto',
  draggable: true,
  maximizable: false,
  minimizable: false,
  backdrop: false
})
@Component({
    selector: 'tl-dialog-alert',
    templateUrl: './dialog-alert.html',
    styleUrls: ['../dialog.scss']
})
export class TlDialogAlert extends DialogDefaultBehavior implements AfterViewInit {

    @ViewChild('button') button;

    message = '';

    textClose = 'Close';

    constructor() {
        super();
    }

    ngAfterViewInit() {
        this.buttonAction = this.button;
    }
}
