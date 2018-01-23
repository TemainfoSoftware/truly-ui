/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { KeyEvent } from '../../core/enums/key-events';
import { Modal } from '../../modal/modal-options';

@Modal({
  icon: 'ion-information-circled',
  title: 'Confirmation',
  color: 'success2',
  width: '400px',
  height: 'auto',
  draggable: true,
  maximizable: false,
  minimizable: false,
  backdrop: false
})
@Component({
    selector: 'tl-dialog-confirmation',
    templateUrl: './dialog-confirmation.html',
    styleUrls: ['../dialog.scss']
})
export class TlDialogConfirmation implements AfterViewInit {

    message = '';

    textOk = 'Yes';

    textCancel = 'No';

    @ViewChild( 'buttonDialogOk' ) buttonDialogOk;

    @ViewChild( 'buttonDialogCancel' ) buttonDialogCancel;

    private defaultOK;

    ngAfterViewInit() {
        setTimeout( () => {
            this.defaultOK === true || this.defaultOK === undefined ? this.buttonDialogOk.buttonElement.nativeElement.focus() :
                this.buttonDialogCancel.buttonElement.nativeElement.focus();
        }, 1 );
    }

    onkeyup( $event: KeyboardEvent ) {
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWLEFT:
                this.setPreviousButton();
            break;
            case KeyEvent.ARROWRIGHT:
                this.setNextButton();
                break;
            case KeyEvent.TAB:
                $event.preventDefault();
                document.activeElement === this.buttonDialogOk.buttonElement.nativeElement
                    ? this.setNextButton() : this.setPreviousButton();
                break;
            case KeyEvent.ESCAPE:
                this.buttonDialogCancel.dispatchCallback();
                break;
        }
    }

    private setPreviousButton() {
        this.buttonDialogOk.buttonElement.nativeElement.focus();
    }

    private setNextButton() {
        this.buttonDialogCancel.buttonElement.nativeElement.focus();
    }
}
