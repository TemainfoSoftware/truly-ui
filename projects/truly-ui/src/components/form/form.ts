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
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {KeyEvent} from '../core/enums/key-events';
import {I18nService} from '../i18n/i18n.service';
import {TlInput} from '../input/input';
import {FormGroup, NgForm, NgModel} from '@angular/forms';
import {TlButton} from '../button/button';
import {FormSubmitDirective} from './form-submit.directive';
import {ModalService} from '../modal/services/modal.service';
import {ActionsModal} from '../core/enums/actions-modal';
import {Subscription} from 'rxjs';

let componentFormIndex;

@Component( {
  selector: 'tl-form',
  templateUrl: '../form/form.html',
  styleUrls: [ '../form/form.scss' ],
} )
export class TlForm implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @Input( 'initialFocus' )
  set initialFocus( value ) {
    if ( value ) {
      this._initialFocus = value;
      this.change.detectChanges();
      this.setInitialFocus();
    }
  }

  get initialFocus() {
    return this._initialFocus;
  }

  @Input() showConfirmOnChange = false;

  @Input() isLoading = false;

  @Input() submitOnLastField = false;

  @Input() primaryKey = '';

  @Input() messageDialogConfirmation = 'Are you sure ?';

  @Input() submitShortcut = '';

  @Input() cancelShortcut = 'escape';

  @Input() mode: 'inline' | 'modal' = 'modal';

  @Input() textConfirm = this.i18n.getLocale().Form.textOk;

  @Input() textCancel = this.i18n.getLocale().Form.textCancel;

  @Input() padding = '10px';

  @Output() formLoaded: EventEmitter<FormGroup> = new EventEmitter();

  @Output() submitForm: EventEmitter<NgForm> = new EventEmitter();

  @Output() actionForm: EventEmitter<ActionsModal> = new EventEmitter();

  @Output() changeForm: EventEmitter<FormGroup> = new EventEmitter();

  @Input( 'formGroup' ) formGroup: FormGroup;

  @ViewChild( NgForm, {static: true}  ) public form: NgForm;

  @ContentChildren( forwardRef( () => TlInput ), { descendants: true } ) inputList: QueryList<TlInput>;

  @ContentChildren( forwardRef( () => TlButton ), { descendants: true } ) buttonList: QueryList<TlButton>;

  @ContentChildren( forwardRef( () => NgModel ), { descendants: true } ) models: QueryList<NgModel>;

  @ContentChild( FormSubmitDirective, {static: true}  ) submitDirective: FormSubmitDirective;

  @ViewChild( 'buttonFormOk', {static: false}  ) buttonFormOk;

  @ViewChild( 'buttonFormCancel', {static: false}  ) buttonFormCancel;

  @ViewChild( 'content', {static: true}  ) content;

  public formResult;

  private lastTabIndex: number;

  private focusElements = [];

  private elementsWithTabIndex = [];

  private _initialFocus;

  private subscription = new Subscription();

  private modalInstance;

  constructor( private renderer: Renderer2, private i18n: I18nService,
               private change: ChangeDetectorRef,
               private injector: Injector ) {
    this.modalInstance = this.injector.get( ModalService );
  }

  get valid() {
    return this.form.valid;
  }

  get formInstance() {
    return this.formGroup ? this.formGroup : this.form.form;
  }

  ngOnInit() {
    componentFormIndex = -1;
  }

  ngAfterContentInit() {
    this.handleFormGroupValues();
    this.handleSmartFormAction();
    this.setPrimaryKeyDisabled();
    this.addControls();
  }

  handleSmartFormAction() {
    if ( this.modalInstance.modalConfiguration ) {
      this.actionForm.emit( this.modalInstance.modalConfiguration.executeAction );
    }
  }

  ngAfterViewInit() {
    this.getElementsOfForm();
    this.formLoaded.emit( this.formInstance );
    this.setInitialFocus();
    this.listenSubmitDirective();
    this.listenFormChanges();
  }

  listenSubmitDirective() {
    if ( this.submitDirective ) {
      this.subscription.add( this.submitDirective.submit.subscribe(() => {
        this.submitForm.emit( this.formInstance.value );
      }));
    }
  }

  listenFormChanges() {
    this.subscription.add( this.formInstance.valueChanges.subscribe(() => {
      this.changeForm.emit( this.formInstance );
      this.change.detectChanges();
    }));
  }

  handleFormGroupValues() {
    if ( this.formGroup ) {
      if ( this.modalInstance.modalConfiguration &&
        this.modalInstance.modalConfiguration.executeAction !== ActionsModal.INSERT &&
        this.modalInstance.modalConfiguration.dataForm && this.mode === 'modal') {
        this.patchDataForm();
      }
      if ( this.modalInstance.modalConfiguration &&
        this.modalInstance.modalConfiguration.executeAction === ActionsModal.INSERT &&
        this.modalInstance.modalConfiguration.initialDataForm && this.mode === 'modal') {
        this.patchInitialDataForm();
      }
    }
  }

  patchDataForm() {
    this.formGroup.patchValue( this.modalInstance.modalConfiguration.dataForm );
    this.markAllAsTouched( this.formGroup.controls );
    this.change.detectChanges();
  }

  patchInitialDataForm() {
    this.formGroup.patchValue( this.modalInstance.modalConfiguration.initialDataForm );
    this.markAllAsTouched( this.formGroup.controls );
    this.change.detectChanges();
  }

  markAllAsTouched( controls ) {
    Object.keys( controls ).forEach(key => {
      if ( controls[key] instanceof FormGroup ) {
         this.markAllAsTouched( controls[key].controls );
      } else {
        controls[key].markAsTouched();
      }
    });
  }

  setPrimaryKeyDisabled() {
    if ( this.primaryKey && this.formGroup ) {
      this.formGroup.get( this.primaryKey ).disable();
    }
  }

  addControls() {
    if ( !this.formGroup ) {
      this.models.toArray().forEach( ( item, index, array ) => {
        this.form.addControl( item );
      } );
    }
  }

  onSubmitForm() {
    this.handleFormPrimaryKey();
    this.formResult = this.formInstance.value;
    this.submitForm.emit( this.formInstance.value );
    this.change.detectChanges();
  }

  handleFormPrimaryKey() {
    if (this.primaryKey && this.modalInstance.modalConfiguration.executeAction === ActionsModal.UPDATE) {
      this.formInstance.get(this.primaryKey).enable();
    }
  }

  getElementsOfForm() {
    const listFormComponents = this.content.nativeElement.querySelectorAll( '*' );
    for ( let childFormComponents = 0; childFormComponents < listFormComponents.length; childFormComponents++ ) {
      if ( (listFormComponents[ childFormComponents ].tagName === 'INPUT'
        || listFormComponents[ childFormComponents ].tagName === 'TEXTAREA'
        || listFormComponents[childFormComponents].classList.contains('ui-editor-content')) &&
        !this.taggedNotForm( listFormComponents[ childFormComponents ] ) ) {
        this.focusElements.push( listFormComponents[ childFormComponents ] );
      }
    }
    this.addButtonsOfFormToListElements();
    this.handleTabIndexComponentsOfForm();
  }

  taggedNotForm( element: HTMLElement ) {
    for ( let item = 0; item < element.attributes.length; item++ ) {
      if ( element.attributes[ item ].nodeValue === 'notform' || element.attributes[ item ].nodeName === 'notform' ) {
        return true;
      }
    }
    return false;
  }

  addButtonsOfFormToListElements() {
    if ( this.mode === 'inline' ) {
      this.buttonList.forEach( ( item, index, array ) => {
        index === 0 ? this.buttonFormOk = item : this.buttonFormCancel = item;
      } );
    }

    if ( this.buttonFormOk ) {
      this.focusElements.push( this.buttonFormOk.buttonElement.nativeElement );
    }
    if ( this.buttonFormCancel ) {
      this.focusElements.push( this.buttonFormCancel.buttonElement.nativeElement );
    }
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
    if ( $event.code === KeyEvent.TAB && $event.shiftKey ) {
      $event.preventDefault();
      this.backwardTabbing();
      return;
    }
    switch ( $event.code ) {
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
        if ( !this.isTextArea() ) {
          $event.preventDefault();
        }
        this.forwardTabbing();
        break;
      case KeyEvent.ENTER:
        if ( !this.isTextArea() ) {
          $event.preventDefault();
        }
        this.forwardTabbing('enter');
        break;
      case KeyEvent.NUMPADENTER:
        if ( !this.isTextArea() ) {
          $event.preventDefault();
        }
        this.forwardTabbing('enter');
        break;
    }
  }

  backwardTabbing() {
    this.change.detectChanges();
    if ( this.isFirstTabIndexOfForm() ) {
      return this.focusElements[ this.lastTabIndex ].focus();
    }
    if ( !this.validateFirstElement() ) {
      const previousElement = (document.activeElement as HTMLElement).tabIndex - 1;

      for ( let element = previousElement; element < this.focusElements.length && (element >= 0); element-- ) {
        if ( !this.isElementDisabled( this.focusElements[ element ] ) ) {
          return this.focusElements[ element ].focus();
        }
      }
    }
  }

  validateFirstElement() {
    return (this.focusElements[ 0 ].getAttribute( 'disabled' )) && (this.focusElements[ 1 ] === document.activeElement);
  }

  forwardTabbing( keyEnter?: string ) {
    this.change.detectChanges();
    if ( this.isLastTabIndexOfForm() ) {
      return this.focusElements[ 0 ].focus();
    }
    if ( this.isTextArea() ) {
      return;
    }
    const nextElement = (document.activeElement as HTMLElement).tabIndex + 1;
    for ( let element = nextElement; element < this.focusElements.length; element++ ) {
      if ( this.focusElements[element].localName === 'button' && this.submitOnLastField && keyEnter) {
        this.onSubmitForm();
        return;
      }
      if ( !this.isElementDisabled( this.focusElements[ element ] ) ) {
        return this.focusElements[ element ].focus();
      }
    }
  }

  isTextArea() {
    return (document.activeElement as HTMLElement).localName === 'textarea';
  }

  isLastTabIndexOfForm() {
    return (document.activeElement as HTMLElement).tabIndex === this.lastTabIndex;
  }

  isFirstTabIndexOfForm() {
    return (document.activeElement as HTMLElement).tabIndex === 0;
  }

  isElementDisabled( element ) {
    if ( element === undefined ) {
      return false;
    }
    return element.disabled;
  }

  setInitialFocus() {
    setTimeout(() => {
      this.initialFocus ? this.initialFocus.getNativeInput().focus()
        : this.setFocusOnFirstInput();
    }, 250);
  }

  setFocusOK() {
    if ( this.isActiveElementButtonCancel() && this.buttonFormOk ) {
      this.buttonFormOk.buttonElement.nativeElement.focus();
    }
  }

  setFocusCancel() {
    if ( this.isActiveElementButtonOk() && this.buttonFormCancel ) {
      this.buttonFormCancel.buttonElement.nativeElement.focus();
    }
  }

  setFocusOnFirstInput() {
    const enableElement = this.inputArray.filter( ( value ) => !value.disabled );
    if ( enableElement.length > 0 ) {
      enableElement[ 0 ].focus();
    }
  }

  get inputArray() {
    return this.inputList.map( ( item ) => item.getNativeInput() );
  }

  isActiveElementButtonOk() {
    if ( !this.buttonFormOk ) {
      return false;
    }
    return document.activeElement === this.buttonFormOk.buttonElement.nativeElement;
  }

  isActiveElementButtonCancel() {
    if ( !this.buttonFormCancel ) {
      return false;
    }
    return document.activeElement === this.buttonFormCancel.buttonElement.nativeElement;
  }

  destroyListeners() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.destroyListeners();
  }


}

