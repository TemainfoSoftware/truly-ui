import {ElementRef} from '@angular/core';

let nextUniqueId = 0;

export class UniqueIDGenerator {

    constructor(element: ElementRef, name) {
        element.nativeElement.id = 'tl-' + name + '-' + nextUniqueId++;
    }
}
