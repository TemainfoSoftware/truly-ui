import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[selectedItem]',
  providers: [{provide: NG_VALIDATORS, useExisting: SelectedValidatorDirective, multi: true}]
})
export class SelectedValidatorDirective implements Validator {

  @Input() selected;

  validate(control: AbstractControl): {[key: string]: any} | null {
    if ( !control.value ) {
      return null;
    }
    if ( control.value && !this.selected ) {
      return { item: 'Invalid Item' };
    }
    return null;
  }
}
