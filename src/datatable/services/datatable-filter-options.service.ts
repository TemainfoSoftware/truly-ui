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

import { Injectable } from '@angular/core';

@Injectable()
export class FilterOptionsService {

    getOptionsByType(type): Array<any>{
      return  [
          { description : 'Start With', valueItem : 'startsWith', icon: 'dx-icon-filter-operation-starts-with' },
          { description : 'Contains', valueItem : 'contains', icon: 'dx-icon-filter-operation-contains' },
          { description : 'Does not Contains', valueItem : 'notContains', icon: 'dx-icon-filter-operation-not-contains' },
          { description : 'Ends Withs', valueItem : 'endsWith', icon: 'dx-icon-filter-operation-ends-with' },
          { description : 'Equals', valueItem : 'equals', icon: 'dx-icon-filter-operation-equals' },
          { description : 'Not Equals', valueItem : 'notEquals', icon: 'dx-icon-filter-operation-not-equals' },
          { description : 'Less Than', valueItem : 'lessThan', icon: 'dx-icon-filter-operation-less' },
          { description : 'Greater Than', valueItem : 'greaterThan', icon: 'dx-icon-filter-operation-greater' },
          { description : 'Less Than or equal to', valueItem : 'lessThanOrEqual', icon: 'dx-icon-filter-operation-less-equal' },
          { description : 'Greater Than or equal to', valueItem : 'greaterThanOrEqual', icon: 'dx-icon-filter-operation-greater-equal' },
      ]
    }
}