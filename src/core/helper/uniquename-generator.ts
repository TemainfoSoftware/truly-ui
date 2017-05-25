/**
 * Created by William on 25/05/2017.
 */
import {ElementRef} from '@angular/core';

let nextUniqueName = 0;

export class UniqueNameGenerator {

    constructor(element: ElementRef, name) {
        element.nativeElement.name = 'tl-' + name + '-' + nextUniqueName++;
    }
}
