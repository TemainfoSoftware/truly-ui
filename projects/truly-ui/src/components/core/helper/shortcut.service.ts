/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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

import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { TlButton } from '../../button/button';
import { ModalService } from '../../modal/modal.service';
import { Subscription } from 'rxjs';

let listener;

let buttonElements = [];

@Injectable()
export class ShortcutService implements OnDestroy {

  public elementsListener = [];

  private renderer: Renderer2;

  private elementIndex;

  private currentShortcut;

  private highestZindexElement;

  private subscription: Subscription = new Subscription();

  private headElement = {};

  constructor( private modalService: ModalService ) {}

  setRenderer( renderer ) {
    this.renderer = renderer;
    this.createListener();
  }

  createListener() {
    this.subscription.add(this.modalService.head.subscribe( ( component ) => {
      this.headElement = component;
    } ));
    if ( !listener ) {
      this.subscription.add(document.addEventListener( 'keydown', ( $event: KeyboardEvent ) => {
        $event.preventDefault();
        $event.stopPropagation();
        if ( !this.isKeysShortcutEqualsKeysEvent( $event ) ) {
          return;
        }
        if ( this.getEqualKeys( this.elementsListener[ this.elementIndex ].shortcut ).length > 1 ) {
          this.currentShortcut = this.elementsListener[ this.elementIndex ].shortcut;
          return this.handleClickComponentWithEqualsKeys();
        }
        this.handleClickComponentWithoutEqualsKeys();
        this.handleElementsOfView();
      } ));
      listener = this.subscription;
    }
  }

  handleClickComponentWithEqualsKeys() {
    this.isElementInstanceOfButton( this.elementsListener[ this.elementIndex ] ) ?
      this.handleEqualButton() :
      this.handleEqualElement();
  }

  handleClickComponentWithoutEqualsKeys() {
    this.isElementInstanceOfButton( this.elementsListener[ this.elementIndex ] ) ?
      this.activeElementButton( this.elementIndex ) :
      this.elementsListener[ this.elementIndex ].element.nativeElement.click();
  }

  handleEqualButton() {
    if ( this.isButtonDisabled() ) {
      return;
    }
    return this.activeHighestButtonElement();
  }

  handleEqualElement() {
    this.orderElementsByZindex();
    this.elementsListener[ this.elementsListener.indexOf( this.highestZindexElement ) ].element.nativeElement.click();
    this.handleElementsOfView();
  }

  activeHighestButtonElement() {
    const buttonToClick = buttonElements.filter( ( value ) => {
      return (this.currentShortcut === value.shortcut);
    } );
    this.sortButtons(buttonToClick)[0].element.button.nativeElement.click();
    setTimeout( () => {
      this.handleElementsOfView();
    }, 520 );
  }

  sortButtons(buttonToClick) {
    buttonToClick.sort( ( a, b ) => {
        return parseInt( a.element.indexShortcut, 10 ) -
          parseInt( b.element.indexShortcut, 10 );
    } );
    return buttonToClick;
  }

  activeElementButton( element ) {
    this.elementsListener[ element ].element.buttonElement.nativeElement.click();
    setTimeout( () => {
      this.handleElementsOfView();
    }, 520 );
  }

  filterButtons() {
    buttonElements = [];
    this.elementsListener.forEach( ( value ) => {
      if ( this.isElementInstanceOfButton( value ) ) {
        if ( buttonElements.indexOf( value ) < 0 ) {
          buttonElements.push( value );
        }
      }
    } );
  }

  isKeysShortcutEqualsKeysEvent( $event: KeyboardEvent ) {
    for ( let element = 0; element < this.elementsListener.length; element++ ) {
      if ( this.getShortcutEventMultipleKey( $event ).key === this.handleShortcutMultipleKey( element ).key &&
        this.getShortcutEventMultipleKey( $event ).ctrlKey === this.handleShortcutMultipleKey( element ).ctrlKey &&
        this.getShortcutEventMultipleKey( $event ).shiftKey === this.handleShortcutMultipleKey( element ).shiftKey &&
        this.getShortcutEventMultipleKey( $event ).altKey === this.handleShortcutMultipleKey( element ).altKey ) {
        this.elementIndex = element;
        return this.elementsListener[ element ];
      }
    }
  }

  handleElementsOfView() {
    setTimeout( () => {
      const tempArrayElements = this.elementsListener.slice( 0 );
      for ( let element = 0; element < tempArrayElements.length; element++ ) {
        this.isElementInstanceOfButton( tempArrayElements[ element ] ) ?
          this.handleElementButton( tempArrayElements[ element ] ) :
          this.handleOtherElements( tempArrayElements[ element ] );
      }
    }, 280 );
  }

  handleElementButton( item ) {
    if ( !this.existElementOnView( item.element.buttonElement.nativeElement ) ) {
      this.deleteButtonElementFromArray( item );
      this.deleteElementFromArray( item );
    }
  }

  handleOtherElements( item ) {
    if ( !this.existElementOnView( item.element.nativeElement ) ) {
      this.deleteElementFromArray( item );
    }
  }

  isElementInstanceOfButton( value ) {
    return value.element instanceof TlButton;
  }

  handleShortcutMultipleKey( element ) {
    const assistKeys = { ctrl: false, shift: false, alt: false };
    let key = this.elementsListener[ element ].shortcut.toLowerCase();

    this.getShortcutWithoutSpaces( element ).split( '+' ).forEach( ( value, index, array ) => {
      if ( value === 'ctrl' ) {
        return assistKeys.ctrl = true;
      }
      if ( value === 'shift' ) {
        return assistKeys.shift = true;
      }
      if ( value === 'alt' ) {
        return assistKeys.alt = true;
      }
      key = value;
    } );

    return {
      ctrlKey: assistKeys.ctrl,
      shiftKey: assistKeys.shift,
      altKey: assistKeys.alt,
      key: key
    };
  }

  getShortcutEventMultipleKey( $event: KeyboardEvent ) {
    return {
      ctrlKey: $event.ctrlKey,
      shiftKey: $event.shiftKey,
      altKey: $event.altKey,
      key: $event.key.toLowerCase()
    };
  }

  existElementOnView( value ) {
    return document.body.contains( value );
  }

  getCharsOfShortcut( element ) {
    return this.elementsListener[ element ].shortcut.toLowerCase().split( '' );
  }

  getShortcutWithoutSpaces( element ) {
    return this.removeSpacesShortcutString( element ).toString().replace( /,/gi, '' );
  }

  removeSpacesShortcutString( element ) {
    return this.getCharsOfShortcut( element ).filter( ( value ) => {
      return value !== ' ';
    } );
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
    return this.elementsListener.filter( ( value ) => {
      return shortcut === value.shortcut;
    } );
  }

  orderElementsByZindex() {
    const tmpNormalElements = this.filterElementsNotEqualButton();
    tmpNormalElements.sort( ( a, b ) => {
      if ( a.element.nativeElement ) {
        return parseInt( a.element.nativeElement.style.zIndex, 10 ) -
          parseInt( b.element.nativeElement.style.zIndex, 10 );
      }
    } );
    this.highestZindexElement = tmpNormalElements[ tmpNormalElements.length - 1 ];
  }

  filterElementsNotEqualButton() {
    return this.elementsListener.filter( ( value, index, array ) => {
      return !this.isElementInstanceOfButton( value );
    } );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
