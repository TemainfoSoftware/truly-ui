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
import { Component } from '@angular/core';

import * as json from './stepdemo-dataproperties.json';
import * as jsonStepForm from './stepdemo-dataproperties2.json';
import * as jsonEvts from './stepdemo.dataevents.json';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component( {
selector : 'app-step',
templateUrl : './stepdemo.component.html',
styleUrls : [ './stepdemo.component.scss' ],
} )
export class StepDemoComponent {

  public currentStep = 0;

  public dataTableProperties;

  public dataTableProperties2;

  public dataEvents;

  public formOne = new UntypedFormGroup({
    user: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)
  });

  public formTwo = new UntypedFormGroup({
    address: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required)
  });

  public formTree = new UntypedFormGroup({
    card: new UntypedFormControl(''),
    value: new UntypedFormControl('$ 100'),
    remember: new UntypedFormControl(false)
  });


  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableProperties2 = jsonStepForm.dataPropertiesStepForm;
    this.dataEvents = jsonEvts.dataEvents;
  }

}

