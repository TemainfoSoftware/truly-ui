import {ControlValueAccessor} from '@angular/forms';
import { EventEmitter, Inject, Optional } from '@angular/core';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;

  public isDisabled: boolean;

  public propagateChange: any = () => {};
  public propagateTouched: any = () => {};

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if ( (value instanceof Date) && this.innerValue) {
      const innerDate = new Date(<string><any>this.innerValue);
      if ( (<Date><any>innerDate).getTime() === (<Date><any>value).getTime()) {
        return;
      }
    }
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.propagateChange(value);
    }
  }

  writeValue(value: T) {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: T) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.propagateTouched = fn;
  }

  setDisabledState( isDisabled: boolean ): void {
      this.isDisabled = isDisabled;
  }

}
