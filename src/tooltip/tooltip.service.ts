/**
 * Created by William on 19/06/2017.
 */
import { ElementRef, EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class TooltipService {
    private _text = '';
    private _element: ElementRef;

    constructor() {
    }

    get text() : string {
        return this._text;
    }

    set text( value : string ) {
        this._text = value;
    }

    get element() : ElementRef {
        return this._element;
    }

    set element( value : ElementRef ) {
        this._element = value;
    }


   /* create( element, text ) {
        this._text = text;
        this.changeTooltip.emit( { 'element': element, 'text': this._text } );
    }

    destroy( element ) {
        this._text = '';
        this.changeTooltip.emit( { 'element': element, 'text': this._text } );
    }*/

}