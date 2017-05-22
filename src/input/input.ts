import {Component, Input, ViewEncapsulation, ViewChild, forwardRef} from '@angular/core'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TlInput),
    multi: true
};

@Component({
    selector: 'tl-input',
    templateUrl: './input.html',
    styleUrls: ['./input.scss', '../assets/reset.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TlInput implements ControlValueAccessor {
    @Input() ngValue: string = '';

    get value(): any {
        return this.ngValue;
    }

    set value(v: any) {
        if (v !== this.ngValue) {
            this.ngValue = v;
            this.onChangeCallback(v);
        }
    }

    @Input() iconLeft: string = '';
    @Input() iconRight: string = '';
    @Input() placeholder: string = '';
    @Input() clearButton: boolean;
    @Input() toUpperCase: boolean;
    @Input() readonly: boolean = null;
    @Input() disabled: boolean = null;

    @ViewChild('input') input;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() {

    }

    onBlur() {
        this.onTouchedCallback();
    }

    writeValue(value: any) {
        if (value !== this.ngValue) {
            this.ngValue = value;
            if (this.toUpperCase) {
                this.onChangeCallback(this.ngValue)
            }
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    clearInput() {
        this.input.nativeElement.value = '';
        this.ngValue = '';
    }

    onInputChange($event) {
        return this.toUpperCase ? (this.writeValue($event.toUpperCase())) : this.writeValue($event);
    }
}