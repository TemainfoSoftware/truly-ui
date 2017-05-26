import { ElementRef } from '@angular/core';

/**
 * Variable number to increment every time.
 * @type {number}
 */
let nextUniqueId = 0;

/**
 * Class responsable to Generate Elements ID.
 */
export class UniqueIDGenerator {
    /**
     * @param element Element received when instantiate in CustomComponent.
     * @param name Name passed in Components where have been used.
     */
    constructor( element : ElementRef, name ) {
        element.nativeElement.id = 'tl-' + name + '-' + nextUniqueId++;
    }
}
