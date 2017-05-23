import {Component, Input, ViewEncapsulation, ViewChild, forwardRef} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

/**
 * A constant to be used in a function that performs no operations.
 */
const noop = () => {
};

/**
 * Constant provider Control Value Accessor.
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TlInput),
    multi: true
};

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
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TlInput implements ControlValueAccessor {
    /**
     * Value of ngModel returned to user.
     */
    @Input() ngValue: string = '';

    /**
     * Function that returns value of ngModel
     * @returns {string}
     */
    get value(): any {
        return this.ngValue;
    }

    /**
     * Function that receive value to set in ngModel
     * @param v
     */
    set value(v: any) {
        if (v !== this.ngValue) {
            this.ngValue = v;
            this.onChangeCallback(v);
        }
    }

    /**
     * Text placed before Input.
     * @type {string}
     */
    @Input() textBefore: string = '';

    /**
     * Text placed before Input.
     * @type {string}
     */
    @Input() textAfter: string = '';

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
    @Input() iconBefore: string = '';

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
    @Input() iconAfter: string = '';

    /**
     * Text to display in Input Placeholder.
     * @type {string}
     */
    @Input() placeholder: string = '';

    /**
     * Controller to display clear button after type something [default] = false.
     * @type {boolean}
     */
    @Input() clearButton: boolean;

    /**
     * Controller to change value to UpperCase.
     * @type {boolean}
     */
    @Input() toUpperCase: boolean;

    /**
     * Controller to make an input readonly.
     * @type {boolean}
     */
    @Input() readonly: boolean = null;

    /**
     * Controller to make an input disabled.
     * @type {boolean}
     */
    @Input() disabled: boolean = null;

    /**
     * The element itself to be manipulated
     */
    @ViewChild('input') input;

    /**
     * Callback of control value accessor to register touched changes
     */
    private onTouchedCallback: () => void = noop;

    /**
     * Callback of control value accessor to register changes
     */
    private onChangeCallback: (_: any) => void = noop;

    /**
     * Function that writes value on ngModel.
     * @param value Value received to write value on ngModel
     */
    writeValue(value: any) {
        if (value !== this.ngValue) {
            this.ngValue = value;
            if (this.toUpperCase) {
                this.onChangeCallback(this.ngValue)
            }
        }
    }

    /**
     * Function that register change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnChange(callback: any) {
        this.onChangeCallback = callback;
    }

    /**
     * Function that register touched change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnTouched(callback: any) {
        this.onTouchedCallback = callback;
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
    onInputChange($event) {
        return this.toUpperCase ? (this.writeValue($event.toUpperCase())) : this.writeValue($event);
    }

    /**
     * Function called when input lost it focus.
     */
    onBlur() {
        this.onTouchedCallback();
    }
}