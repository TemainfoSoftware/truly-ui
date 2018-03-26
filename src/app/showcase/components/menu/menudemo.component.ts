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
  selector: 'app-menu',
  templateUrl: './menudemo.component.html',
  styleUrls: [ './menudemo.component.scss' ]
} )
export class MenuDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public dock = true;

  public menuItems = [];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;

    this.menuItems = [
      {
        label: 'Home',
        icon: 'ion-gear-a',
        callBack: ( $event ) => {
          console.log( '$event', $event );
        }
      },
      {
        label: 'Input',
        link: 'sidebar',
        icon: 'ion-heart',
      },
      {
        label: 'Button',
        icon: 'ion-document-text',
      },
      {
        label: 'Panels',
        icon: 'ion-gear-a',
      },
      {
        label: 'Pickers',
        icon: 'ion-heart',
        subItem: [
          {
            label: 'Button',
            icon: 'ion-document-text',
          },
          {
            label: 'Overlay',
            icon: 'ion-gear-a',
          },
          {
            label: 'Menu Item 3',
            icon: 'ion-gear-a',
            subItem: [
              {
                label: 'Menu Item 3',
                icon: 'ion-gear-a',
              },
              {
                label: 'Menu Item 3',
                icon: 'ion-gear-a',
              },
              {
                label: 'Menu Item 3',
                icon: 'ion-gear-a',
              },
            ]
          },

        ]
      },
      {
        label: 'Menu',
        icon: 'ion-document-text',
      },
      {
        label: 'Overlay',
        alwaysActive: true,
        icon: 'ion-navicon',
      },
    ];

  }

  toggle() {
    this.dock = !this.dock;
  }

}

