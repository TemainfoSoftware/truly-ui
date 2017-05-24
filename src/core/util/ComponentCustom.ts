/**
 * Created by William on 24/05/2017.
 */
import { ComponentIDGenerator } from './ComponentIDGenerator';
import { ElementRef } from "@angular/core";

export class ComponentCustom {
    private _generator: ComponentIDGenerator;

    public constructor() {
    }

    set generator(value: ComponentIDGenerator) {
        this._generator = value;
    }

    public setElement(value: ElementRef) {
        this._generator = new ComponentIDGenerator(value);
    }
}