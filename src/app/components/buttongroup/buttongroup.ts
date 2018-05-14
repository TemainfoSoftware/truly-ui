/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  Component, ContentChildren, QueryList, ViewChild, ElementRef, AfterContentInit, Input, Output, EventEmitter,
  AfterViewInit, ChangeDetectorRef, Renderer2
} from '@angular/core';

import { TlButtonGroupItem } from './buttongroup-item';
import { ButtonGroupService } from './buttongroup.service';

@Component( {
    selector: 'tl-button-group',
    templateUrl: './buttongroup.html',
    styleUrls: [ './buttongroup.scss' ],
    providers: [ ButtonGroupService ]
} )
export class TlButtonGroup implements AfterContentInit, AfterViewInit {

    @Input() multiSelect = false;

    @Input() index: number;

    @Input() height = '25px';

    @Output( 'itemSelect' ) itemSelect: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) list: ElementRef;

    @ContentChildren( TlButtonGroupItem ) buttonGroupItem: QueryList<TlButtonGroupItem>;

    private itemsSelected: Array<any> = [];

    private item;

    constructor( private buttonGroupService: ButtonGroupService, private cd: ChangeDetectorRef, private renderer: Renderer2 ) {
    }

    ngAfterContentInit() {
      this.createItemList();
      this.cd.detectChanges();
    }

    ngAfterViewInit() {
      this.setPositions();
      this.removeBorders();
      this.cd.detectChanges();
    }

    createItemList() {
        this.setItems();
        this.isMultiSelectMode() ? this.initializeMultiSelectMode() : this.initializeSingleSelectedMode();
    }

    setPositions() {
      this.buttonGroupItem.forEach((item, index2, array) => {
        item._element.nativeElement.style.position = 'absolute';
        if (index2 >= 1) {
          item._element.nativeElement.style.left =
            array[index2 - 1]._element.nativeElement.offsetLeft + parseInt(array[index2 - 1].width, 10) + 'px';
        }
      });
    }

    removeBorders() {
      this.buttonGroupItem.forEach( ( item, index2, array ) => {
        if (index2 !== array.length - 1) {
          item._element.nativeElement.firstChild.firstChild.style.borderRight = '0';
        }
      } );
    }

    initializeMultiSelectMode() {
        this.handleMultiSelectMode();
    }

    initializeSingleSelectedMode() {
        this.itemsSelected = this.buttonGroupItem.toArray().filter( ( item ) => {
            return item.buttonSelected ? item : '';
        } );
        this.emitEventItem( this.itemsSelected );
        this.hasMoreThanOnePreselectedItem();
    }

    onClickItemList(event) {
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
        this.item.buttonSelected = false;
    }

    setItems() {
        this.buttonGroupItem.toArray().forEach( ( item, index, array ) => {
            item.index = index;
            item.height = parseInt(this.height, 10) + 'px';
            this.renderer.appendChild(this.list.nativeElement, item._element.nativeElement );
            this.cd.markForCheck();
        } );
    }

    emitEventItem( item ) {
        this.itemSelect.emit( item );
    }

}
