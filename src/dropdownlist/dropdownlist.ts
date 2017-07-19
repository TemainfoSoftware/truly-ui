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
        Component, HostListener
} from '@angular/core';

import { style, transition, trigger, animate } from '@angular/animations';

import { ComponentDefaultBase } from '../core/base/component-default.base';

let globalZindex = 1;

@Component( {
    selector : 'tl-drop-down-list',
    templateUrl : './dropdownlist.html',
    styleUrls : [ './dropdownlist.scss' ],
    animations: [
        trigger(
            'enterAnimation', [
                transition( ':enter', [
                    style( { opacity: 0, transform: 'translate(0%,-5%)', flex: '0' } ),
                    animate( '200ms', style( { opacity: 1, transform: 'translate(0%,0%)' } ) )
                ] ),
                transition( ':leave', [
                    style( { opacity: 1, transform: 'translate(0%,0%)' } ),
                    animate( '200ms', style( { opacity: 0, transform: 'translate(0%,-5%)' } ) )
                ] )
            ]
        )
    ]
} )
export class TlDropDownList extends ComponentDefaultBase {

    public zIndex = 0;

    private showHide: boolean;

    private itemList: any[];

    constructor() {
        super();
        this.itemList = [
            {
                textItem: 'Item 1 a s 2 3 4 5 6 1 2 ',
                valueItem: '1'
            },
            {
                textItem: 'Item 2',
                valueItem: '2'
            },
            {
                textItem: 'Item 3',
                valueItem: '3'
            }
        ];
        this.showHide = false;
    }

    @HostListener( 'click', [ '$event' ] )
    onClickListener( $event ) {
        $event.stopPropagation();
        this.showHide = false;
    }

    changeShowStatus() {
        console.log(this.showHide);
        this.showHide = !this.showHide;
        if ( this.showHide ) {
            setTimeout( () => {
                this.getAndSetZIndex();
            }, 0 );
        }
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

}
