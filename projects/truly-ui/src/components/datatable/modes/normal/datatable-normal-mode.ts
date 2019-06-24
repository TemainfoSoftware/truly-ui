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

 import { Component, ElementRef, forwardRef, Inject, ViewChild } from '@angular/core';
 import { TlDatatable } from '../../datatable';
 import { KeyEvent } from '../../../core/enums/key-events';
 import { TlDatatableDataSource } from '../../services/datatable-datasource.service';
 import { animate, state, style, transition, trigger } from '@angular/animations';
 import { DatatableHelpersService } from '../../services/datatable-helpers.service';

 @Component({
     selector: 'tl-datatable-normal-mode',
     templateUrl: './datatable-normal-mode.html',
     animations: [
         trigger('enterAnimation', [
             state('in', style({transform: 'translateY(0)', opacity: 1})),
             transition('void => *', [
                 style({transform: 'translateY(-10%)', opacity: 0}),
                 animate('180ms linear')
             ]),
             transition('* => void', [
                 animate('100ms linear')
             ]),

         ])
     ],
     providers: [DatatableHelpersService],
     styleUrls: ['../../datatable.scss', './datatable-normal-mode.scss']
 })
 export class TlDatatableNormalMode {

     @ViewChild( 'datatableTbody', {static: true}  ) datatableTbodyRef: ElementRef;

     constructor(  @Inject(forwardRef( () => TlDatatable ) ) public datatable: TlDatatable,
                   public dataSourceService: TlDatatableDataSource,
                   public helperService: DatatableHelpersService) {}

     onKeydown( $event ) {
         $event.preventDefault();
         switch ( $event.keyCode ) {
             case KeyEvent.ARROWDOWN: this.handleKeyArrowDown(); break;
             case KeyEvent.ARROWUP: this.handleKeyArrowUp(); break;
             case KeyEvent.HOME: this.handleKeyHome(); break;
             case KeyEvent.END: this.handleKeyEnd(); break;
         }
     }

     handleKeyArrowDown() {
         if ( this.isLastRow() )  {
             return ;
         }
         this.datatableTbodyRef.nativeElement.children[ this.datatable.tabindex + 1 ].focus();
         this.datatable.tabindex = this.datatable.tabindex + 1;
     }

     handleKeyArrowUp() {
         if ( this.isFirstRow() ) {
             return ;
         }
         this.datatableTbodyRef.nativeElement.children[ this.datatable.tabindex - 1 ].focus();
         this.datatable.tabindex = this.datatable.tabindex - 1;
     }

     handleKeyHome() {
         this.datatableTbodyRef.nativeElement.children[ 0 ].focus();
         this.datatable.tabindex = 0 ;
     }

     handleKeyEnd() {
         const lenghtChildren = this.datatableTbodyRef.nativeElement.children.length;
         this.datatableTbodyRef.nativeElement.children[ lenghtChildren - 1 ].focus();
         this.datatable.tabindex = lenghtChildren - 1 ;
     }

     isLastRow() {
         return this.datatable.tabindex + 1 > this.datatableTbodyRef.nativeElement.children.length - 1;
     }

     isFirstRow() {
         return this.datatable.tabindex === 0;
     }
 }
