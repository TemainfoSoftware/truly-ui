import {ElementRef} from "@angular/core";
/**
 * Created by William on 24/05/2017.
 */
let nexUniqueId = 0;

export class ComponentIDGenerator {

    constructor(element: ElementRef) {
        element.nativeElement.id = 'tl-' + element.nativeElement.localName + '-' + nexUniqueId++;
        console.log('gen', element);
    }
}