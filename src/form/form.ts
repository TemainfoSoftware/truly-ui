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
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnDestroy,
    OnInit,
    QueryList, Renderer2,
    ViewChild,
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { TlInput } from '../input/input';
import { DialogService } from '../dialog/dialog.service';
import { ModalResult } from '../core/enums/modal-result';
import { TlDropDownList } from '../dropdownlist/dropdownlist';

let componentFormIndex;

@Component( {
    selector: 'tl-form',
    templateUrl: '../form/form.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../form/form.scss']
} )
export class TlForm implements AfterViewInit, OnDestroy, OnInit {

    @Input() initialFocus;

    @Input() showConfirmOnChange = false;

    @Input() messageDialogConfirmation = 'Are you sure ?';

    @ContentChildren( TlInput ) inputList: QueryList<TlInput>;

    @ContentChildren( TlDropDownList ) dropdownList: QueryList<TlDropDownList>;

    @ViewChild( 'buttonFormOk' ) buttonFormOk;

    @ViewChild( 'buttonFormCancel' ) buttonFormCancel;

    @ViewChild( 'content' ) content;

    private dialogOpen = false;

    private validForm = true;

    private lastTabIndex;

    private lastActiveElement;

    private formResult = {};

    private focusElements = [];

    private elementsWithTabIndex = [];

    constructor( private renderer: Renderer2, private dialogService: DialogService,
                 private cdr: ChangeDetectorRef ) {
    }

    ngOnInit() {
        componentFormIndex = -1;
    }

    ngAfterViewInit() {
        this.setInitialFocus();
        this.getElementsOnForm();
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

    getElementsOnForm() {
        const listFormComponents = this.content.nativeElement.querySelectorAll( '*' );
        for ( let childFormComponents = 0; childFormComponents < listFormComponents.length; childFormComponents++ ) {
            if ( listFormComponents[ childFormComponents ].tagName === 'INPUT' ) {
                this.focusElements.push( listFormComponents[ childFormComponents ] );
            }
        }
        this.addButtonsOfFormToListElements();
        this.handleTabIndexComponentsOfForm();
    }

    addButtonsOfFormToListElements() {
        this.focusElements.push( this.buttonFormOk.buttonElement.nativeElement );
        this.focusElements.push( this.buttonFormCancel.buttonElement.nativeElement );
    }

    handleTabIndexComponentsOfForm() {
        setTimeout( () => {
            this.getElementsWithTabIndex();
            this.generateTabIndexOfElements();
            this.orderElements();
            this.validateTabIndexByElements();
        }, 10 );
    }


    setTabIndex(element) {
        if ( !element.tabIndex ) {
            componentFormIndex++;
            if ( this.notExistTabIndexInserted() ) {
                element.setAttribute( 'tabIndex', componentFormIndex );
            } else {
                this.setTabIndex(element);
            }
        }
    }


    isLastTabIndexElement(element, index, array) {
        if ( index === array.length - 1 ) {
            this.lastTabIndex = element.tabIndex;
        }
    }


    generateTabIndexOfElements() {
        this.focusElements.forEach( ( element, index, array ) => {
                this.setTabIndex(element);
                this.isLastTabIndexElement(element, index, array);
            }
        );
    }

    getElementsWithTabIndex() {
        this.focusElements.forEach( ( element ) => {
            if ( element.tabIndex ) {
                this.validateDuplicatedTabIndex(element);
                this.elementsWithTabIndex.push( element.tabIndex );
            }
        } );
    }

    validateDuplicatedTabIndex(element) {
        if (this.existTabIndexInserted(element)) {
            throw new EvalError( 'Exist an element with tabIndex duplicated! TabIndex : ' + element.tabIndex );
        }
    }

    validateTabIndexByElements() {
        const formElementsDefault = 3;
        if (Math.max(...this.elementsWithTabIndex) > this.focusElements.length - formElementsDefault) {
            throw new EvalError( 'The form doesn\'t have the number' +
                ' of elements enough according with TabIndex passed : ' + Math.max(...this.elementsWithTabIndex));
        }
    }


    notExistTabIndexInserted() {
        return this.elementsWithTabIndex.indexOf( componentFormIndex ) < 0;
    }

    existTabIndexInserted(element) {
        return this.elementsWithTabIndex.indexOf(element.tabIndex) >= 0;
    }

    orderElements() {
        let order;
        order = this.focusElements.sort( function ( a, b ) {
            return a.getAttribute('tabindex') - b.getAttribute('tabindex');
        } );
        this.focusElements = order;
    }

    handleKeysForm( $event: KeyboardEvent ) {
        this.inputHasChanged();
        this.verifyInputValidation();
        if ( $event.keyCode === KeyEvent.TAB && $event.shiftKey ) {
            $event.preventDefault();
            this.backwardTabbing();
            return;
        }
        switch ( $event.keyCode ) {
            case KeyEvent.ESCAPE :
                this.closeForm();
                break;
            case KeyEvent.ARROWUP :
                this.backwardTabbing();
                break;
            case KeyEvent.ARROWDOWN:
                this.forwardTabbing();
                break;
            case KeyEvent.ARROWLEFT :
                this.setFocusOK();
                break;
            case KeyEvent.ARROWRIGHT:
                this.setFocusCancel();
                break;
            case KeyEvent.TAB:
                $event.preventDefault();
                this.forwardTabbing();
                break;
            case KeyEvent.ENTER:
                $event.preventDefault();
                this.forwardTabbing();
                break;
        }
    }

    backwardTabbing() {
        if ( this.isFirstTabIndexOfForm() ) {
            return this.focusElements[ this.lastTabIndex ].focus();
        }
        const previousElement = (document.activeElement as HTMLElement).tabIndex - 1;
        for ( let element = previousElement; element < this.focusElements.length; element-- ) {
            if ( !this.isElementDisabled( this.focusElements[ element ] ) ) {
                return this.focusElements[ element ].focus();
            }
        }
    }

    forwardTabbing() {
        if ( this.isLastTabIndexOfForm() ) {
            return this.focusElements[ 0 ].focus();
        }
        const nextElement = (document.activeElement as HTMLElement).tabIndex + 1;
        for ( let element = nextElement; element < this.focusElements.length; element++ ) {
            if ( !this.isElementDisabled( this.focusElements[ element ] ) ) {
                return this.focusElements[ element ].focus();
            }
        }
    }

    isLastTabIndexOfForm() {
        return (document.activeElement as HTMLElement).tabIndex === this.lastTabIndex;
    }

    isFirstTabIndexOfForm() {
        return (document.activeElement as HTMLElement).tabIndex === 0;
    }

    isElementDisabled( element ) {
        return element.disabled;
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
                if ( item.componentModel.valid === false ) {
                    this.validForm = false;
                    this.cdr.detectChanges();
                }
        } );
        this.cdr.detectChanges();
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

