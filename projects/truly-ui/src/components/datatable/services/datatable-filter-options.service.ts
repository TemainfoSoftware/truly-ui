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

import { Injectable } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DatatableI18nInterface } from '../../i18n/languages/datatable';

@Injectable()
export class FilterOptionsService {

  constructor( private i18n: I18nService ) {}

  optionDescription(): DatatableI18nInterface {
    return this.i18n.getLocale().Datatable;
  }

  getOptionsByType( type ): Array<any> {
    switch ( type ) {
      case 'text' :
        return this.getOptionsText();
      case 'number' :
        return this.getOptionsNumber();
      case 'date' :
        return this.getOptionsDate();
      default :
        return this.getOptionsDefault();
    }
  }

  getOptionsDefault() {
    return [ {
      description : this.optionDescription().filterOptionStartsWith,
      valueItem : 'startsWith',
      icon : 'dx-icon-filter-operation-starts-with'
    }, {
      description : this.optionDescription().filterOptionContains,
      valueItem : 'contains',
      icon : 'dx-icon-filter-operation-contains'
    }, {
      description : this.optionDescription().filterOptionNotContains,
      valueItem : 'notContains',
      icon : 'dx-icon-filter-operation-not-contains'
    }, {
      description : this.optionDescription().filterOptionEndsWith,
      valueItem : 'endsWith',
      icon : 'dx-icon-filter-operation-ends-with'
    }, {
      description : this.optionDescription().filterOptionEquals,
      valueItem : 'equals',
      icon : 'dx-icon-filter-operation-equals'
    }, {
      description : this.optionDescription().filterOptionNotEquals,
      valueItem : 'notEquals',
      icon : 'dx-icon-filter-operation-not-equals'
    }, {
      description : this.optionDescription().filterOptionLessThan,
      valueItem : 'lessThan',
      icon : 'dx-icon-filter-operation-less'
    }, {
      description : this.optionDescription().filterOptionGreaterThan,
      valueItem : 'greaterThan',
      icon : 'dx-icon-filter-operation-greater'
    }, {
      description : this.optionDescription().filterOptionLessThanOrEqual,
      valueItem : 'lessThanOrEqual',
      icon : 'dx-icon-filter-operation-less-equal'
    }, {
      description : this.optionDescription().filterOptionGreaterThanOrEqual,
      valueItem : 'greaterThanOrEqual',
      icon : 'dx-icon-filter-operation-greater-equal'
    } ];
  }


  getOptionsText() {
    return [ {
      description : this.optionDescription().filterOptionStartsWith,
      valueItem : 'startsWith',
      icon : 'dx-icon-filter-operation-starts-with'
    }, {
      description : this.optionDescription().filterOptionContains,
      valueItem : 'contains',
      icon : 'dx-icon-filter-operation-contains'
    }, {
      description : this.optionDescription().filterOptionNotContains,
      valueItem : 'notContains',
      icon : 'dx-icon-filter-operation-not-contains'
    }, {
      description : this.optionDescription().filterOptionEndsWith,
      valueItem : 'endsWith',
      icon : 'dx-icon-filter-operation-ends-with'
    }, {
      description : this.optionDescription().filterOptionEquals,
      valueItem : 'equals',
      icon : 'dx-icon-filter-operation-equals'
    }, {
      description : this.optionDescription().filterOptionNotEquals,
      valueItem : 'notEquals',
      icon : 'dx-icon-filter-operation-not-equals'
    } ];
  }

  getOptionsNumber() {
    return [ {
      description : this.optionDescription().filterOptionEquals,
      valueItem : 'equals',
      icon : 'dx-icon-filter-operation-equals'
    }, {
      description : this.optionDescription().filterOptionNotEquals,
      valueItem : 'notEquals',
      icon : 'dx-icon-filter-operation-not-equals'
    }, {
      description : this.optionDescription().filterOptionLessThan,
      valueItem : 'lessThan',
      icon : 'dx-icon-filter-operation-less'
    }, {
      description : this.optionDescription().filterOptionGreaterThan,
      valueItem : 'greaterThan',
      icon : 'dx-icon-filter-operation-greater'
    }, {
      description : this.optionDescription().filterOptionLessThanOrEqual,
      valueItem : 'lessThanOrEqual',
      icon : 'dx-icon-filter-operation-less-equal'
    }, {
      description : this.optionDescription().filterOptionGreaterThanOrEqual,
      valueItem : 'greaterThanOrEqual',
      icon : 'dx-icon-filter-operation-greater-equal'
    } ];
  }

  getOptionsDate() {
    return [ {
      description : this.optionDescription().filterOptionEquals,
      valueItem : 'equals',
      icon : 'dx-icon-filter-operation-equals'
    }, {
      description : this.optionDescription().filterOptionNotEquals,
      valueItem : 'notEquals',
      icon : 'dx-icon-filter-operation-not-equals'
    }, {
      description : this.optionDescription().filterOptionLessThan,
      valueItem : 'lessThan',
      icon : 'dx-icon-filter-operation-less'
    }, {
      description : this.optionDescription().filterOptionGreaterThan,
      valueItem : 'greaterThan',
      icon : 'dx-icon-filter-operation-greater'
    }, {
      description : this.optionDescription().filterOptionLessThanOrEqual,
      valueItem : 'lessThanOrEqual',
      icon : 'dx-icon-filter-operation-less-equal'
    }, {
      description : this.optionDescription().filterOptionGreaterThanOrEqual,
      valueItem : 'greaterThanOrEqual',
      icon : 'dx-icon-filter-operation-greater-equal'
    } ];
  }
}
