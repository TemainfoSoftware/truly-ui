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
    AfterViewInit,
    Component, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild
} from '@angular/core';

import { style, transition, trigger, animate } from '@angular/animations';

import { ComponentDefaultBase } from '../core/base/component-default.base';
import { KeyEvent } from '../core/enums/key-events';
import { DataMetadata } from '../core/types/datametadata';

let globalZindex = 1;

@Component( {
    selector : 'tl-drop-down-list',
    templateUrl : './dropdownlist.html',
    styleUrls : [ './dropdownlist.scss' ],
    animations : [
        trigger(
            'enterAnimation', [
                transition( ':enter', [
                    style( { opacity : 0, transform : 'translate(0%,-5%)', flex : '0' } ),
                    animate( '200ms', style( { opacity : 1, transform : 'translate(0%,0%)' } ) )
                ] ),
                transition( ':leave', [
                    style( { opacity : 1, transform : 'translate(0%,0%)' } ),
                    animate( '200ms', style( { opacity : 0, transform : 'translate(0%,-5%)' } ) )
                ] )
            ]
        )
    ]
} )
export class TlDropDownList extends ComponentDefaultBase implements AfterViewInit, OnInit {

    @Input( 'data' ) data: DataMetadata | Array<any>;

    @Input( 'placeholder' ) placeholder: string;

    @Output( 'itemSelect' ) itemSelect: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) list;

    public zIndex = 0;

    private showHide: boolean;

    private children = 0;

    private itemSelected: any[];

    private datasource: any[];

    constructor( private _renderer: Renderer2 ) {
        super();
        this.showHide = false;
    }

    ngOnInit() {
        this.updateDataSource( this.getData() );
    }

    ngAfterViewInit() {
        this._renderer.listen( document, 'click', ( event ) => {
            if ( !(event.target.className === 'tl-drop-down-list-box') ) {
                this.showHide = false;
            }
        } );
    }

    @HostListener( 'click', [ '$event' ] )
    onClickListener( $event ) {
        $event.stopPropagation();
        this.showHide = false;
    }

    updateDataSource( data ) {
        this.datasource = data;
    }

    onKeyDownList( $event ) {
        $event.preventDefault();
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN:
                this.arrowDown();
                break;
            case KeyEvent.ARROWUP:
                this.arrowUp();
                break;
            case KeyEvent.ENTER:
                this.onChangeItem();
                this.showHide = false;
                break;
            case KeyEvent.ESCAPE:
                this.onChangeItem();
                this.showHide = false;
                break;
        }
    }

    onChangeItem() {
        this.datasource.forEach( ( value, index, array ) => {
            if ( value.textItem === document.activeElement.innerHTML ) {
                this.placeholder = '';
                this.itemSelected = value;
                this.itemSelect.emit( this.itemSelected );
            }
        } );
    }

    arrowDown() {
        if ( this.children < this.list.nativeElement.children.length - 1 ) {
            this.list.nativeElement.children[ this.children + 1 ].focus();
            this.children = this.children + 1;
            this.onChangeItem();
        }
    }

    arrowUp() {
        if ( this.children !== 0 && this.children !== -1 ) {
            this.list.nativeElement.children[ this.children - 1 ].focus();
            this.children = this.children - 1;
            this.onChangeItem();
        }
    }

    changeShowStatus() {
        this.showHide = !this.showHide;
        if ( this.showHide ) {
            setTimeout( () => {
                this.getAndSetZIndex();
                this.list.nativeElement.children[ this.children ].focus();
            }, 0 );
        }
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

    selectOption( item ) {
        this.itemSelected = item;
        this.placeholder = '';
        this.itemSelect.emit( this.itemSelected );
    }

    getData() {
        if ( ( typeof this.data === 'object') && ( this.data[ 0 ] === undefined ) ) {
            return ( this.data as DataMetadata ).data;
        }
        return this.data;
    }

}
