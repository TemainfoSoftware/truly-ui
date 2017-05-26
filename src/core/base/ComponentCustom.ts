import { ElementRef } from '@angular/core';
import { UniqueIDGenerator } from '../helper/uniqueid-generator';
import { UniqueNameGenerator } from '../helper/uniquename-generator';

/**
 * Class extended of others components, in charge of generate ID and TabIndex.
 */
export class ComponentCustom {
    /**
     * The element itself.
     */
    public element : ElementRef;

    /**
     * Variable to calculate what's the next tab index.
     */
    public nextTabIndex : number;

    /**
     * Variable to calculate what's the previous tab index.
     */
    public previousTabIndex : number;

    /**
     * Variable type of UniqueIDGenerator
     */
    private _generatorID : UniqueIDGenerator;

    /**
     * Variable type of UniqueNameGenerator;
     */
    private _generatorName : UniqueNameGenerator;

    /**
     * Function set generator of ID.
     * @param value
     */
    set generator( value : UniqueIDGenerator ) {
        this._generatorID = value;
    }

    /**
     * Function set generator of Name.
     * @param value
     */
    set generatorName( value : UniqueNameGenerator ) {
        this._generatorName = value;
    }

    /**
     * @param value The element received of the components.
     * @param name The name passed in the component.
     */
    public setElement( value : ElementRef, name ) {
        this.element = value;
        this._generatorID = new UniqueIDGenerator( value, name );
        this._generatorName = new UniqueNameGenerator ( value, name );
    }

    /**
     * Function that nextabIndex receive the value;
     * @param value
     */
    public setNextTabIndex( value : number ) {
        this.nextTabIndex = value;
    }

    /**
     * Function that previousTabIndx receive the value;
     * @param value
     */
    public setPreviousTabIndex( value : number ) {
        this.previousTabIndex = value;
    }
}
