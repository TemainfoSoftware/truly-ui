import {AfterViewInit, ChangeDetectorRef, ContentChild, Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {StepService} from '../services/step.service';
import {TlButton} from '../../button/button';

@Directive({
  selector: '[stepFinish]'
})
export class StepFinishDirective implements AfterViewInit, OnInit {

  constructor( private elementRef: ElementRef,
               private change: ChangeDetectorRef,
               private stepService: StepService,
               private button: TlButton) {
  }

  @HostListener('click')
  onClick() {
    if ( !this.stepService.isValidateForm() ) {
      this.stepService.finish();
      return;
    }
    if (this.stepService.isFormValid()) {
      this.stepService.finish();
    }
  }

  ngOnInit() {
    this.elementRef.nativeElement.hidden = 'true';
    this.changes();
  }

  ngAfterViewInit() {
    this.setDisabled();
    this.stepService.onChangeStatusForm.subscribe(() => {
      setTimeout(() => {
        this.setDisabled();
      });
    });
  }

  private setDisabled() {
    if ( this.stepService.isValidateForm()) {
      this.button.disabled = !this.stepService.isFormValid();
      this.change.detectChanges();
    }
  }

  private changes() {
    this.stepService.onChange.subscribe(() => {
      this.elementRef.nativeElement.hidden = !this.stepService.isLastStep();
    });
  }
}
