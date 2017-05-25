import { ElementRef } from '@angular/core';
import { UniqueIDGenerator } from '../helper/uniqueid-generator';
import { UniqueNameGenerator } from '../helper/uniquename-generator';

export class ComponentCustom {
    public element : ElementRef;
    public nextTabIndex : number;
    public previousTabIndex : number;

    private _generatorID : UniqueIDGenerator;
    private _generatorName : UniqueNameGenerator;

    constructor() { }

    set generator( value : UniqueIDGenerator ) {
        this._generatorID = value;
    }

    set generatorName(value: UniqueNameGenerator) {
        this._generatorName = value;
    }

    public setElement(value : ElementRef, name) {
        this.element = value;
        this._generatorID = new UniqueIDGenerator( value, name );
        this._generatorName = new UniqueNameGenerator ( value, name );
    }


    public setNextTabIndex( value : number ) {
        this.nextTabIndex = value;
    }

    public setPreviousTabIndex( value : number ) {
        this.previousTabIndex = value;
    }
}
