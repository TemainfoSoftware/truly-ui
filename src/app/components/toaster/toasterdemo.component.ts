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
import { Component, ViewContainerRef } from '@angular/core';

import * as json from './toasterdemo-dataproperties.json';
import { ToasterService } from '../../../../projects/truly-ui/src/components/toaster/services/toaster.service';

@Component( {
  selector: 'app-toaster',
  templateUrl: './toasterdemo.component.html',
  styleUrls: [ './toasterdemo.component.scss' ]
} )
export class ToasterDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public position = 'top-right';

  public title = 'Title Default !';

  public message = 'My message default';

  public time = 3000;

  public width = 400;

  public height = 70;

  public progress = true;

  public showIcon = true;

  public data = [];

  constructor( private toasterService: ToasterService ) {
    this.dataTableProperties = json.dataProperties;

    this.data = [
      { textItem: 'Top Left', value: 'top-left' },
      { textItem: 'Top Center', value: 'top-center' },
      { textItem: 'Top Right', value: 'top-right' },
      { textItem: 'Bottom Left', value: 'bottom-left' },
      { textItem: 'Bottom Center', value: 'bottom-center' },
      { textItem: 'Bottom Right', value: 'bottom-right' },
    ];
  }

  success() {
    this.toasterService.success( this.getValues() );
  }

  information() {
    this.toasterService.information( this.getValues() );
  }

  danger() {
    this.toasterService.danger( this.getValues() );
  }

  warning() {
    this.toasterService.warning( this.getValues() );
  }

  getValues() {
    return {
      title: this.title,
      width: this.width + 'px',
      height: this.height + 'px',
      progress: this.progress,
      message: this.message,
      time: this.time,
      showIcon: this.showIcon,
      position: this.position
    };
  }

}

