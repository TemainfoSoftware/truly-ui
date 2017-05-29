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

import { ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ComponentCustom } from './ComponentCustom';
import { TabIndexGenerator } from '../helper/tabindex-generator';

/**
 * A constant to be used in a function that performs no operations.
 */
const noop = () => {
};

/**
 * Class that controls all Components that have Models.
 */
export class ComponentHasModel extends ComponentCustom implements ControlValueAccessor, OnInit {

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

    @Input() validations = {};

    /**
     * Text to display in Input Placeholder.
     * @type {string}
     */
    @Input() placeholder = '';

    @ViewChild( 'model' ) public inputModel;

    /**
     * Variable type of TabIndexGenerator in charge of instantiate a new Generator.
     */
    tabIndex : TabIndexGenerator;

    /**
     * Value of ngModel returned to user.
     */
    ngValue = '';

    /**
     * Function that returns value of ngModel
     * @returns {string}
     */
    public get value() : any {
        return this.ngValue;
    }

    /**
     * Function that receive value to set in ngModel
     * @param v
     */
    public set value( v : any) {
        if (v !== this.ngValue) {
            this.ngValue = v;

            this.onChangeCallback(v);
        }
    }

    /**
     * Callback of control value accessor to register touched changes
     */
    onTouchedCallback : () => void = noop;

    /**
     * Callback of control value accessor to register changes
     */
    onChangeCallback : ( _ : any) => void = noop;


    ngOnInit () {
        let self = this;
        Object.keys( this.validations ).forEach(function ( key ) {
            self[key] = self.validations[key];
        })
    }

    /**
     * Function to set tabIndex of Elements received.
     * @param element
     */
    setTabIndex( element : ElementRef ) {
        this.tabIndex = new TabIndexGenerator(element);
        this.setNextTabIndex(this.element.nativeElement.tabIndex + 1);
        this.setPreviousTabIndex(this.element.nativeElement.tabIndex - 1);
    }

    /**
     * Function that writes value on ngModel.
     * @param value Value received to write value on ngModel
     */
    writeValue( value : any ) {
        if (value !== this.ngValue) {
            this.ngValue = value;
            this.onChangeCallback(this.ngValue);
        }

    }

    /**
     * Function that register change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnChange( callback : any ) {
        this.onChangeCallback = callback;
    }

    /**
     * Function that register touched change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnTouched( callback : any ) {
        this.onTouchedCallback = callback;
    }

    /**
     * Function that trigger a keyinput in element.
     * @param event
     */
    onKeyInput( event : KeyboardEvent ) {
        if (this.enterAsTab) {
            if (event.keyCode === 13 || event.keyCode === 40) {
                this.nextFocus();
            } else if (event.keyCode === 38) {
                this.previousFocus();
            }
        }
    }

    /**
     * Function to set focus on previous element
     */
    previousFocus() {
        if (this.previousTabIndex !== -1) {
            document.getElementById('tl-' + this.element.nativeElement.localName + '-' + this.previousTabIndex).focus();
        }
    }

    /**
     * Function to set focus on next element
     */
    nextFocus() {
        const existElement = this.existsElement(this.element.nativeElement.tabIndex);
        if (existElement) {
            document.getElementById('tl-' + this.element.nativeElement.localName + '-' + this.nextTabIndex).focus();
        }
    }

    /**
     * Function that verify if next element exists.
     * @param currentTabIndex
     */
    existsElement(currentTabIndex) {
        return document.getElementById('tl-' + this.element.nativeElement.localName + '-' + (currentTabIndex + 1));
    }


    hasValidation() {
        return Object.keys( this.validations ).length > 0;
    }

}

