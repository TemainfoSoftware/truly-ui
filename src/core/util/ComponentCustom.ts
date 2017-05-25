/**
 * Created by William on 24/05/2017.
 */
import { ComponentIDGenerator } from './ComponentIDGenerator';
import { ElementRef } from "@angular/core";

export class ComponentCustom {
    private _generator: ComponentIDGenerator;
    public element: ElementRef;
    public nextTabIndex: number;
    public previousTabIndex: number;

    public constructor() {
    }

    set generator(value: ComponentIDGenerator) {
        this._generator = value;
    }

    public setElement(value: ElementRef) {
        this.element = value;
        this._generator = new ComponentIDGenerator(value);
    }


    public setNextTabIndex(value: number){
        this.nextTabIndex = value;
    }

    public setPreviousTabIndex(value: number) {
        this.previousTabIndex = value;
    }


}