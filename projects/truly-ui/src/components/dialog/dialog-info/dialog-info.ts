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
import { Component, OnInit, ViewChild } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DialogDefaultBehavior } from '../dialog-default-behavior';
import { Modal } from '../../modal/interfaces/modal-options';
import { TlButton } from '../../button/button';

@Modal({
  icon: 'fas fa-info-circle',
  title: 'Information',
  color: 'information',
  width: 'auto',
  height: 'auto',
  draggable: false,
  maximizable: false,
  minimizable: false,
  backdrop: true,
  closeOnOK: true
})
@Component({
    selector: 'tl-dialog-info',
    templateUrl: './dialog-info.html',
    styleUrls: ['../dialog.scss']
})
export class TlDialogInfo extends DialogDefaultBehavior implements OnInit {

    title = '';

    message = '';

    get textOk() {
      return this.i18n.getLocale().Dialog.textOk;
    }

    @ViewChild( TlButton, {static: true}  ) button: TlButton;

    constructor( private i18n: I18nService ) {
        super();
    }

    ngOnInit() {
      this.button.setFocus();
    }

}

