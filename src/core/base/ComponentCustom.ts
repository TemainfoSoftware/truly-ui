import { ElementRef } from '@angular/core';
import { UniqueIDGenerator } from '../helper/uniqueid-generator';

export class ComponentCustom {
    public element : ElementRef;
    public nextTabIndex : number;
    public previousTabIndex : number;
    private _generator : UniqueIDGenerator;

    constructor() { }

    set generator( value : UniqueIDGenerator ) {
        this._generator = value;
    }

    public setElement(value : ElementRef) {
        this.element = value;
        this._generator = new UniqueIDGenerator( value );
    }


    public setNextTabIndex( value : number ) {
        this.nextTabIndex = value;
    }

    public setPreviousTabIndex( value : number ) {
        this.previousTabIndex = value;
    }
}
