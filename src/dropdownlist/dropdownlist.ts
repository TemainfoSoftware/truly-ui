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
    Component, EventEmitter, Input, Output, Renderer2, ViewChild
} from '@angular/core';

import { style, transition, trigger, animate } from '@angular/animations';

import { ComponentDefaultBase } from '../core/base/component-default.base';
import { KeyEvent } from '../core/enums/key-events';
import { DataMetadata } from '../core/types/datametadata';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

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
export class TlDropDownList extends ComponentDefaultBase implements AfterViewInit {

    @Input( 'data' ) data: DataMetadata | Array<any>;

    @Input( 'value' ) value: string;

    @Input( 'label' ) label: string;

    @Input( 'placeholder' ) placeholder = null;

    @Input( 'scroll' ) scroll: number;

    @Output( 'itemSelect' ) itemSelect: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) list;

    @ViewChild( 'dropbox' ) dropbox;

    public zIndex = 0;

    private showHide: boolean;

    private children = -1;

    private itemSelected: any[];

    private datasource: any[] = [];

    constructor( private _renderer: Renderer2, public idService: IdGeneratorService, public nameService: NameGeneratorService ) {
        super( idService, nameService );
        this.showHide = false;
    }

    ngAfterViewInit() {
        if ( this.placeholder && this.placeholder !== undefined ) {
            this.datasource[ 0 ] = { [this.label] : this.placeholder, [this.value] : '' };
            setTimeout( () => {
                this.itemSelected = this.datasource[ 0 ];
            }, 0 );
        }
        this.updateDataSource( this.getData() );
        this._renderer.listen( document, 'click', ( event ) => {
            this.showHide = false;
        } );
    }

    updateDataSource( data ) {
        data.forEach( ( value2, index, array ) => {
            this.datasource.push( value2 );
        } );
    }

    calcHeightItem() {
        if ( (!this.scroll) ) {
            if ( (this.datasource.length > 10) ) {
                return { 'height' : (10 * 39) + 'px', 'overflow-y' : 'scroll' };
            } else {
                return { 'height' : 'auto', 'overflow-y' : 'visible' };
            }
        } else {
            return { 'height' : (this.scroll * 39) + 'px', 'overflow-y' : 'scroll' };
        }
    }

    onKeyDownList( $event ) {
        $event.preventDefault();
        $event.stopPropagation();
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
                this.dropbox.nativeElement.focus();
                break;
            case KeyEvent.ESCAPE:
                this.onChangeItem();
                this.showHide = false;
                this.dropbox.nativeElement.focus();
                break;
        }
    }

    onChangeItem() {
        if ( !this.showHide ) {
            this.onShowHideFalse();
            return;
        }

        this.datasource.forEach( ( value, index, array ) => {
            if ( value[ this.label ] === document.activeElement.innerHTML.trim() ) {
                this.itemSelected = value;
                if ( this.itemSelected[ this.value ] !== null && this.itemSelected[ this.value ] !== '' ) {
                    this.itemSelect.emit( this.itemSelected );
                } else {
                    this.itemSelect.emit( '' );
                }
            }
        } );
    }

    onShowHideFalse() {
        if ( this.children === -1 ) {
            this.children = 0;
        }
        this.itemSelected = this.datasource[ this.children ];
        this.placeholder = '';
        if ( this.itemSelected[ this.value ] !== null && this.itemSelected[ this.value ] !== '' ) {
            this.itemSelect.emit( this.itemSelected );
        } else {
            this.itemSelect.emit( '' );
        }
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
                if ( this.children === -1 ) {
                    this.list.nativeElement.children[ 0 ].focus();
                } else {
                    this.list.nativeElement.children[ this.children ].focus();
                }
            }, 0 );
        }
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

    selectOption( item, index ) {
        this.itemSelected = item;
        this.children = index;
        if ( this.itemSelected[ this.value ] !== null && this.itemSelected[ this.value ] !== '' ) {
            this.itemSelect.emit( this.itemSelected );
        } else {
            this.itemSelect.emit( '' );
        }
        this.showHide = false;
        this.dropbox.nativeElement.focus();
    }

    getData() {
        if ( ( typeof this.data === 'object') && ( this.data[ 0 ] === undefined ) ) {
            return ( this.data as DataMetadata ).data;
        }
        return this.data;
    }

}
