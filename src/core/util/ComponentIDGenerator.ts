import {ElementRef} from "@angular/core";
/**
 * Created by William on 24/05/2017.
 */
let nextUniqueId = 0;

export class ComponentIDGenerator {

    constructor(element: ElementRef) {
        element.nativeElement.id = 'tl-' + element.nativeElement.localName + '-' + nextUniqueId++;
    }
}