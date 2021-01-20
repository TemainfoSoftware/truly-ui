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
import {Component} from '@angular/core';

import * as json from './thumbnaildemo-dataproperties.json';
import * as jsonEvts from './thumbnaildemo.dataevents.json';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnaildemo.component.html',
  styleUrls: ['./thumbnaildemo.component.scss'],
})
export class ThumbnailDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public files = [
    {
      index: 0,
      description: 'Image 1',
      file: 'https://static.matomo.org/wp-content/uploads/2019/02/healthcare-analytics-image.png',
      type: 'image/jpeg'
    },
    {
      index: 1,
      description: 'PDF 1',
      file: 'https://cdn.medicsolution.app/prontuario/anexos/09794f95-4baf-4726-ab7b-dd62369d1cf6',
      type: 'application/pdf'
    }
  ];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }
}

