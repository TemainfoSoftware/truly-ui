/**
 * Created by William on 24/05/2017.
 */
import { ElementRef } from '@angular/core';


let nextUniqueIndex = 0;

export class ComponentTabIndexGenerator {

    constructor(element: ElementRef) {
        element.nativeElement.tabIndex = nextUniqueIndex++;
    }
}