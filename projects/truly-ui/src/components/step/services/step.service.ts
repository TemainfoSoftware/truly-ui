import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class StepService {

  public onChange = new Subject();

  public onFinish = new Subject();

  public onChangeStatusForm = new Subject();

  private currentStep = 0;

  private steps;

  constructor() {
  }

  setSteps(steps: Array<any>) {
    this.steps = steps;
  }

  setCurrentStep(step: number) {
    this.currentStep = step;
  }

  isFormValid() {
    return this.steps[this.currentStep].form.valid;
  }

  isValidateForm() {
    return this.steps[this.currentStep].validateForm;
  }

  next() {
    if (!this.isLastStep()) {
      this.currentStep = this.currentStep + 1;
      this.onChange.next(this.currentStep);
    }
  }

  finish() {
    const form = {};
    this.steps.forEach(( item, index ) => {
      const id = `step${index}`;
      Object.assign( form, { [id]: item.form.value });
    });
    this.onFinish.next( form );
  }

  previous() {
    if (this.currentStep > 0) {
      this.currentStep = this.currentStep - 1;
      this.onChange.next(this.currentStep);
    }
  }

  formStatusChange( status: boolean ) {
    this.onChangeStatusForm.next( status );
  }

  isFirstStep() {
    return this.currentStep === 0;
  }

  isLastStep() {
    return this.steps.length - 1 === this.currentStep;
  }

}
