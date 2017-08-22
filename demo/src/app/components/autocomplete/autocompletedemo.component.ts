/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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

import * as json from './autocompletedemo-dataproperties.json';

@Component( {
  selector : 'app-autocomplete',
  templateUrl : './autocompletedemo.component.html',
  styleUrls : [ './autocompletedemo.component.scss' ]
} )
export class AutoCompleteDemo {

  private dataTableProperties;

  private result: any;

  private result2: any;

  private result3: any;

  public data: any[];
  public data2: any[];

  public bigData: any[];

  public simpleData: any[];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.data = [
      { idItem: 'Animal', textItem : 'Animal', valueItem : '1' },
      { idItem: '21', textItem : 'Animal2', valueItem : '2' },
      { idItem: '31', textItem : 'Animal3', valueItem : '3' },
      { idItem: '41', textItem : 'Casa', valueItem : '4' },
      { idItem: '51', textItem : 'Casa2', valueItem : '5' },
      { idItem: '54', textItem : 'Casa3', valueItem : '6' },
      { idItem: '53', textItem : 'Her', valueItem : '7' },
      { idItem: '52', textItem : 'Fer', valueItem : '8' }
    ];
    this.bigData = [
      { idItem: '1', textItem : 'Item 1', valueItem : '1' },
      { idItem: '2', textItem : 'Item 2', valueItem : '2' },
      { idItem: '3', textItem : 'Item 3', valueItem : '3' },
      { idItem: '4', textItem : 'Item 4', valueItem : '4' },
      { idItem: '5', textItem : 'Item 5', valueItem : '5' },
      { idItem: '6', textItem : 'Item 6', valueItem : '6' },
      { idItem: '7', textItem : 'Item 7', valueItem : '7' },
      { idItem: '8', textItem : 'Item 8', valueItem : '8' },
      { idItem: '9', textItem : 'Item 9', valueItem : '9' },
      { idItem: '10', textItem : 'Item 10', valueItem : '10' },
      { idItem: '11', textItem : 'Item 11', valueItem : '11' },
      { idItem: '12', textItem : 'Item 12', valueItem : '12' },
      { idItem: '13', textItem : 'Item 13', valueItem : '13' },
      { idItem: '14', textItem : 'Item 14', valueItem : '14' },
      { idItem: '15', textItem : 'Item 15', valueItem : '15' },
      { idItem: '16', textItem : 'Item 16', valueItem : '16' }
    ];
    this.simpleData = [ 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5' ];
  }

}
