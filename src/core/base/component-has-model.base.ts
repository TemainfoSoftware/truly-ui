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

import { ElementRef, Input, ViewChild, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ComponentDefaultBase } from './component-default.base';
import { ControlValueAccessor } from '@angular/forms/src/forms';
import { TabIndexService } from '../../form/tabIndex.service';
import { IdGeneratorService } from '../helper/idgenerator.service';
import { NameGeneratorService } from '../helper/namegenerator.service';
import { KeyEvent } from '../enums/key-events';


/**
 * Class that controls all Components that have Models.
 */
export class ComponentHasModelBase extends ComponentDefaultBase implements OnInit, ControlValueAccessor, OnDestroy {

    /**
     * Controller to define if the tabulation is with key Enter or key Tab.
     * @type {boolean}
     */
    @Input() enterAsTab = true;

    /**
     * Input that receive name attribute.
     * @type {string}
     */
    @Input() name = '';

    /**
     * Object of validations (receive a bunch of validations).
     */
    @Input() validations = {};

    /**
     * Text to display in Input Placeholder.
     * @type {string}
     */
    @Input() placeholder = '';

    /**
     * ViewChild of ngModel input.
     */
    @ViewChild( 'model' ) public inputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();

    @Output() focus: EventEmitter<any> = new EventEmitter();

    /**
     * Variable type of TabIndexGenerator in charge of instantiate a new Generator.
     */
    public ngValue = '';

    private tabindex: number;

    private nextTab: number;

    private previousTab: number;

    constructor(private tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService) {
        super(idService, nameService);
    }

    /**
     * Callback of control value accessor to register touched changes
     */
    onTouchedCallback: Function = () => {};

    /**
     * Callback of control value accessor to register changes
     */
    onChangeCallback: Function = () => {};



    ngOnInit() {
        const self = this;
        Object.keys( this.validations ).forEach( function ( key ) {
            self[ key ] = self.validations[ key ];
        } );
    }

    /**
     * Function to set tabIndex of Elements received.
     * @param element
     */
    setTabIndex( element: ElementRef ) {
        setTimeout( () => {
            this.tabindex = this.tabIndexService.setTabIndex( element );
        }, 1 );
        /*        this.setNextTabIndex( this.element.nativeElement.tabindex + 1 );
         this.setPreviousTabIndex( this.element.nativeElement.tabindex - 1 );*/
    }

    /**
     * Function that trigger a keyinput in element.
     * @param event
     */
    onKeyInput( event: KeyboardEvent ) {
        if ( this.enterAsTab ) {
            if (event.keyCode === KeyEvent.TAB && event.shiftKey) {
                event.preventDefault();
                this.previousFocus();
                return;
            }
            switch ( event.keyCode ) {
                case KeyEvent.ENTER:
                    this.nextFocus();
                    break;
                case KeyEvent.ARROWDOWN:
                    this.nextFocus();
                    break;
                case KeyEvent.ARROWUP:
                    this.previousFocus();
                    break;
                case KeyEvent.TAB:
                    event.preventDefault();
                    this.nextFocus();
                    break;
            }
        }
    }

    /**
     * Function to set focus on previous element
     */
    previousFocus() {
        const previousElement = this.getPreviousElementOnForm();
        if ( previousElement !== undefined ) {
            (previousElement as HTMLElement).focus();
        }
    }

    /**
     * Function to set focus on next element
     */
    nextFocus() {
        const nextElement = this.getNextElementOnForm();
        if ( nextElement !== undefined ) {
            (nextElement as HTMLElement).focus();
        }
    }


    getNextElementOnForm() {
        const form = document.querySelectorAll( 'tl-form' );
        for ( let child = 0; child < form.length; child++ ) {
            const doc = form[ child ].querySelectorAll( '*' );
            for ( let child2 = 0; child2 < doc.length; child2++ ) {
                if ( this.isNextTabIndex( doc, child2 ) ) {
                    return doc[ child2 ];
                }
            }
        }
    }

    getPreviousElementOnForm() {
        const form = document.querySelectorAll( 'tl-form' );
        for ( let child = 0; child < form.length; child++ ) {
            const doc = form[ child ].querySelectorAll( '*' );
            for ( let child2 = 0; child2 < doc.length; child2++ ) {
                if ( this.isPreviousTabIndex( doc, child2 ) ) {
                    return doc[ child2 ];
                }
            }
        }
    }

    isNextTabIndex( doc, child2 ) {
        return doc[ child2 ].tabindex === this.tabindex + 1;
    }

    isPreviousTabIndex( doc, child2 ) {
        return doc[ child2 ].tabindex === this.tabindex - 1;
    }

    /**
     * Method that validate if has Validations;
     * @returns {boolean}
     */
    hasValidation() {
        return Object.keys( this.validations ).length > 0;
    }


    /**
     * Function called when input lost it focus.
     */
    onBlur() {
        this.onTouchedCallback();
        this.blur.emit();
    }

    /**
     * Function called when input receive focus;
     */
    onFocus() {
        this.focus.emit();
    }

    /**
     * Function that writes value on ngModel.
     * @param value Value received to write value on ngModel
     */
    writeValue( value: any ) {
        if ( value ) {
            this.ngValue = value;
            this.element.nativeElement.value = value;
        }
    }

    /**
     * Function that register change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnChange( callback: any ) {
        this.onChangeCallback = callback;
    }

    /**
     * Function that register touched change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnTouched( callback: any ) {
        this.onTouchedCallback = callback;
    }

    ngOnDestroy() {
        this.idService.clearId();
        this.nameService.clearName();
        this.tabIndexService.clearTabIndex();
    }

}

