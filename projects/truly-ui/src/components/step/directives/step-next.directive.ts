import {AfterViewInit, ChangeDetectorRef, ContentChild, Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {StepService} from '../services/step.service';
import {TlButton} from '../../button/button';

@Directive({
  selector: '[stepNext]'
})
export class StepNextDirective implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef,
              private change: ChangeDetectorRef,
              private stepService: StepService,
              private button: TlButton) {
  }

  @HostListener('click')
  onClick() {
    if ( !this.stepService.isValidateForm() ) {
      this.stepService.next();
      return;
    }
    if (this.stepService.isFormValid()) {
      this.stepService.next();
    }
  }

  ngOnInit() {
    this.stepService.onChange.subscribe(() => {
      this.elementRef.nativeElement.hidden = this.stepService.isLastStep();
    });
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

}
