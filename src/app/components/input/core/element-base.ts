import { Injector } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';

import { AsyncValidatorArray, message, validate, ValidationResult, ValidatorArray } from './validate';
import { ValueAccessorBase } from './value-accessor';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract model: NgModel;

  constructor( private validators: ValidatorArray,
               private asyncValidators: AsyncValidatorArray,
               private injector: Injector ) {
    super( injector );
  }

  protected validateInnerModel(): Observable<ValidationResult> {
    return validate( this.validators, this.asyncValidators )( this.model.control );
  }

  public get invalid(): Observable<boolean> {
    return Observable.combineLatest( this.validateInnerModel(), this.getErrorsFromOuterModel() )
      .map( v => {
        const errors = Object.assign( v[ 0 ] || {}, v[ 1 ] || {} );
        return Object.keys( errors || {} ).length > 0;
      } );
  }

  public get failures(): Observable<Array<string>> {
    return Observable.combineLatest( this.validateInnerModel(), this.getErrorsFromOuterModel() )
      .map( v => {
        const errors = Object.assign( v[ 0 ] || {}, v[ 1 ] || {} );
        return Object.keys( errors || {} ).map( k => message( errors, k ) );
      } );
  }

  private getErrorsFromOuterModel(): Observable<ValidationResult> {
    if (!this.control) {
      return Observable.of(null);
    }
    if ( this.control === null || this.control.errors === null ) {
      return Observable.of( null );
    }
    return Observable.of( this.control.errors );
  }

}
