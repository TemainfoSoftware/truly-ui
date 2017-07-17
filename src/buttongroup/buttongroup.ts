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

    @ViewChild( 'lista' ) lista: ElementRef;

    @ContentChildren( TlButtonGroupItem ) buttonGroupItem: QueryList<TlButtonGroupItem>;

    private itemsSelected: Array<any> = [];

    constructor( private buttonGroupService: ButtonGroupService ) {
    }

    ngAfterContentInit() {
        this.createItems();
    }

    createItems() {
        this.setInitialItems();
        this.isMultiSelectMode() ? this.initializeMultiSelectMode() : this.initializeSingleMode();
    }

    initializeMultiSelectMode() {
        this.handleMultiSelectMode();
    }

    initializeSingleMode() {
        this.getItemsSelectedOnInit();
        this.selectLastButton();
    }

    selectLastButton() {
        if ( !( this.itemsSelected.length > 1) ) {
            return this.emitItems( this.itemsSelected );
        }

        const emitSelectedItems = this.itemsSelected.splice( this.itemsSelected.length - 1, 1 );
        this.itemsSelected.forEach( ( itemValue ) => {
            itemValue.buttonSelected = false;
        } );

        this.emitItems( emitSelectedItems );
    }

    getItemsSelectedOnInit() {
        this.itemsSelected = this.buttonGroupItem.toArray().filter( ( item ) => {
            if ( item.buttonSelected ) {
                return item;
            }
        } );
    }

    onClickItem( event ) {
        this.isMultiSelectMode() ? this.handleMultiSelectMode() : this.handleSingleSelectMode();
    }

    setInitialItems() {
        this.buttonGroupItem.toArray().forEach( ( item, index ) => {
            item.index = index;
            this.lista.nativeElement.appendChild( item._element.nativeElement );
        } );
    }


    handleSingleSelectMode() {
        this.itemsSelected = this.buttonGroupItem.toArray().filter( ( item ) => {
            const previousIndex = this.itemsSelected.length ? this.itemsSelected[ 0 ].index : -1;
            const buttonSelected = (item.index === this.buttonGroupService.getIndexSelected());
            if ( (buttonSelected ) && ( item.index !== previousIndex ) ) {
                item.buttonSelected = true;
                return item;
            } else {
                item.buttonSelected = false;
            }
        } );
        this.emitItems( this.itemsSelected );
    }

    handleMultiSelectMode() {
        this.itemsSelected = this.buttonGroupItem.toArray().filter( ( itemValue ) => {
            return itemValue.buttonSelected === true;
        } );
        this.emitItems( this.itemsSelected );
    }

    emitItems( items ) {
        this.itemSelect.emit( items );
    }

    isMultiSelectMode() {
        return this.multiSelect;
    }

}
