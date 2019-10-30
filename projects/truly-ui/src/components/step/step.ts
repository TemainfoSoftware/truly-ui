/*
    MIT License

    Copyright (c) 2018 Temainfo Software

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList} from '@angular/core';
import {StepService} from './services/step.service';
import {TlStepForm} from './parts/step-form/step-form';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tl-step',
  templateUrl: './step.html',
  styleUrls: ['./step.scss'],
  providers: [StepService]
})
export class TlStep implements OnInit, AfterContentInit, OnDestroy {

  @Input('initialStep')
  set initialStep(value: number) {
    if (value) {
      this.stepService.setCurrentStep(value);
    }
  }

  @ContentChildren(TlStepForm) steps: QueryList<TlStepForm>;

  @Output() finish = new EventEmitter();

  @Output() changeStep = new EventEmitter();

  public selected = 0;

  private subscription = new Subscription();

  get stepsArray() {
    return this.steps.toArray();
  }

  constructor(private stepService: StepService) {
  }

  ngOnInit() {
    this.onChange();
    this.onFinish();
  }

  ngAfterContentInit() {
    this.stepService.setSteps(this.steps.toArray());
    this.steps.first.selected = true;
    this.selected = this.steps.toArray().findIndex((item) => item.selected);
  }

  onChange() {
    this.subscription.add(this.stepService.onChange.subscribe((step: number) => {
      this.selected = step;
      this.closeAll();
      this.steps.toArray()[step].selected = true;
      this.changeStep.emit( step );
    }));
  }

  onFinish() {
    this.subscription.add(this.stepService.onFinish.subscribe((steps) => {
      this.finish.emit(steps);
    }));
  }

  closeAll() {
    this.steps.forEach((item) => item.selected = false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
