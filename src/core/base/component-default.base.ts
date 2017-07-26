/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import { ElementRef } from '@angular/core';
import { IdGeneratorService } from '../helper/idgenerator.service';
import { NameGeneratorService } from '../helper/namegenerator.service';

/**
 * Class extended of others components, in charge of generate ID and TabIndex.
 */
export class ComponentDefaultBase {
    /**
     * The element itself.
     */
    public element: ElementRef;

    /**
     * Variable to calculate what's the next tab index.
     */
    public nextTabIndex: number;

    /**
     * Variable to calculate what's the previous tab index.
     */
    public previousTabIndex: number;

    constructor(public idService: IdGeneratorService, public nameService: NameGeneratorService) {}

    /**
     * @param value The element received of the components.
     * @param name The name passed in the component.
     */
    public setElement( value: ElementRef, name ) {
        this.element = value;
        this.idService.createId( value, name );
        this.nameService.createName( value, name );
    }

    /**
     * Function that nextabIndex receive the value;
     * @param value
     */
    public setNextTabIndex( value: number ) {
        this.nextTabIndex = value;
    }

    /**
     * Function that previousTabIndx receive the value;
     * @param value
     */
    public setPreviousTabIndex( value: number ) {
        this.previousTabIndex = value;
    }
}
