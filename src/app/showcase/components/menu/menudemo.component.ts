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

import * as json from './menudemo-dataproperties.json';
import * as jsonEvts from './menudemo.dataevents.json';

@Component( {
  selector : 'app-menu',
  templateUrl : './menudemo.component.html',
  styleUrls : [ './menudemo.component.scss' ]
} )
export class MenuDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public menuItems = [];

  public menuItems2 = [];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;

    this.menuItems2 = [
      {
        label: 'The Target 1',
        icon: '',
        callBack: ($event) => {
          console.log('$event', $event);
        }
      },
      {
        label: 'The Item 2',
        icon: '',
      },
    ];

    this.menuItems = [
      {
        label: 'The Target 1',
        icon: '',
        callBack: ($event) => {
          console.log('$event', $event);
        }
      },
      {
        label: 'The Item 2',
        icon: '',
      },
      {
        label: 'The Menu Item 3',
        icon: '',
        subMenu: [
          {
            label: 'The Item 2',
            icon: '',
          },
          {
            label: 'The Item 2',
            icon: '',
          },
        ]
      },
      {
        label: 'The Context Menu Item 4',
        icon: '',
      },
      {
        label: 'The Target 1 Item 5',
        icon: '',
      },
    ];

  }

}

