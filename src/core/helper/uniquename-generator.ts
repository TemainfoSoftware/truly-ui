/**
 * Created by William on 25/05/2017.
 */
import { ElementRef } from '@angular/core';

/**
 * Variable number to increment every time.
 * @type {number}
 */
let nextUniqueName = 0;

/**
 * Class responsable to Generate Elements Name.
 */
export
    class UniqueNameGenerator {
    /**
     * @param element Element received when instantiate in CustomComponent.
     * @param name Name passed in Components where have been used.
     */
    constructor( element : ElementRef, name ) {
        if ( element.nativeElement.name === '' ) {
            element.nativeElement.name = 'tl-' + name + '-' + nextUniqueName++;
        }
    }
}
