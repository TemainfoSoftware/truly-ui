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
    Component, ContentChildren, Input, QueryList, AfterContentInit,
    Renderer2, ViewChild, ElementRef, HostListener
    } from '@angular/core';

import { TlSplitButtonAction } from './splitbutton-action';
import { animate, style, transition, trigger } from '@angular/animations';

let globalZindex = 1;

@Component( {
    selector : 'tl-split-button',
    templateUrl : './splitbutton.html',
    styleUrls : [ './splitbutton.scss' ],
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
export class TlSplitButton implements AfterContentInit {

    @Input() text = '';

    @Input() type = 'button';

    @Input() size;

    @Input() disabled: boolean = null;

    @Input() toggle: boolean;

    @Input() toggleClass;

    @Input() buttonClass;

    @Input() iconAddonBefore = '';

    @Input() buttonAddonBeforeClass;

    @Input() iconAddonAfter = '';

    @Input() buttonAddonAfterClass;

    @Input() iconLeftTextButton = '';

    @Input() iconRightTextButton = '';

    @Input() splitButtonClass;

    @Input() actionMenuClass;

    @ViewChild( 'lista' ) lista: ElementRef;

    @ContentChildren( TlSplitButtonAction ) splitButtonActions: QueryList<TlSplitButtonAction>;

    public zIndex = 0;

    private showHide: boolean;

    constructor( private _renderer: Renderer2 ) {
        this.showHide = false;
        this.toggle = false;
    }

    @HostListener( 'click', [ '$event' ] )
    onClickListener( $event ) {
        $event.stopPropagation();
        this.showHide = false;
    }

    ngAfterContentInit() {
        this._renderer.listen( document, 'click', ( event ) => {
            if ( !(event.target.className === 'split-button-actions ativo') && !(event.target.localName === 'i') ) {
                this.showHide = false;
            }
        } );
    }

    changeShowStatus() {
        this.showHide = !this.showHide;
        if ( this.showHide ) {
            setTimeout( () => {
                this.getAndSetZIndex();
                this.createActionItem();
            }, 0 );
        }
    }

    createActionItem() {
        for ( let i = 0; i < this.splitButtonActions.toArray().length; i++ ) {
            this.lista.nativeElement.appendChild( this.splitButtonActions.toArray()[i].element.nativeElement );
        }
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

}
