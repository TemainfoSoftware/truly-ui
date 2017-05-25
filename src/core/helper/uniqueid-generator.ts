import {ElementRef} from '@angular/core';

let nextUniqueId = 0;

export class UniqueIDGenerator {

    constructor( element : ElementRef ) {
        element.nativeElement.id = 'tl-' + element.nativeElement.localName + '-' + nextUniqueId++;
    }
}
