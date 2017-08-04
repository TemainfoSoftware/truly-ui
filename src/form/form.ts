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
    AfterViewInit, Component, ContentChildren, Input, OnDestroy, OnInit,
    QueryList, Renderer2,
    ViewChild
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { TlInput } from '../input/input';
import { DialogService } from '../dialog/dialog.service';
import { ModalResult } from '../core/enums/modal-result';
import { TabIndexService } from './tabIndex.service';
import { TlDropDownList } from '../dropdownlist/dropdownlist';

@Component( {
    selector: 'tl-form',
    templateUrl: '../form/form.html',
    styleUrls: ['../form/form.scss']
} )
export class TlForm implements AfterViewInit, OnDestroy, OnInit {

    @Input() lastElement;

    @Input() initialFocus;

    @Input() showConfirmOnChange = false;

    @Input() messageDialogConfirmation = 'Are you sure ?';

    @ContentChildren( TlInput ) inputList: QueryList<TlInput>;

    @ContentChildren( TlDropDownList ) dropdownList: QueryList<TlDropDownList>;

    @ViewChild( 'buttonFormOk' ) buttonFormOk;

    @ViewChild( 'buttonFormCancel' ) buttonFormCancel;

    private dialogOpen = false;

    private lastActiveElement;

    private formResult = {};

    private validForm = true;

    constructor( private renderer: Renderer2, private dialogService: DialogService,
                 private tabService: TabIndexService ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        if (!this.lastElement) {
            throw new EvalError( 'You must define the [lastElement] property !' );
        }
        this.setInitialFocus();
        this.setTabIndexButtons();
        this.verifyInputValidation();
        this.renderer.listen( this.buttonFormOk.buttonElement.nativeElement, 'click', ( $event: MouseEvent ) => {
            $event.stopPropagation();
            this.getInputValues();
            this.getDropdownListValues();
        } );
        this.renderer.listen(this.buttonFormOk.buttonElement.nativeElement, 'keyup', ($event: KeyboardEvent) => {
            $event.stopPropagation();
            this.getInputValues();
            this.getDropdownListValues();
        });
    }

    handleKeysForm( $event: KeyboardEvent ) {
        this.inputHasChanged();
        this.verifyInputValidation();
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

    setTabIndexButtons() {
        setTimeout( () => {
            this.buttonFormOk.tabindex = this.tabService.uniqueIndex;
            this.buttonFormCancel.tabindex = this.tabService.uniqueIndex + 1;
        }, 1 );
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
        if ( this.inputList.toArray().length > 0 ) {
            this.inputList.toArray()[ 0 ].element.nativeElement.focus();
        }
    }

    isActiveElementButtonOk() {
        return document.activeElement === this.buttonFormOk.buttonElement.nativeElement;
    }

    isActiveElementButtonCancel() {
        return document.activeElement === this.buttonFormCancel.buttonElement.nativeElement;
    }

    getLastActiveElement() {
        this.lastActiveElement = document.activeElement;
    }

    inputHasChanged() {
        let inputDirty = false;
        this.inputList.toArray().forEach( ( value ) => {
            if ( value.componentModel.dirty ) {
                inputDirty = true;
            }
        } );
        return inputDirty;
    }

    closeForm() {
        this.getLastActiveElement();
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
            this.dialogService.modalService.setBackdropModalOverModal();
            this.dialogService.confirmation( this.messageDialogConfirmation, ( callback ) => {
                if ( callback.mdResult === ModalResult.MRYES ) {
                    this.buttonFormCancel.dispatchCallback();
                }
                this.dialogOpen = false;
                this.lastActiveElement.focus();
            }, { draggable: false } );
        }
    }

    getInputValues() {
        this.inputList.forEach( ( item ) => {
            this.formResult[ item.label.toLowerCase() ] = item.componentModel.model;
        } );
    }

    verifyInputValidation() {
        this.validForm = true;
        this.inputList.forEach( ( item ) => {
            setTimeout( () => {
                if ( item.componentModel.valid === false ) {
                    this.validForm = false;
                }
            }, 0 );
        } );
        return this.validForm;
    }


    getDropdownListValues() {
        this.dropdownList.forEach( ( item ) => {
            this.formResult[ item.label.toLowerCase() ] = item.componentModel.model;
        } );
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

    }
}

