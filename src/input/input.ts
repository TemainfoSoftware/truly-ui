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
import { Component, Input, ViewChild, forwardRef, AfterViewInit } from '@angular/core';
import { ComponentHasModel } from '../core/base/ComponentHasModel';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Input Component personalized with few features.
 *
 * import { InputModule } from 'truly-ui';
 *
 * @Component({
 *  selector: 'my-app-comp',
 *  template: '
 *  <tl-input
 *   [(ngModel)]="title"
 *   [iconBefore]="'ion-email'"
 *   [iconAfter]="'ion-email'"
 *   [textBefore]="'R$'"
 *   [textAfter]="'00,00'"
 *   [placeholder]="'Meu Input'"
 *   [clearButton]="true"
 *   [readonly]="true"
 *   [disabled]="true"
 *   [toUpperCase]="true">
 *  </tl-input>
 *  '
 * })
 */
@Component( {
    selector: 'tl-input',
    templateUrl: './input.html',
    styleUrls: ['./input.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef( () => TlInput ), multi: true }
    ]
})
export class TlInput extends ComponentHasModel implements AfterViewInit {

    /**
     * Text placed before Input.
     * @type {string}
     */
    @Input() textBefore = '';

    /**
     * Text placed before Input.
     * @type {string}
     */
    @Input() textAfter = '';

    /**
     * Property to label placement [default]='left'
     * 'left' | 'top'
     * @type {string}
     */
    @Input() labelPlacement = 'left';

    /**
     * Property to labelSize
     * @type {string}
     */
    @Input() labelSize = '';

    /**
     * Label of Input
     * @type {string}
     */
    @Input() label = '';

    /**
     * Class of an Icon placed Before Input. Example usage:
     *
     * ```html
     * <tl-input [iconBefore]="'ion-email'"></tl-input>
     * ```
     *
     * ```html
     * <tl-input [iconBefore]="'fa fa-user'"></tl-input>
     * ```
     */
    @Input() iconBefore = '';

    /**
     * Class of an Icon placed After Input.
     *
     * ```html
     * <tl-input [iconAfter]="'ion-email'"></tl-input>
     * ```
     *
     * ```html
     * <tl-input [iconAfter]="'fa fa-address-card'"></tl-input>
     * ```
     */
    @Input() iconAfter = '';

    /**
     * Controller to display clear button after type something [default] = false.
     * @type {boolean}
     */
    @Input() clearButton : boolean;

    /**
     * Controller to change value to UpperCase.
     * @type {boolean}
     */
    @Input() toUpperCase : boolean;

    /**
     * Controller to make an input readonly.
     * @type {boolean}
     */
    @Input() readonly : boolean = null;

    /**
     * Controller to make an input disabled.
     * @type {boolean}
     */
    @Input() disabled : boolean = null;

    /**
     * Property for minLength value
     */
    @Input() minLength: string;

    /**
     * Property for maxLength value
     */
    @Input() maxLength: string;

    /**
     * Property to control if input is required or not.
     */
    @Input() required: number = null;

    /**
     * Property to control autocomplete input
     */
    @Input() autocomplete: boolean;

    /**
     * The element itself to be manipulated
     */
    @ViewChild( 'input' ) public input;

    /**
     * Constructor
     */
    constructor() {
        super();
    }

    /**
     * LifeHook Angular
     */
    ngAfterViewInit() {
        this.setElement( this.input, 'input' );
        this.setTabIndex( this.input );
    }

    /**
     * Function to clear input value.
     */
    clearInput() {
        this.input.nativeElement.value = '';
        this.ngValue = '';
    }

    /**
     * Function to receive input change.
     * @param $event Value received to be uppercased.
     * @returns An value text uppercase or not, defined by toUppercase property.
     */
    onInputChange( $event ) {
        return this.toUpperCase ? ( this.writeValue( $event.toUpperCase() ) ) : this.writeValue( $event );
    }

    /**
     * Function called when input lost it focus.
     */
    onBlur() {
        this.onTouchedCallback();
        this.requiredValidation();
    }

}
