import { ControlValueAccessor } from '@angular/forms';
import { ComponentCustom } from "./ComponentCustom";

/**
 * A constant to be used in a function that performs no operations.
 */
const noop = () => {};

export class ComponentHasModel extends ComponentCustom implements ControlValueAccessor {

    /**
     * Value of ngModel returned to user.
     */
    public ngValue: string = '';

    /**
     * Function that returns value of ngModel
     * @returns {string}
     */
    public get value(): any {
        return this.ngValue;
    }

    /**
     * Function that receive value to set in ngModel
     * @param v
     */
    public set value(v: any) {
        if (v !== this.ngValue) {
            this.ngValue = v;

            this.onChangeCallback(v);
        }
    }

    /**
     * Callback of control value accessor to register touched changes
     */
    public onTouchedCallback: () => void = noop;

    /**
     * Callback of control value accessor to register changes
     */
    public onChangeCallback: (_: any) => void = noop;

    /**
     * Function that writes value on ngModel.
     * @param value Value received to write value on ngModel
     */
    writeValue(value: any) {
        if (value !== this.ngValue) {
            this.ngValue = value;
            this.onChangeCallback(this.ngValue)
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

}