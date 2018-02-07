import {NgModel} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';

import {ValueAccessorBase} from './value-accessor';

import {
  AsyncValidatorArray,
  ValidatorArray,
  ValidationResult,
  message,
  validate,
} from './validate';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract model: NgModel;

  constructor(
    public validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
  ) {
    super();
  }

  protected validate(): Observable<ValidationResult> {
    return validate
    (this.validators, this.asyncValidators)
    (this.model.control);
  }

  public get invalid(): Observable<boolean> {
    return this.validate().map(v => Object.keys(v || {}).length > 0);
  }

  protected get failures(): Observable<Array<string>> {
    return this.validate().map(v => Object.keys(v).map(k => message(v, k)));
  }
}
