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

import { Injectable } from '@angular/core';
import { TlButton } from '../../button/button';

let listener;

const buttonElements = [];

@Injectable()
export class ShortcutService {

    public elementsListener = [];

    private renderer;

    setRenderer( renderer ) {
        this.renderer = renderer;
        this.createListener();
    }

    createListener() {
        if ( !listener ) {
            listener = this.renderer.listen( document, 'keydown', ( $event ) => {
                for ( let element = 0; element < this.elementsListener.length; element++ ) {
                    if ( this.isKeysShortcutEqualsKeysEvent( element, $event ) ) {
                        if ( this.elementsListener[ element ].element instanceof TlButton ) {
                            if ( this.getEqualKeys( this.elementsListener[ element ].shortcut ).length > 1 ) {
                                this.orderButtonsByZindex();
                                if ( this.isButtonDisabled() ) {
                                    return;
                                }
                                buttonElements[ buttonElements.length - 1 ].element.buttonElement.nativeElement.click();
                                buttonElements[ buttonElements.length - 1 ].element.dispatchCallback().then( () => {
                                    this.elementExistInView();
                                } );
                                return;
                            }

                            this.elementsListener[ element ].element.buttonElement.nativeElement.click();
                            this.elementsListener[ element ].element.dispatchCallback().then( () => {
                                this.elementExistInView();
                            } );

                        } else {
                            if ( this.getEqualKeys( this.elementsListener[ element ].shortcut ).length > 1 ) {
                                this.orderElementsByZindex();
                                this.elementsListener[ this.elementsListener.length - 1 ].element.nativeElement.click();
                                return;
                            }
                            this.elementsListener[ element ].element.nativeElement.click();
                        }
                    }
                }
            } );
        }
    }

    filterButtons() {
        this.elementsListener.forEach( ( value, index, array ) => {
            if ( value.element instanceof TlButton ) {
                if ( buttonElements.indexOf( value ) < 0 ) {
                    buttonElements.push( value );
                }
            }
        } );
    }

    isKeysShortcutEqualsKeysEvent( element, $event: KeyboardEvent ) {
        return (this.getShortcutEventMultipleKey( $event ).key === this.getShortcutMultipleKey( element ).key) &&
            (this.getShortcutEventMultipleKey( $event ).ctrlKey === this.getShortcutMultipleKey( element ).ctrlKey) &&
            (this.getShortcutEventMultipleKey( $event ).shiftKey === this.getShortcutMultipleKey( element ).shiftKey) &&
            (this.getShortcutEventMultipleKey( $event ).altKey === this.getShortcutMultipleKey( element ).altKey);
    }

    elementExistInView() {
        let query;
        this.elementsListener.forEach( ( value, index, array ) => {
            if ( value.element instanceof TlButton ) {
                query = document.body.contains( value.element.buttonElement.nativeElement );
                if ( !query ) {
                    this.deleteButtonElementFromArray( value );
                    this.deleteElementFromArray( value );
                }
            } else {
                query = document.body.contains( value.element.nativeElement );
                if ( !query ) {
                    this.deleteElementFromArray( value );
                }
            }
        } );
    }

    getShortcutMultipleKey( element ) {
        let ctrl = false;
        let shift = false;
        let alt = false;
        let key = this.elementsListener[ element ].shortcut.toLowerCase();
        const split = this.elementsListener[ element ].shortcut.toLowerCase().split( '' );

        const withoutSpaces = split.filter( ( value, index, array ) => {
            return value !== ' ';
        } );

        const str = withoutSpaces.toString().replace( /,/gi, '' );

        str.split( '+' ).forEach( ( value, index, array ) => {
            if ( value === 'ctrl' ) {
                ctrl = true;
            } else if ( value === 'shift' ) {
                shift = true;
            } else if ( value === 'alt' ) {
                alt = true;
            } else {
                key = value;
            }
        } );

        return { ctrlKey: ctrl, shiftKey: shift, altKey: alt, key: key }
    }

    getShortcutEventMultipleKey( $event: KeyboardEvent ) {
        return {
            ctrlKey: $event.ctrlKey,
            shiftKey: $event.shiftKey,
            altKey: $event.altKey,
            key: $event.key.toLowerCase()
        };
    }


    deleteElementFromArray( element ) {
        this.elementsListener.splice( this.elementsListener.indexOf( element ), 1 );
    }

    deleteButtonElementFromArray( element ) {
        buttonElements.splice( buttonElements.indexOf( element ), 1 );
    }

    isButtonDisabled() {
        return buttonElements[ buttonElements.length - 1 ].element.buttonElement.nativeElement.disabled;
    }

    getEqualKeys( shortcut ) {
        return this.elementsListener.filter( ( value, index, array ) => {
            return shortcut === value.shortcut;
        } );
    }

    orderElementsByZindex() {
        this.elementsListener.sort( ( a, b ) => {
            return a.element.nativeElement.firstChild.zIndex - b.element.nativeElement.firstChild.zIndex;
        } );
    }


    orderButtonsByZindex() {
        buttonElements.sort( ( a, b ) => {
            return a.element.buttonElement.nativeElement.firstChild.zIndex -
                b.element.buttonElement.nativeElement.firstChild.zIndex;
        } );
    }

}
