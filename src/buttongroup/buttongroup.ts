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
import { ButtonGroupService } from './buttongroup.service';

@Component( {
    selector : 'tl-button-group',
    templateUrl : './buttongroup.html',
    styleUrls : [ './buttongroup.scss' ],
    providers : [ ButtonGroupService ]
} )
export class TlButtonGroup implements AfterContentInit {

    @Input() multiSelect = false;

    @Input() index: number;

    @Output( 'itemSelect' ) itemSelect: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) list: ElementRef;

    @ContentChildren( TlButtonGroupItem ) buttonGroupItem: QueryList<TlButtonGroupItem>;

    private itemsSelected: Array<any> = [];

    private item;

    constructor( private buttonGroupService: ButtonGroupService ) {
    }

    ngAfterContentInit() {
        this.createItemList();
    }

    createItemList() {
        this.setItems();
        this.isMultiSelectMode() ? this.initializeMultiSelectMode() : this.initializeSingleSelecteMode();
    }

    initializeMultiSelectMode() {
        this.handleMultiSelectMode();
    }

    initializeSingleSelecteMode() {
        this.itemsSelected = this.buttonGroupItem.toArray().filter( ( item ) => {
            return item.buttonSelected ? item : '';
        } );
        this.emitEventItem( this.itemsSelected );
        this.hasMoreThanOnePreselectedItem();
    }

    onClickItemList() {
        this.isMultiSelectMode() ? this.handleMultiSelectMode() : this.handleSingleSelectMode();
    }

    hasMoreThanOnePreselectedItem() {
        if ( this.itemsSelected.length > 1) {
            throw new EvalError( 'Can not preselect more than one item when property multiselect is false.' );
        }
    }

    handleMultiSelectMode() {
        this.itemsSelected = this.buttonGroupItem.toArray().filter( ( item ) => {
            return item.buttonSelected === true;
        } );
        this.emitEventItem( this.itemsSelected );
    }

    handleSingleSelectMode() {
        this.itemsSelected = this.buttonGroupItem.toArray().filter( ( item ) => {
            this.item = item;
            this.isSelectedItem();
            return this.isItemClicked() ? this.setItemAsTrue() : this.setItemAsFalse();
        } );
        this.emitEventItem( this.itemsSelected );
    }

    isItemClicked() {
        return this.isSelectedItem() && this.item.index !== this.isPreviousIndex();
    }

    isMultiSelectMode() {
        return this.multiSelect;
    }

    isSelectedItem() {
        return (this.item.index === this.buttonGroupService.getIndexItemSelected());
    }

    isPreviousIndex() {
        return this.itemsSelected.length ? this.itemsSelected[ 0 ].index : -1;
    }

    setItemAsTrue() {
        this.item.buttonSelected = true;
        return this.item;
    }

    setItemAsFalse() {
        this.item.buttonSelected = false
    }

    setItems() {
        this.buttonGroupItem.toArray().forEach( ( item, index ) => {
            item.index = index;
            this.list.nativeElement.appendChild( item._element.nativeElement );
        } );
    }

    emitEventItem( item ) {
        this.itemSelect.emit( item );
    }

}
