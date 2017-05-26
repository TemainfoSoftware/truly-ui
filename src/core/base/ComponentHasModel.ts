import { ElementRef, Input } from '@angular/core';
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
export class ComponentHasModel extends ComponentCustom implements ControlValueAccessor {
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
     * Variable type of TabIndexGenerator in charge of instantiate a new Generator.
     */
    public tabIndex : TabIndexGenerator;

    /**
     * Value of ngModel returned to user.
     */
    public ngValue = '';


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

}

