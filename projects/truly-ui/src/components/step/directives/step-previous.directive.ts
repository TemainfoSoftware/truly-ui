import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {StepService} from '../services/step.service';

@Directive({
  selector: '[stepPrevious]'
})
export class StepPreviousDirective implements OnInit {

  constructor( private elementRef: ElementRef, private stepService: StepService ) {
  }

  @HostListener('click')
  onClick() {
    this.stepService.previous();
  }

  ngOnInit() {
    this.elementRef.nativeElement.hidden = this.stepService.isFirstStep();
    this.stepService.onChange.subscribe(() => {
      this.elementRef.nativeElement.hidden = this.stepService.isFirstStep();
    });
  }

}
