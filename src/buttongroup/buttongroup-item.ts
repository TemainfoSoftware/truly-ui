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
import { AfterContentInit, AfterViewInit, Component, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { TlButton } from '../button/button';
import { ModalService } from '../modal/modal.service';

@Component( {
    selector : 'tl-button-group-item',
    templateUrl : './buttongroup-item.html',
    styleUrls : [ './buttongroup-item.scss' ],
    providers: [{provide: TlButton, useExisting: forwardRef(() => TlButtonGroupItem) }]
} )
export class TlButtonGroupItem  implements AfterContentInit{

    @Input() itemSelected: boolean;

    @Input() type = 'button';

    @Input() text = '';

    @Input() iconAddonBefore = '';

    @Input() buttonAddonBeforeClass;

    @Input() iconAddonAfter = '';

    @Input() buttonAddonAfterClass;

    @Input() size;

    @Input() iconLeftTextButton = '';

    @Input() iconRightTextButton = '';

    @Input() disabled: boolean = null;

    @Input() toggle: boolean;

    @Input() toggleClass: string = '';

    @Input() buttonClass = '';

    @Input() private _buttonSelected = false;
    set buttonSelected( value: boolean ) {
        this._buttonSelected = !value;
    }
    get buttonSelected () {
        return this._buttonSelected
    }

    public index = -1;

    constructor( public element: ElementRef) {}

    ngAfterContentInit() {
       setTimeout(()=>{
           this.buttonSelected = this.index === 0;
       })
    }

    @HostListener( 'click', [ '$event' ] )
    onClickListener( $event ) {
        console.log($event);
    }

}
