/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CoreService} from '../../../../projects/truly-ui/src/components/core/services/core.service';

import * as json from './buttondemo-dataproperties.json';
import * as jsonEvts from './buttondemo.dataevents.json';

@Component( {
  selector : 'app-button',
  templateUrl : './buttondemo.component.html',
  styleUrls : [ './buttondemo.component.scss' ],
} )
export class ButtonDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public isLoading = true;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  onClickButtonLoading() {
    this.isLoading = !this.isLoading;
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
}

