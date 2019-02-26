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
import * as json from './sidebardemo-dataproperties.json';
import * as jsonContent from './sidebardemo-dataproperties-sidebar-content.json';
import * as jsonEvt from './sidebardemo-events.json';
import * as jsonMethods from './sidebardemo-methods.json';


import { DumpDataService } from '../../shared/services/dumpdata';

@Component( {
  selector: 'app-sidebar',
  templateUrl: './sidebardemo.component.html',
  styleUrls: [ './sidebardemo.component.scss' ],
} )
export class SidebarDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public dataTablePropertiesContent;

  public result;

  public openedDemo = false;

  public dataMethods;

  public dataSource = [];

  constructor( private dataDumpService: DumpDataService ) {
    this.dataTableProperties = json.dataProperties;
    this.dataTablePropertiesContent = jsonContent.dataProperties;
    this.dataMethods = jsonMethods.dataMethods;
    this.dataEvents = jsonEvt.events;
    this.dataSource = this.dataDumpService.createRandomData( 100 );

  }

  onClose() {
    console.log('Closed');
  }

  onOpen() {
    console.log('Opened');
  }

  changeOpened(param) {
    console.log('change', param);
  }

  toggle() {
    this.openedDemo = !this.openedDemo;
  }

}
