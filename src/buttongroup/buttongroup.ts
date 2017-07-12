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
import {
    Component, ContentChildren, QueryList, ViewChild, ElementRef,
    AfterContentInit, Input, Output, EventEmitter
} from '@angular/core';

import { TlButtonGroupItem } from './buttongroup-item';

@Component( {
    selector : 'tl-button-group',
    templateUrl : './buttongroup.html',
    styleUrls : [ './buttongroup.scss' ]
} )
export class TlButtonGroup implements AfterContentInit {

    @Input() multiSelect = false;

    @Input() index: number;

    @Output( 'itemSelect' ) itemSelect: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'lista' ) lista: ElementRef;

    @ContentChildren( TlButtonGroupItem ) buttonGroupItem: QueryList<TlButtonGroupItem>;

    constructor() {}

    ngAfterContentInit() {
        this.createItem();
    }

    createItem() {
        this.buttonGroupItem.toArray().forEach( ( item, index ) => {
            item.index = index;
            this.lista.nativeElement.appendChild( item.element.nativeElement );
        } );
    }

    onClickItem(event) {
        if (this.multiSelect) {
            let itemsSelected;
            itemsSelected = this.buttonGroupItem.toArray().filter( ( itemValue ) => {
                return itemValue.itemSelected === true;
            } );
            this.itemSelect.emit( itemsSelected );
        } else {
            console.log();
            this.buttonGroupItem.toArray().forEach( ( item ) => {
                console.log(item.index, item.itemSelected);
            } );
            let itemSelected;
            itemSelected = this.buttonGroupItem.toArray().filter( ( item ) => {
                return item.itemSelected === true;
            } );
            this.itemSelect.emit( itemSelected );
        }
    }

}
