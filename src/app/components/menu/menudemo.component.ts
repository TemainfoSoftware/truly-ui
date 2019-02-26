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
        label: 'First Menu',
        icon: 'fa-cog',
      },
      {
        label: 'Second Menu',
        icon: 'fa-heart',
      },
      {
        label: 'Third Menu',
        icon: 'fa-file-invoice',
      },
      {
        label: 'Fourth Menu',
        icon: 'fa-archive',
      },
      {
        label: 'Fifth Menu',
        icon: 'fa-book',
      },
      {
        label: 'Sixth Menu',
        icon: 'fa-archive',
      },
      {
        label: 'Main Menu',
        icon: 'fa-bars',
        alwaysActive: true,
        subItem: [
          {
            label: 'Alabama',
            icon: 'fas fa-globe-americas',
            category: 'United States',
          },
          {
            label: 'Alaska',
            icon: 'fas fa-globe-americas',
            category: 'United States',
          },
          {
            label: 'Arizona',
            icon: 'fas fa-globe-americas',
            category: 'United States',
          },
          {
            label: 'Arkansas',
            icon: 'fas fa-globe-americas',
            category: 'United States',
          },
          {
            label: 'California',
            icon: 'fas fa-globe-americas',
            category: 'United States',
            subItem: [
              {
                label: 'Acton',
                icon: 'fas fa-globe-americas',
                category: 'United States',
              },
              {
                label: 'Adelanto',
                icon: 'fas fa-globe-americas',
                category: 'United States',
              },
              {
                label: 'Agoura Hills',
                icon: 'fas fa-globe-americas',
                category: 'United States',
                subItem: [
                  {
                    label: 'Agoura Hills',
                    icon: 'fas fa-globe-americas',
                    category: 'United States',
                  },
                ]
              },
              {
                label: 'Alameda',
                icon: 'fas fa-globe-americas',
                category: 'United States',
              },
              {
                label: 'Alamo',
                icon: 'fas fa-globe-americas',
                category: 'United States',
              },
              {
                label: 'Albany',
                icon: 'fas fa-globe-americas',
                category: 'United States',
              }
            ]
          },
          {
            label: 'Alsace',
            icon: 'fas fa-globe-americas',
            category: 'France',
          },
          {
            label: 'Aquitaine',
            icon: 'fas fa-globe-americas',
            category: 'France',
          },
          {
            label: 'Lorraine',
            icon: 'fas fa-globe-americas',
            category: 'France',
          },
          {
            label: 'New South Wales',
            icon: 'fas fa-globe-americas',
            category: 'Australia',
          },
          {
            label: 'Queensland',
            icon: 'fas fa-globe-americas',
            category: 'Australia',
          },
          {
            label: 'South Australia',
            icon: 'fas fa-globe-americas',
            category: 'Australia',
          },
        ]
      },
    ];
  }

  toggle() {
    this.dock = !this.dock;
  }

}

