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
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnDestroy,
  OnInit,
  QueryList, Renderer2,
  ViewChild,
} from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';
import { TlInput } from '../input/input';
import { DialogService } from '../dialog/dialog.service';
import { ModalResult } from '../core/enums/modal-result';
import { TlDropDownList } from '../dropdownlist/dropdownlist';
import { TlRadioGroup } from '../radiobutton/radiogroup';
import { TlCheckBox } from '../checkbox/checkbox';
import { TlMultiSelect } from '../multiselect/multiselect';
import { TlAutoComplete } from '../autocomplete/autocomplete';

let componentFormIndex;

@Component( {
  selector: 'tl-form',
  templateUrl: '../form/form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ '../form/form.scss' ]
} )
export class TlForm implements AfterViewInit, OnDestroy, OnInit {

  @Input() initialFocus;

  @Input() showConfirmOnChange = false;

  @Input() messageDialogConfirmation = 'Are you sure ?';

  @Input() submitButtonShortcut = '';

  @Input() cancelButtonShortcut = '';

  @ContentChildren( TlInput ) inputList: QueryList<TlInput>;

  @ContentChildren( TlDropDownList ) dropdownList: QueryList<TlDropDownList>;

  @ContentChildren( TlRadioGroup ) radioButtonList: QueryList<TlRadioGroup>;

  @ContentChildren( TlCheckBox ) checkboxList: QueryList<TlCheckBox>;

  @ContentChildren( TlMultiSelect ) multiselectList: QueryList<TlMultiSelect>;

  @ContentChildren( TlAutoComplete ) autoCompleteList: QueryList<TlAutoComplete>;

  @ViewChild( 'buttonFormOk' ) buttonFormOk;

  @ViewChild( 'buttonFormCancel' ) buttonFormCancel;

  @ViewChild( 'content' ) content;

  public validForm = true;

  public formResult = {};

  private dialogOpen = false;

  private lastTabIndex;

  private lastActiveElement;

  private focusElements = [];

  private elementsWithTabIndex = [];

  private componentsWithValidations = [];

  private listeners = [];

  private time;

  constructor( private renderer: Renderer2, private dialogService: DialogService,
               private cdr: ChangeDetectorRef ) {
  }

  ngOnInit() {
    componentFormIndex = -1;
  }

  ngAfterViewInit() {
    this.setInitialFocus();
    this.getElementsOfForm();
    this.getComponentsWithValidations();
    this.validateElements();
    this.listenComponentWithValidations();
    this.clickListener();
  }

  onKeyDownButtonOk( $event ) {
    $event.stopPropagation();
    this.getInputValues();
    this.getMultiSelectValues();
    this.getDropdownListValues();
    this.getRadioButtonValues();
    this.getCheckBoxValues();
    this.getAutoCompleteValues();
  }

  clickListener() {
    this.renderer.listen( this.buttonFormOk.buttonElement.nativeElement, 'click', $event => {
      $event.stopPropagation();
      this.onClickButtonOk();
    } );
  }

  onClickButtonOk() {
    this.getInputValues();
    this.getMultiSelectValues();
    this.getDropdownListValues();
    this.getRadioButtonValues();
    this.getCheckBoxValues();
    this.getAutoCompleteValues();
  }


  listenComponentWithValidations() {
    this.componentsWithValidations.forEach( ( item, index, array ) => {
      const listener = this.renderer.listen( item.element.nativeElement, 'blur', $event => {
        this.validateElements();
      } );
      this.listeners.push( listener );
    } );
  }

  getComponentsWithValidations() {
    this.inputList.toArray().forEach( ( item, index, array ) => {
      if ( Object.keys( item.validations ).length > 0 ) {
        this.componentsWithValidations.push( item );
      }
    } );
    this.dropdownList.toArray().forEach( ( item, index, array ) => {
      if ( Object.keys( item.validations ).length > 0 ) {
        this.componentsWithValidations.push( item );
      }
    } );
    this.autoCompleteList.toArray().forEach((item, index, array) => {
      if (Object.keys( item.input ).length > 0) {
        this.componentsWithValidations.push( item.input );
      }
    });
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

  taggedNotForm( element ) {
    for ( let item = 0; item < element.attributes.length; item++ ) {
      if ( element.attributes[ item ].name === 'notform' ) {
        return true;
      }
    }
    return false;
  }

  validateElements() {
    this.time = setTimeout( () => {
      for ( let item = 0; item < this.componentsWithValidations.length; item++ ) {
        this.validForm = true;
        this.cdr.detectChanges();
        if ( this.componentsWithValidations[ item ].componentModel.valid === false ) {
          this.validForm = false;
          this.cdr.detectChanges();
          return;
        }
      }
    }, 100 );
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


  setTabIndex( element ) {
    if ( !element.tabIndex ) {
      componentFormIndex++;
      this.notExistTabIndexInserted() ? element.setAttribute( 'tabIndex', componentFormIndex )
        : this.setTabIndex( element );
    }
  }


  isLastTabIndexElement( element, index, array ) {
    if ( index === array.length - 1 ) {
      this.lastTabIndex = element.tabIndex;
    }
  }


  generateTabIndexOfElements() {
    this.focusElements.forEach( ( element, index, array ) => {
        this.setTabIndex( element );
        this.isLastTabIndexElement( element, index, array );
      }
    );
  }

  getElementsWithTabIndex() {
    this.focusElements.forEach( ( element ) => {
      if ( element.tabIndex ) {
        this.validateDuplicatedTabIndex( element );
        this.elementsWithTabIndex.push( element.tabIndex );
      }
    } );
  }

  validateDuplicatedTabIndex( element ) {
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

  existTabIndexInserted( element ) {
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
    this.inputHasChanged();
    if ( $event.keyCode === KeyEvent.TAB && $event.shiftKey ) {
      $event.preventDefault();
      this.backwardTabbing();
      return;
    }
    switch ( $event.keyCode ) {
      case KeyEvent.ARROWUP :
        this.backwardTabbing();
        break;
      case KeyEvent.ARROWDOWN:
        this.forwardTabbing();
        break;
      case KeyEvent.ARROWLEFT :
        this.setFocusOK();
        break;
      case KeyEvent.ARROWRIGHT:
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
    const previousElement = (document.activeElement as HTMLElement).tabIndex - 1;
    for ( let element = previousElement; element < this.focusElements.length; element-- ) {
      if ( !this.isElementDisabled( this.focusElements[ element ] ) ) {
        return this.focusElements[ element ].focus();
      }
    }
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
    this.initialFocus ? this.initialFocus.element.nativeElement.focus()
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
    if ( this.inputList.toArray().length > 0 ) {
      this.inputList.toArray()[ 0 ].element.nativeElement.focus();
    }
  }

  isActiveElementButtonOk() {
    return document.activeElement === this.buttonFormOk.buttonElement.nativeElement;
  }

  isActiveElementButtonCancel() {
    return document.activeElement === this.buttonFormCancel.buttonElement.nativeElement;
  }

  getLastActiveElement() {
    this.lastActiveElement = document.activeElement;
  }

  inputHasChanged() {
    let inputDirty = false;
    this.inputList.toArray().forEach( ( value ) => {
      if ( value.componentModel.dirty ) {
        inputDirty = true;
      }
    } );
    return inputDirty;
  }

  closeForm() {
    this.getLastActiveElement();
    if ( this.showConfirmOnChange && this.inputHasChanged() ) {
      this.showConfirmation();
      return;
    }
    this.buttonFormCancel.dispatchCallback();
    if ( !this.hasValueOnForm() ) {
      this.buttonFormCancel.dispatchCallback();
      return;
    }
  }

  showConfirmation() {
    if ( !this.dialogOpen ) {
      this.dialogOpen = true;
      this.dialogService.modalService.setBackdropModalOverModal();
      this.dialogService.confirmation( this.messageDialogConfirmation, ( callback ) => {
        if ( callback.mdResult === ModalResult.MRYES ) {
          this.buttonFormCancel.dispatchCallback();
        }
        this.dialogOpen = false;
        this.lastActiveElement.focus();
      }, { draggable: false } );
    }
  }

  getInputValues() {
    this.inputList.forEach( ( item ) => {
      this.formResult[ item.name.trim() ] = item.componentModel.model;
    } );
  }


  getDropdownListValues() {
    this.dropdownList.forEach( ( item ) => {
      this.formResult[ item.name.trim() ] = item.componentModel.model;
    } );
  }


  getRadioButtonValues() {
    this.radioButtonList.forEach( ( item ) => {
      this.formResult[ item.nameGroup.trim() ] = item.componentModel.model;
    } );
  }


  getCheckBoxValues() {
    this.checkboxList.forEach( ( item ) => {
      this.formResult[ item.name.trim() ] = item.componentModel.model;
    } );
  }

  getMultiSelectValues() {
    this.multiselectList.forEach( ( item ) => {
      this.formResult[ item.name.trim() ] = item.componentModel.model;
    } );
  }


  getAutoCompleteValues() {
    this.autoCompleteList.forEach( ( item ) => {
      this.formResult[ item.name.trim() ] = item.input.componentModel.model;
    } );
  }

  hasValueOnForm() {
    let model;
    this.inputList.toArray().forEach( ( value ) => {
      if ( value.ngValue ) {
        model = value.ngValue;
      }
    } );
    return model;
  }

  ngOnDestroy() {
    clearTimeout( this.time );
    this.destroyListeners();
    this.cdr.detach();
  }

  destroyListeners() {
    this.listeners.forEach( ( value ) => {
      value();
    } );
  }

}

