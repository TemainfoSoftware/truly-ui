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
import { ElementRef, Input } from '@angular/core';
import { IdGeneratorService } from '../helper/idgenerator.service';
import { NameGeneratorService } from '../helper/namegenerator.service';
import { TabIndexService } from '../../form/tabIndex.service';
import { KeyEvent } from '../enums/key-events';

/**
 * Class extended of others components, in charge of generate ID and TabIndex.
 */
export class ComponentDefaultBase {
    /**
     * Controller to define if the tabulation is with key Enter or key Tab.
     * @type {boolean}
     */
    @Input() enterAsTab = true;

    /**
     * The element itself.
     */
    public element: ElementRef;

    /**
     * TabIndex of Element;
     */
    public tabindex: number;


    constructor(public tabIndexService: TabIndexService, public idService: IdGeneratorService, public nameService: NameGeneratorService) {}

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
     * Function to set tabIndex of Elements received.
     * @param element
     */
    setTabIndex( element: ElementRef ) {
        setTimeout( () => {
            this.tabindex = this.tabIndexService.setTabIndex( element );
        }, 1 );
    }

    /**
     * Function that trigger a keyinput in element.
     * @param event
     */
    onKeyInput( event: KeyboardEvent ) {
        if ( this.enterAsTab ) {
            if (event.keyCode === KeyEvent.TAB && event.shiftKey) {
                event.preventDefault();
                this.previousFocus();
                return;
            }
            switch ( event.keyCode ) {
                case KeyEvent.ENTER:
                    this.nextFocus();
                    break;
                case KeyEvent.ARROWDOWN:
                    this.nextFocus();
                    break;
                case KeyEvent.ARROWUP:
                    this.previousFocus();
                    break;
                case KeyEvent.TAB:
                    event.preventDefault();
                    this.nextFocus();
                    break;
            }
        }
    }

    /**
     * Function to set focus on previous element
     */
    previousFocus() {
        const previousElement = this.getPreviousElementOnForm();
        if ( previousElement !== undefined ) {
            (previousElement as HTMLElement).focus();
        }
    }

    /**
     * Function to set focus on next element
     */
    nextFocus() {
        const nextElement = this.getNextElementOnForm();
        if ( nextElement !== undefined ) {
            (nextElement as HTMLElement).focus();
        }
    }

    getNextElementOnForm() {
        const form = document.querySelectorAll( 'tl-form' );
        for ( let child = 0; child < form.length; child++ ) {
            const doc = form[ child ].querySelectorAll( '*' );
            for ( let child2 = 0; child2 < doc.length; child2++ ) {
                if ( this.isNextTabIndex( doc, child2 ) ) {
                    return doc[ child2 ];
                }
            }
        }
    }

    getPreviousElementOnForm() {
        const form = document.querySelectorAll( 'tl-form' );
        for ( let child = 0; child < form.length; child++ ) {
            const doc = form[ child ].querySelectorAll( '*' );
            for ( let child2 = 0; child2 < doc.length; child2++ ) {
                if ( this.isPreviousTabIndex( doc, child2 ) ) {
                    return doc[ child2 ];
                }
            }
        }
    }

    isNextTabIndex( doc, child2 ) {
        return doc[ child2 ].tabindex === this.tabindex + 1;
    }

    isPreviousTabIndex( doc, child2 ) {
        return doc[ child2 ].tabindex === this.tabindex - 1;
    }


}
