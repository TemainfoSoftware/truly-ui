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
import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  Optional,
  Inject,
  EventEmitter, Renderer2, ElementRef, OnInit, ContentChild, forwardRef, ChangeDetectorRef, OnChanges,
} from '@angular/core';
import { InputMask } from './core/input-mask';
import {
  FormControlName, NG_VALUE_ACCESSOR,
  NgModel
} from '@angular/forms';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ValueAccessorBase } from './core/value-accessor';
import { INPUT_CONFIG, InputConfig } from './core/input.config';

/**
 * Input Component personalized with few features.
 *
 * import { InputModule } from 'truly-ui';
 *
 * @Component({
 *  selector: 'my-app-comp',
 *  template: '
 *  <tl-input
 *   [(ngModel)]="title"
 *   [iconBefore]="'ion-email'"
 *   [iconAfter]="'ion-email'"
 *   [textBefore]="'R$'"
 *   [textAfter]="'00,00'"
 *   [placeholder]="'Meu Input'"
 *   [clearButton]="true"
 *   [readonly]="true"
 *   [disabled]="true"
 *   [toUpperCase]="true">
 *  </tl-input>
 *  '
 * })
 */

@Component( {
  selector: 'tl-input',
  templateUrl: './input.html',
  styleUrls: [ './input.scss' ],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => TlInput ),
    multi: true,
  } ],
} )
export class TlInput extends ValueAccessorBase<string> implements OnInit, AfterViewInit {

  @Input() textBefore = '';

  @Input() textAfter = '';

  @Input() labelPlacement = 'left';

  @Input() labelSize = '100px';

  @Input() name = '';

  @Input() label = '';

  @Input() color = 'basic';

  @Input() iconBefore = '';

  @Input() iconAfter = '';

  @Input() clearButton = false;

  @Input() readonly: boolean = null;

  @Input() disabled: boolean = null;

  @Input() autocomplete = 'off';

  @Input() maxlength = -1;

  @Input() tabindex = 0;

  @Input() textAlign: 'left' | 'right' | 'center' | 'justify' = 'left';

  @Input() mask = '';

  @Input() placeholder = ' ';

  @Input() type = 'text';

  @Input() height = '23px';

  @Input() showValidations = false;

  @Input() withBorder = true;

  @Input() flatBorder = false;

  @ViewChild( 'input' ) input;

  @ViewChild( 'inputBox' ) inputBox;

  @ViewChild( CdkOverlayOrigin ) cdkOverlayOrigin: CdkOverlayOrigin;

  @ContentChild( NgModel ) model: NgModel;

  @ContentChild( FormControlName ) controlName: FormControlName;

  @Output() clear: EventEmitter<any> = new EventEmitter();

  @Output() overlayOrigin: EventEmitter<any> = new EventEmitter();

  @Output() clickAddon: EventEmitter<any> = new EventEmitter();

  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  @Output() focus: EventEmitter<any> = new EventEmitter();

  @Output() blur: EventEmitter<any> = new EventEmitter();

  public required = false;

  public isShowingMessages = false;

  public fieldMask: InputMask;

  public hasValidator;

  constructor( @Optional() @Inject( INPUT_CONFIG ) private inputConfig: InputConfig,
               private tlInput: ElementRef, private renderer: Renderer2,
               private change: ChangeDetectorRef ) {
    super();
    this.setOptions( this.inputConfig );
  }

  ngOnInit() {
    this.overlayOrigin.emit( this.cdkOverlayOrigin );
  }

  ngAfterViewInit() {
    this.setRequired();
    this.handleValidator();
    this.hasMask();
  }

  setRequired() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl && currentControl.control.errors ) {
      if ( currentControl.control.errors[ 'required' ] ) {
        this.required = true;
        this.change.detectChanges();
      }
    }
  }

  handleValidator() {
    const currentControl = this.controlName ? this.controlName : this.model;
    if ( currentControl ) {
      this.hasValidator = currentControl.control.validator;
      this.change.detectChanges();
    }
  }

  hasMask() {
    if ( this.mask ) {
      this.fieldMask = new InputMask( this, this.renderer, this.mask );
    }
  }

  onClickAddon( $event, side ) {
    this.stopEvent( $event );
    this.clickAddon.emit( { $event, side } );
  }

  onInputClick( $event: MouseEvent ) {
    this.stopEvent( $event );
    this.isShowingMessages = true;
    this.click.emit( $event );
  }

  setOptions( options: InputConfig ) {
    if ( options ) {
      const self = this;
      Object.keys( options ).forEach( function ( key ) {
        self[ key ] = options[ key ];
      } );
    }
  }

  stopEvent( $event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  setFocus() {
    this.input.nativeElement.focus();
  }

  getNativeInput() {
    return this.input.nativeElement;
  }

  onInputFocus( $event ) {
    this.isShowingMessages = true;
    this.focus.emit( $event );
  }

  onInputBlur( $event ) {
    this.isShowingMessages = false;
    this.blur.emit( $event );
  }

  clearInput( $event? ) {
    this.value = '';
    this.input.nativeElement.focus();
    this.clear.emit( $event );
  }

}
