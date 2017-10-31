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

    getOptionsByType(type): Array<any> {
      return  [
          { description : 'Contains', valueItem : '1', icon: 'fa fa-arrows' },
          { description : 'Does not Contains', valueItem : '2', icon: 'fa fa-arrows-v' },
          { description : 'Ends Withs', valueItem : '3', icon: 'fa fa-bus' },
          { description : 'Equals', valueItem : '4', icon: 'fa fa-circle' },
          { description : 'Not Equals', valueItem : '5', icon: 'fa fa-external-link' }
      ]
    }
}
