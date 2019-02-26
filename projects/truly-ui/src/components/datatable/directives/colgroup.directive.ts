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

import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TlDatatableColumn } from '../parts/column/datatable-column';

@Directive({
    selector: '[colgroup]'
})
export class TlColgroupDirective implements OnInit {

    @Input() colgroup: Array<TlDatatableColumn> = [];

    private colGroupElement: ElementRef;

    constructor( private element: ElementRef, private renderer: Renderer2 ) {}

    ngOnInit() {
        this.createElementColGroup();
        this.createElementsColForColGroup();
    }

    createElementColGroup() {
        this.colGroupElement = new ElementRef( this.renderer.createElement( 'colgroup' ) );
        this.renderer.appendChild( this.element.nativeElement, this.colGroupElement.nativeElement );
    }

    async createElementsColForColGroup() {
         await this.colgroup;
         this.colgroup.forEach( ( col ) => {
            const colElement = new ElementRef( this.renderer.createElement( 'col' ) );
            this.renderer.setStyle( colElement.nativeElement, 'width', col.width );
            this.renderer.appendChild( this.colGroupElement.nativeElement, colElement.nativeElement );
        });
    }
}
