/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
import {
  Component, ContentChildren, Input,
  QueryList, Renderer2,
  ViewChild,
  forwardRef, OnDestroy, OnInit, AfterViewInit,
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { TlInput } from '../input/input';
import { TlDropDownList } from '../dropdownlist/dropdownlist';
import { TlRadioGroup } from '../radiobutton/radiogroup';
import { TlCheckBox } from '../checkbox/checkbox';
import { TlMultiSelect } from '../multiselect/multiselect';
import { TlAutoComplete } from '../autocomplete/autocomplete';
import { NgForm, NgModel } from '@angular/forms';

let componentFormIndex;

@Component( {
  selector: 'tl-form',
  templateUrl: '../form/form.html',
  styleUrls: [ '../form/form.scss' ]
} )
export class TlForm implements OnInit, AfterViewInit, OnDestroy {

  @Input() initialFocus: TlInput;

  @Input() showConfirmOnChange = false;

  @Input() messageDialogConfirmation = 'Are you sure ?';

  @Input() submitShortcut = '';

  @Input() closeShortcut = '';

  @Input() textConfirm = 'Ok';

  @Input() textCancel = 'Cancel';

  @Input() padding = '10px';

  @ContentChildren( forwardRef(() => TlInput ), {descendants: true}) inputList: QueryList<TlInput>;

  @ContentChildren( forwardRef(() => TlDropDownList ), {descendants: true}) dropdownList: QueryList<TlDropDownList>;

  @ContentChildren( forwardRef(() => TlRadioGroup ), {descendants: true}) radioButtonList: QueryList<TlRadioGroup>;

  @ContentChildren( forwardRef(() => TlCheckBox ), {descendants: true}) checkboxList: QueryList<TlCheckBox>;

  @ContentChildren( forwardRef(() => TlMultiSelect ), {descendants: true}) multiselectList: QueryList<TlMultiSelect>;

  @ContentChildren( forwardRef(() => TlAutoComplete ), {descendants: true}) autoCompleteList: QueryList<TlAutoComplete>;

  @ContentChildren(NgModel, {descendants: true}) models: QueryList<NgModel>;

  @ViewChild( 'buttonFormOk' ) buttonFormOk;

  @ViewChild( 'buttonFormCancel' ) buttonFormCancel;

  @ViewChild( 'content' ) content;

  @ViewChild(NgForm) public form: NgForm;

  public formResult: {} = {};

  private lastTabIndex: number;

  private focusElements = [];

  private elementsWithTabIndex = [];

  private listeners = [];

  constructor( private renderer: Renderer2 ) {}

  ngOnInit() {
    componentFormIndex = -1;
  }

  ngAfterViewInit() {
    this.addControls();
    this.setInitialFocus();
    this.getElementsOfForm();
    this.clickListener();
  }

  addControls() {
    this.models.toArray().forEach((control, index, array) => {
      this.form.addControl(control);
    });
  }

  onKeyDownButtonOk( $event: KeyboardEvent ) {
    $event.stopPropagation();
    this.getFormValues();
  }

  clickListener() {
    this.renderer.listen( this.buttonFormOk.buttonElement.nativeElement, 'mousedown', $event => {
      $event.stopPropagation();
      this.onClickButtonOk();
    } );
  }

  onClickButtonOk() {
    this.getFormValues();
  }

  getFormValues() {
     this.formResult = this.form.value;
  }

  getElementsOfForm() {
    const listFormComponents = this.content.nativeElement.querySelectorAll( '*' );
    for ( let childFormComponents = 0; childFormComponents < listFormComponents.length; childFormComponents++ ) {
      if ( listFormComponents[ childFormComponents ].tagName === 'INPUT' &&
        !this.taggedNotForm( listFormComponents[ childFormComponents ] ) ) {
        this.focusElements.push( listFormComponents[ childFormComponents ] );
      }
    }
    this.addButtonsOfFormToListElements();
    this.handleTabIndexComponentsOfForm();
  }

  taggedNotForm( element: HTMLElement ) {
    for ( let item = 0; item < element.attributes.length; item++ ) {
      if ( element.attributes[ item ].name === 'notform' ) {
        return true;
      }
    }
    return false;
  }

  addButtonsOfFormToListElements() {
    this.focusElements.push( this.buttonFormOk.buttonElement.nativeElement );
    this.focusElements.push( this.buttonFormCancel.buttonElement.nativeElement );
  }

  handleTabIndexComponentsOfForm() {
    setTimeout( () => {
      this.getElementsWithTabIndex();
      this.generateTabIndexOfElements();
      this.orderElements();
      this.validateTabIndexByElements();
    }, 10 );
  }

  setTabIndex( element: HTMLElement ) {
    if ( !element.tabIndex ) {
      componentFormIndex++;
      this.notExistTabIndexInserted() ? element.setAttribute( 'tabIndex', componentFormIndex )
        : this.setTabIndex( element );
    }
  }

  isLastTabIndexElement( element: HTMLElement, index, array ) {
    if ( index === array.length - 1 ) {
      this.lastTabIndex = element.tabIndex;
    }
  }

  generateTabIndexOfElements() {
    this.focusElements.forEach( ( element: HTMLElement, index, array ) => {
        this.setTabIndex( element );
        this.isLastTabIndexElement( element, index, array );
      }
    );
  }

  getElementsWithTabIndex() {
    this.focusElements.forEach( ( element: HTMLElement ) => {
      if ( element.tabIndex ) {
        this.validateDuplicatedTabIndex( element );
        this.elementsWithTabIndex.push( element.tabIndex );
      }
    } );
  }

  validateDuplicatedTabIndex( element: HTMLElement ) {
    if ( this.existTabIndexInserted( element ) ) {
      throw new EvalError( 'Exist an element with tabIndex duplicated! TabIndex : ' + element.tabIndex );
    }
  }

  validateTabIndexByElements() {
    const formElementsDefault = 3;
    if ( Math.max( ...this.elementsWithTabIndex ) > this.focusElements.length - formElementsDefault ) {
      throw new EvalError( 'The form doesn\'t have the number' +
        ' of elements enough according with TabIndex passed : ' + Math.max( ...this.elementsWithTabIndex ) );
    }
  }

  notExistTabIndexInserted() {
    return this.elementsWithTabIndex.indexOf( componentFormIndex ) < 0;
  }

  existTabIndexInserted( element: HTMLElement ) {
    return this.elementsWithTabIndex.indexOf( element.tabIndex ) >= 0;
  }

  orderElements() {
    let order;
    order = this.focusElements.sort( function ( a, b ) {
      return a.getAttribute( 'tabindex' ) - b.getAttribute( 'tabindex' );
    } );
    this.focusElements = order;
  }

  handleKeysForm( $event: KeyboardEvent ) {
    if ( $event.keyCode === KeyEvent.TAB && $event.shiftKey ) {
      $event.preventDefault();
      this.backwardTabbing();
      return;
    }
    switch ( $event.keyCode ) {
      case KeyEvent.ARROWUP :
        $event.preventDefault();
        this.backwardTabbing();
        break;
      case KeyEvent.ARROWDOWN:
        $event.preventDefault();
        this.forwardTabbing();
        break;
      case KeyEvent.ARROWRIGHT :
        this.setFocusOK();
        break;
      case KeyEvent.ARROWLEFT:
        this.setFocusCancel();
        break;
      case KeyEvent.TAB:
        $event.preventDefault();
        this.forwardTabbing();
        break;
      case KeyEvent.ENTER:
        $event.preventDefault();
        this.forwardTabbing();
        break;
    }
  }

  backwardTabbing() {
    if ( this.isFirstTabIndexOfForm() ) {
      return this.focusElements[ this.lastTabIndex ].focus();
    }
    if (!this.validateFirstElement()) {
      const previousElement = (document.activeElement as HTMLElement).tabIndex - 1;
      for ( let element = previousElement; element < this.focusElements.length; element-- ) {
        if ( !this.isElementDisabled( this.focusElements[ element ] ) ) {
          return this.focusElements[ element ].focus();
        }
      }
    }
  }

  validateFirstElement() {
     return (this.focusElements[0].getAttribute('disabled')) && (this.focusElements[1] === document.activeElement);
  }

  forwardTabbing() {
    if ( this.isLastTabIndexOfForm() ) {
      return this.focusElements[ 0 ].focus();
    }
    const nextElement = (document.activeElement as HTMLElement).tabIndex + 1;
    for ( let element = nextElement; element < this.focusElements.length; element++ ) {
      if ( !this.isElementDisabled( this.focusElements[ element ] ) ) {
        return this.focusElements[ element ].focus();
      }
    }
  }

  isLastTabIndexOfForm() {
    return (document.activeElement as HTMLElement).tabIndex === this.lastTabIndex;
  }

  isFirstTabIndexOfForm() {
    return (document.activeElement as HTMLElement).tabIndex === 0;
  }

  isElementDisabled( element ) {
    return element.disabled;
  }

  setInitialFocus() {
    this.initialFocus ? this.initialFocus.input.nativeElement.focus()
      : this.setFocusOnFirstInput();
  }

  setFocusOK() {
    if ( this.isActiveElementButtonCancel() ) {
      this.buttonFormOk.buttonElement.nativeElement.focus();
    }
  }

  setFocusCancel() {
    if ( this.isActiveElementButtonOk() ) {
      this.buttonFormCancel.buttonElement.nativeElement.focus();
    }
  }

  setFocusOnFirstInput() {
    let element;
    for (const item in this.inputList.toArray()) {
      if (!(this.inputList.toArray()[item].disabled)) {
        element = this.inputList.toArray()[item].input.nativeElement;
        break;
      }
    }
    element.focus();
  }

  isActiveElementButtonOk() {
    return document.activeElement === this.buttonFormOk.buttonElement.nativeElement;
  }

  isActiveElementButtonCancel() {
    return document.activeElement === this.buttonFormCancel.buttonElement.nativeElement;
  }

  destroyListeners() {
    this.listeners.forEach( ( value ) => {
      value();
    } );
  }

  ngOnDestroy() {
    this.destroyListeners();
  }


}

