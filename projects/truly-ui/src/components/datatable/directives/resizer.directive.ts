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

import { AfterContentInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { TlDatatable } from '../datatable';

@Directive({
    selector: '[resizer][datatable]'
})
export class TlResizerDirective implements AfterContentInit, OnDestroy {

    @Input() resizer: boolean;

    @Input() datatable: TlDatatable;

    private columnSeparator: HTMLElement;

    private tableHeaderRowElement: HTMLElement;

    private tableHeaderElement: HTMLElement;

    private headerColgroupCols;

    private bodyColgroupCols;

    private isMoving = false;

    private pointOfClick = 0;

    private columnLeftHeader: HTMLElement;

    private columnRightHeader: HTMLElement;

    private columnLeftBody: HTMLElement;

    private columnRightBody: HTMLElement;

    private colLeftWidth = 0;

    private colRightWidth = 0;

    private displacement = 0;

    private listenersList = [];

    private mouseMoveListener: () => void;

    private mouseupListener: () => void;

    constructor( private datatabeHeaderRef: ElementRef, private render: Renderer2 ) {}

    ngAfterContentInit() {
        if (this.resizer) {
            this.getElementColumnSeparator();
            this.getElementTableHeader();
            this.getElementTableHeaderRow();
            this.getColsOfColGroups();
        }
    }

    async getElementTableHeader() {
        await this.datatabeHeaderRef;
        this.tableHeaderElement = this.datatabeHeaderRef.nativeElement.getElementsByClassName('ui-datatable-table')[0];
    }

    async getElementTableHeaderRow() {
        await this.datatabeHeaderRef;
        this.tableHeaderRowElement = this.datatabeHeaderRef.nativeElement.getElementsByClassName('ui-row')[0];
        this.listenersList.push(
            this.render.listen(this.tableHeaderRowElement, 'mouseover', ( event ) => {
                this.onTableHeaderRowMouseOver(event);
            })
        );
    }

    async getColsOfColGroups() {
        await this.datatabeHeaderRef;
        this.headerColgroupCols = this.datatabeHeaderRef.nativeElement.parentElement.parentElement.getElementsByTagName('colgroup')[0];
        this.bodyColgroupCols = this.datatabeHeaderRef.nativeElement.parentElement.parentElement.getElementsByTagName('colgroup')[1];
    }

    async getElementColumnSeparator() {
        await this.datatabeHeaderRef;
        this.columnSeparator = this.datatabeHeaderRef.nativeElement.getElementsByClassName('ui-datatable-column-separator')[0] ;
        this.listenersList.push(
            this.render.listen(this.columnSeparator, 'mousedown', ( event ) => {
                this.onColumnSeparatorMouseDown(event);
            })
        );
    }

    onColumnResize(event: MouseEvent) {
        event.preventDefault();
        this.resizeColumns(event);
    }

    onColumnSeparatorMouseDown(event: MouseEvent) {
        this.startResize();
        this.pointOfClick = event.clientX;
        this.getColsBetweenSeparator();
    }

    onTableHeaderRowMouseOver(event) {
        if ( event.relatedTarget && ( event.relatedTarget.localName !== 'div' ) ) {
            const element = event.movementX >= 0 ? event.fromElement : event.target;
            this.moveSeparatorAtCursor(element);
        }
    }

    onColumnSeparatorMouseUp() {
        this.stopResize();
    }

    createHandlerEventListeners() {
        this.mouseMoveListener = this.render.listen(document, 'mousemove', ( event ) => {
            this.onColumnResize(event);
        });

        this.mouseupListener = this.render.listen(document, 'mouseup', ( ) => {
            this.onColumnSeparatorMouseUp();
        });
    }

    destroyHandleEventListeners() {
        if (this.mouseMoveListener || this.mouseupListener) {
            this.mouseMoveListener();
            this.mouseupListener();
        }
    }

    moveSeparatorAtCursor(element: HTMLElement) {
        this.columnSeparator.style.left = this.getPositionSeparetorFromElement(element) + 'px';
    }

    getPositionSeparetorFromElement(element) {
        return (
            ( element.offsetWidth + element.offsetLeft ) -
            ( Math.round( this.columnSeparator.offsetWidth / 2 ) ) -
            this.getHeaderWrapScrollLeft()
        );
    }

    getColsBetweenSeparator() {
        for ( let element = 0; element < this.tableHeaderRowElement.children.length; element++ ) {
            const columnElement: HTMLElement = this.tableHeaderRowElement.children[ element ] as HTMLElement;

            if ( this.itIsBetweenSeparator( columnElement ) ) {
                this.columnLeftHeader = this.headerColgroupCols.children[ element ] as HTMLElement;
                this.columnRightHeader = this.headerColgroupCols.children[ element + 1 ] as HTMLElement;

                this.columnLeftBody = this.bodyColgroupCols.children[ element ] as HTMLElement;
                this.columnRightBody = this.bodyColgroupCols.children[ element + 1 ] as HTMLElement;

                this.colLeftWidth = parseInt( this.columnLeftHeader.style.width, 10 );
                this.colRightWidth = parseInt( this.columnRightHeader.style.width, 10 );
                return;
            }
        }
    }

    itIsBetweenSeparator(column: HTMLElement) {
        return this.getPositionSeparetorFromElement(column) === this.columnSeparator.offsetLeft;
    }

    resizeColumns(event) {
        if ( this.isMoving ) {
            this.setDisplacement(event);
            this.isMovingToRight(event) ? this.resizeColumnsToRight() : this.resizeColumnsToLeft();
        }
    }

    resizeColumnsToRight() {
        const leftColumn = this.colLeftWidth + this.displacement;
        const rightColumn =  this.colRightWidth - this.displacement;
        this.setNewPositionsColumns(leftColumn, rightColumn);
    }

    resizeColumnsToLeft() {
        const leftColumn = this.colLeftWidth - this.displacement;
        const rightColumn = this.colRightWidth + this.displacement;
        this.setNewPositionsColumns(leftColumn, rightColumn);
    }

    setNewPositionsColumns(leftColumn, rightColumn) {
        if ( ( leftColumn > 40 ) && ( rightColumn > 40 )) {
                this.render.setStyle(this.columnLeftHeader, 'width', leftColumn + 'px');
                this.render.setStyle(this.columnRightHeader, 'width', rightColumn + 'px');
                this.render.setStyle(this.columnLeftBody, 'width', leftColumn + 'px');
                this.render.setStyle(this.columnRightBody, 'width', rightColumn + 'px');
        }
    }

    isMovingToRight(event) {
        return this.pointOfClick - event.clientX < 0;
    }

    setDisplacement(event) {
        this.displacement = this.pointOfClick - event.clientX;
        this.displacement = this.displacement < 0 ? this.displacement * -1 : this.displacement;
    }

    getHeaderWrapScrollLeft() {
       return this.datatabeHeaderRef.nativeElement.firstElementChild.scrollLeft;
    }

    startResize() {
        this.isMoving = true;
        this.createHandlerEventListeners();
        this.changeCursorResize();
    }

    stopResize() {
        this.isMoving = false;
        this.destroyHandleEventListeners();
        this.changeCursorResize();
    }

    changeCursorResize() {
        const cursor = this.isMoving ? 'col-resize' : 'default';
        this.render.setStyle(this.datatabeHeaderRef.nativeElement, 'cursor', cursor);
    }

    clearListerners() {
        if (this.listenersList) {
            this.listenersList.forEach((value) => {
                value();
            });
            this.listenersList = [];
        }
    }

    ngOnDestroy() {
        this.clearListerners();
    }

}
