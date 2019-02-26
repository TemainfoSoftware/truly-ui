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

export class  TlDatatableFilterConstraints {

    startsWith(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return true;
        }

        if (this.isValueValid(value)) {
            return false;
        }

        const filterValue = filter.toLowerCase();
        return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
    }

    contains(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return true;
        }

        if (this.isValueValid(value)) {
            return false;
        }

        return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }

    notContains(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return true;
        }

        if (this.isValueValid(value)) {
            return false;
        }

        return value.toString().toLowerCase().indexOf(filter.toLowerCase()) === -1;
    }

    endsWith(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return true;
        }

        if (this.isValueValid(value)) {
            return false;
        }

        const filterValue = filter.toString().toLowerCase();
        return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
    }

    equals(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return true;
        }

        if (this.isValueValid(value)) {
            return false;
        }

        return value.toString().toLowerCase() === filter.toString().toLowerCase();
    }

    notEquals(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return false;
        }

        if (this.isValueValid(value)) {
            return true;
        }

        return value.toString().toLowerCase() !== filter.toString().toLowerCase();
    }

    lessThan(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return false;
        }

        if (this.isValueValid(value)) {
            return true;
        }

        return parseInt(value, 10) < parseInt(filter, 10);
    }

    greaterThan(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return false;
        }

        if (this.isValueValid(value)) {
            return true;
        }

        return parseInt(value, 10) > parseInt(filter, 10);
    }

    lessThanOrEqual(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return false;
        }

        if (this.isValueValid(value)) {
            return true;
        }

        return parseInt(value, 10) <= parseInt(filter, 10);
    }

    greaterThanOrEqual(value, filter): boolean {
        if ( this.isFilterValid(filter) ) {
            return false;
        }

        if (this.isValueValid(value)) {
            return true;
        }

        return parseInt(value, 10) >= parseInt(filter, 10);
    }

    in(value, filter: any[]): boolean {
        if (filter === undefined || filter === null || filter.length === 0) {
            return true;
        }

        if (this.isValueValid(value)) {
            return false;
        }

        for (let i = 0; i < filter.length; i++) {
            if (filter[i] === value) {
                return true;
            }
        }

        return false;
    }

    private isFilterValid(filter) {
        return filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '');
    }

    private isValueValid(value) {
       return value === undefined || value === null;
    }
}
