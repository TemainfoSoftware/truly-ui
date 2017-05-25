import { ElementRef } from '@angular/core';

let nextUniqueIndex = 0;

export class TabIndexGenerator {

    constructor(element : ElementRef) {
        element.nativeElement.tabIndex = nextUniqueIndex++;
    }
}
