/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
import { Subscription } from 'rxjs';
import { ModalService } from '../modal/services/modal.service';
import { TlButton } from '../button/button';
import { ShortcutConfig } from './shortcut.config';

export interface ElementShortcut {
  id: string;
  shortcut: string;
  element: any;
}

let listener;

let buttonElements: Array<ElementShortcut> = [];

@Injectable()
export class ShortcutService implements OnDestroy {

  public elementsListener: Array<ElementShortcut> = [];

  private renderer: Renderer2;

  private elementIndex;

  private currentShortcut;

  private highestZindexElement;

  private subscription: Subscription = new Subscription();

  private activeModal: any;

  private config: ShortcutConfig;

  private modalContextArray = [];

  constructor( private modalService: ModalService ) {
  }

  setConfig( config: ShortcutConfig ) {
    this.config = config;
  }

  setRenderer( renderer ) {
    this.renderer = renderer;
    this.createListener();
  }

  createListener() {
    this.subscription.add( this.modalService.frontModal.subscribe( ( component: any ) => {
      this.activeModal = component.activeModal;
    } ) );
    if ( !listener ) {
      this.subscription.add( document.addEventListener( 'keydown', ( $event: KeyboardEvent ) => {
        if ( !this.isKeysShortcutEqualsKeysEvent( $event ) ) {
          return;
        }
        if ( this.isElementDisabledClass() ) {
          return;
        }
        if ( this.getEqualKeys( this.elementsListener[ this.elementIndex ].shortcut ).length > 1 ) {
          this.currentShortcut = this.elementsListener[ this.elementIndex ].shortcut;
          return this.handleClickComponentWithEqualsKeys();
        }
        this.handleClickComponentWithoutEqualsKeys();
        this.handleElementsOfView();
      } ) );
      listener = this.subscription;
    }
  }

  isElementDisabledClass() {
    if ( !this.config ) {
      return false;
    }
    if ( !this.config.disableClass ) {
      return false;
    }
    for ( let index = 0; index < this.getElementDisabled().classList.length; index++ ) {
      if ( this.getElementDisabled().classList[ index ] === this.config.disableClass ) {
        return true;
      }
    }
    return false;
  }

  getElementDisabled() {
    if ( this.elementsListener[ this.elementIndex ].element instanceof TlButton ) {
      return this.elementsListener[ this.elementIndex ].element.button.nativeElement;
    } else {
      return this.elementsListener[ this.elementIndex ].element.nativeElement;
    }
  }

  handleClickComponentWithEqualsKeys() {
    this.setModalContextArray();
    this.isElementInstanceOfButton( this.elementsListener[ this.elementIndex ] ) ?
      this.handleEqualButton() :
      this.handleEqualElement();
  }

  handleClickComponentWithoutEqualsKeys() {
    this.setModalContextArray();
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

  setModalContextArray() {
    this.modalContextArray = this.getExistModalContext();
  }

  handleEqualElement() {
    this.orderElementsByZindex();
    this.elementsListener[ this.elementsListener.indexOf( this.highestZindexElement ) ].element.nativeElement.click();
    this.handleElementsOfView();
  }

  activeHighestButtonElement() {
    if ( this.hasModalContextArray() ) {
      const button = this.getModalContextEqualActiveModal()[ 0 ];
      if ( button ) {
        button.element.button.nativeElement.click();
      }
    } else {
      this.sortButtons()[ 0 ].element.button.nativeElement.click();
    }
    setTimeout( () => {
      this.handleElementsOfView();
    }, 520 );
  }

  hasModalContextArray() {
    return this.modalContextArray.length > 0;
  }

  getModalContextEqualActiveModal() {
    return this.modalContextArray.filter( ( item ) =>
    (item.element.modalContext === this.activeModal) &&
    (item.shortcut === this.elementsListener[this.elementIndex].shortcut));
  }

  getExistModalContext() {
    return buttonElements.filter( ( item ) => item.element.modalContext );
  }

  getButtonsOfCurrentShortCut() {
    return buttonElements.filter( ( value ) => (this.currentShortcut === value.shortcut));
  }

  sortButtons() {
    return this.getButtonsOfCurrentShortCut().sort( ( a, b ) => {
      return parseInt( a.element.indexShortcut, 10 ) -
        parseInt( b.element.indexShortcut, 10 );
    } );
  }

  activeElementButton( element ) {
    let button;
    if ( this.getModalContextEqualActiveModal()[ 0 ] && this.hasModalContextArray()) {
      button = this.getModalContextEqualActiveModal()[ 0 ];
    } else {
      button = this.elementsListener[ element ];
    }
    button.element.buttonElement.nativeElement.click();
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
    return this.elementsListener[ this.elementIndex ].element.buttonElement.nativeElement.disabled;
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
