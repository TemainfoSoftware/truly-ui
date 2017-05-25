import { Component, Input, ViewChild, OnInit, forwardRef } from '@angular/core';
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
@Component({
    selector: 'tl-input',
    templateUrl: './input.html',
    styleUrls: ['./input.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TlInput), multi: true}
    ]
})
export class TlInput extends ComponentHasModel implements OnInit {

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
     * Text to display in Input Placeholder.
     * @type {string}
     */
    @Input() placeholder = '';

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
     * The element itself to be manipulated
     */
    @ViewChild('input') public input;

    constructor() {
        super();
    }

    ngOnInit() {
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
    }

}
