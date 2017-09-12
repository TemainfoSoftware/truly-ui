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

  public simpleData: any[];

  public data: any[];

  public complexData: any[];

  private result: any;

  private result2: any;

  private result3: any;

  private result4: any;

  private result5: any;

  private result6: any;

  private result7: any;

  private result8: any;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.simpleData = [ 'Asia', 'Africa', 'Antarctica', 'Australia', 'Europe', 'North America', 'South America' ];
    this.data = [
      { id: '1', label : 'Asia', value : '10' },
      { id: '2', label : 'Africa', value : '20' },
      { id: '3', label : 'Antarctica', value : '30' },
      { id: '4', label : 'Australia', value : '40' },
      { id: '5', label : 'Europe', value : '50' },
      { id: '6', label : 'North America', value : '60' },
      { id: '7', label : 'South America', value : '70' }
    ];
    this.complexData = [
      { resource: { id: '1', label : 'Asia', value : '10' } },
      { resource: { id: '2', label : 'Africa', value : '20' } },
      { resource: { id: '3', label : 'Antarctica', value : '30' } },
      { resource: { id: '4', label : 'Australia', value : '40' } },
      { resource: { id: '5', label : 'Europe', value : '50' } },
      { resource: { id: '6', label : 'North America', value : '60' } },
      { resource: { id: '7', label : 'South America', value : '70' } },
      { resource: { id: '8', label : 'Asia 2', value : '80' } },
      { resource: { id: '9', label : 'Africa 2', value : '90' } },
      { resource: { id: '10', label : 'Antarctica 2', value : '100' } },
      { resource: { id: '11', label : 'Australia 2', value : '110' } },
      { resource: { id: '12', label : 'Europe 2', value : '120' } },
      { resource: { id: '13', label : 'North America 2', value : '130'} },
      { resource: { id: '14', label : 'South America 2', value : '140' } },
      { resource: { id: '15', label : 'South America', value : '150' } }
    ];
  }

}
