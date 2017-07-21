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
    AfterViewInit, Component, ContentChildren, Input, OnDestroy, QueryList, Renderer2,
    ViewChild
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { TlInput } from '../input/input';
import { DialogService } from '../dialog/dialog.service';
import { ModalResult } from '../core/enums/modal-result';

@Component( {
    selector: 'tl-form',
    templateUrl: '../form/form.html',
    styleUrls: ['../form/form.scss']
} )
export class TlForm implements AfterViewInit, OnDestroy {

    @Input() lastElement;
    @Input() initialFocus;
    @Input() showConfirmOnChange = false;

    @ContentChildren( TlInput ) inputList: QueryList<TlInput>;

    @ViewChild( 'buttonFormOk' ) buttonFormOk;
    @ViewChild( 'buttonFormCancel' ) buttonFormCancel;

    private input;
    private listenLastElement;
    private dialogOpen = false;

    constructor( private renderer: Renderer2, private dialogService: DialogService ) {}

    ngAfterViewInit() {
        this.setInitialFocus();
        this.listenLastElement = this.renderer.listen( this.lastElement.element.nativeElement, 'keydown', ( $event: KeyboardEvent ) => {
            if ( this.isKeyDownEnterOrArrowDown( $event ) ) {
                setTimeout( () => {
                    this.buttonFormOk.buttonElement.nativeElement.focus();
                }, 1 );
            }
        } );
    }

    handleKeysForm( $event: KeyboardEvent ) {
        this.inputHasChanged();
        switch ( $event.keyCode ) {
            case KeyEvent.ESCAPE :
                this.closeForm();
                break;
            case KeyEvent.ARROWUP :
                this.backFocusToForm();
                break;
            case KeyEvent.ARROWLEFT :
                this.setFocusOK();
                break;
            case KeyEvent.ARROWRIGHT:
                this.setFocusCancel();
        }
    }

    setInitialFocus() {
        this.initialFocus ? this.initialFocus.element.nativeElement.focus()
            : this.setFocusOnFirstInput();
    }

    setFocusOK() {
        if ( this.isActiveElementButtonCancel() ) {
            this.buttonFormOk.buttonElement.nativeElement.focus();
        }
    }

    setFocusCancel() {
        if ( this.isActiveElementButtonOk() ) {
            this.buttonFormCancel.buttonElement.nativeElement.focus();
        }
    }

    backFocusToForm() {
        if ( this.isActiveElementButtonOk() ||
            this.isActiveElementButtonCancel() ) {
            this.lastElement.element.nativeElement.focus();
        }
    }

    setFocusOnFirstInput() {
        this.inputList.toArray().length > 0 ?
            this.inputList.toArray()[ 0 ].element.nativeElement.focus() : this.input = false;
    }

    isKeyDownEnterOrArrowDown( $event: KeyboardEvent ) {
        return this.isKeyDownEqualsEnter( $event ) || this.isKeyDownEqualsArrowDown( $event );
    }

    isKeyDownEqualsEnter( $event: KeyboardEvent ) {
        return $event.keyCode === KeyEvent.ENTER;
    }

    isKeyDownEqualsArrowDown( $event: KeyboardEvent ) {
        return $event.keyCode === KeyEvent.ARROWDOWN;
    }

    isActiveElementButtonOk() {
        return document.activeElement === this.buttonFormOk.buttonElement.nativeElement;
    }

    isActiveElementButtonCancel() {
        return document.activeElement === this.buttonFormCancel.buttonElement.nativeElement;
    }

    inputHasChanged() {
        let inputDirty = false;
        this.inputList.toArray().forEach( ( value ) => {
            if ( value.inputModel.dirty ) {
                inputDirty = true;
            }
        } );
        return inputDirty;
    }

    closeForm() {
        this.dialogOpen = false;
        if ( this.showConfirmOnChange && this.inputHasChanged() ) {
            this.showConfirmation();
            return;
        }
        this.buttonFormCancel.dispatchCallback();
        if ( !this.hasValueOnForm() ) {
            this.buttonFormCancel.dispatchCallback();
            return;
        }
    }

    showConfirmation() {
        if ( !this.dialogOpen ) {
            this.dialogOpen = true;
            this.dialogService.confirmation( 'Deseja Realmente fechar o formulario e perder todos os dados preenchidos ?', ( callback ) => {
                if ( callback === ModalResult.MRYES ) {
                    this.buttonFormCancel.dispatchCallback();
                }
            }, { draggable: false } );
        }
    }

    hasValueOnForm() {
        let model;
        this.inputList.toArray().forEach( ( value ) => {
            if ( value.ngValue ) {
                model = value.ngValue;
            }
        } );
        return model;
    }

    ngOnDestroy() {
        this.listenLastElement();
    }
}

