import { UniqueIDGenerator } from '../helper/uniqueid-generator';
import { ElementRef } from "@angular/core";

export class ComponentCustom {
    private _generator: UniqueIDGenerator;
    public element: ElementRef;
    public nextTabIndex: number;
    public previousTabIndex: number;

    constructor() { }

    set generator( value: UniqueIDGenerator ) {
        this._generator = value;
    }

    public setElement(value: ElementRef) {
        this.element = value;
        this._generator = new UniqueIDGenerator( value );
    }


    public setNextTabIndex( value: number ){
        this.nextTabIndex = value;
    }

    public setPreviousTabIndex( value: number ) {
        this.previousTabIndex = value;
    }


}