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

 import { Injectable, Injector } from '@angular/core';
 import { TlDatatable } from '../datatable';
 import { TlDatatableDataSource } from './datatable-datasource.service';

 @Injectable()
 export class TlDatatableFilterService {

     private filtredData: any[];

     private datatable: TlDatatable;

     constructor( public dataSourceService: TlDatatableDataSource, injectable: Injector  ) {
        setTimeout(() => {
          this.datatable = injectable.get(TlDatatable)
        })
     }

     public filter( dataToFilter: any ) {
         this.filtredData = [];

         if ( !dataToFilter ) {
             this.dataSourceService.updateDataSource( this.datatable.data );
             return ;
         }

         ( this.datatable.data as Array<any> ).filter( ( row ) => {
             this.datatable.columns.forEach( (columnValue ) => {
                 if ( this.isValidMatch( String(dataToFilter), String(row[columnValue.field]) ) ) {
                     this.filtredData.push(row);
                 }
             });
         });

         this.dataSourceService.updateDataSource( this.filtredData );
    }



     matchWith(searchValue, valueMatch) {
         if (this.datatable.globalFilterOptions) {
             switch (this.datatable.globalFilterOptions.mode) {
                 case 'startsWith' : return (valueMatch).startsWith(searchValue);
                 case 'endsWith' : return String(valueMatch).endsWith(searchValue);
                 case 'contains' : return String(valueMatch).includes(searchValue);
                 default: return String(valueMatch).includes(searchValue);
             }
         }
         return String(valueMatch).includes(searchValue);
     }


     private isValidMatch( searchValue: string, valueMatch: string ) {
         if ( this.datatable.globalFilterOptions ) {
             if (!this.datatable.globalFilterOptions.caseSensitive )  {
                 valueMatch = valueMatch.toLowerCase();
                 searchValue = searchValue.toLowerCase();
             }
         }
         return this.matchWith( searchValue, valueMatch );
     }
 }
