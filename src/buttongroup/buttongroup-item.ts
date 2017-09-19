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
import { Component, ElementRef, HostListener, Input, AfterContentInit } from '@angular/core';

import { ButtonGroupService } from './buttongroup.service';

@Component( {
    selector: 'tl-button-group-item',
    templateUrl: './buttongroup-item.html',
    styleUrls: [ './buttongroup-item.scss' ]
} )
export class TlButtonGroupItem implements AfterContentInit {

    @Input() type;

    @Input() text;

    @Input() iconAddonBefore;

    @Input() buttonAddonBeforeClass;

    @Input() iconAddonAfter;

    @Input() buttonAddonAfterClass;

    @Input() width;

    @Input() disabled;

    @Input() toggleClass;

    @Input() buttonClass;

    @Input() checkedItem = null;

    public index = -1;

    @Input() public _buttonSelected = false;
    set buttonSelected( value: boolean ) {
        this._buttonSelected = value;
    }
    get buttonSelected () {
        return this._buttonSelected;
    }

    constructor( public _element: ElementRef, private buttonGroupService: ButtonGroupService ) {}

    ngAfterContentInit() {
        this.isPreselectedItem();
    }

    @HostListener( 'click', [ '$event' ] )
    onClickListener( $event ) {
        this.buttonGroupService.setIndexItemSelected(this.index);
    }

    onIsSelected($event) {
        this._buttonSelected = $event.selected;
    }

    isPreselectedItem() {
        this.buttonSelected = this.checkedItem === true;
    }

}
