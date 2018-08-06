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
  Inject,
  EventEmitter, Renderer2, Optional, Injector, ElementRef, HostListener, OnInit, ContentChild,
} from '@angular/core';
import { InputMask } from './core/input-mask';
import { ElementBase } from './core/element-base';
import {
  FormControl, FormControlName, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  NgModel
} from '@angular/forms';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ValueAccessorBase } from './core/value-accessor';

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
    useExisting: TlInput,
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

  @Input() iconBefore = '';

  @Input() iconAfter = '';

  @Input() clearButton: boolean;

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

  @ViewChild( 'afterText' ) public textClearButton;

  @ViewChild( 'afterIcon' ) public iconClearButton;

  @ViewChild( 'input' ) input;

  @ViewChild( 'inputBox' ) inputBox;

  @ViewChild( CdkOverlayOrigin ) cdkOverlayOrigin: CdkOverlayOrigin;

  @ContentChild( NgModel ) model: NgModel;

  @ContentChild( FormControlName ) controlName: FormControlName;

  @Output() clear: EventEmitter<any> = new EventEmitter();

  @Output() overlayOrigin: EventEmitter<any> = new EventEmitter();

  @Output() clickAddon: EventEmitter<any> = new EventEmitter();

  @Output() focus: EventEmitter<any> = new EventEmitter();

  @Output() blur: EventEmitter<any> = new EventEmitter();

  public required = false;

  public clearButtonPosition;

  public fieldMask: InputMask;

  constructor( @Optional() @Inject( NG_VALIDATORS ) public validators: Array<any>,
               private tlInput: ElementRef, private renderer: Renderer2 ) {
    super();
  }

  ngOnInit() {
    this.setRequired();
    this.overlayOrigin.emit( this.cdkOverlayOrigin );
  }

  ngAfterViewInit() {
    this.validateClearButtonPosition();
    this.hasMask();
  }

  setRequired() {
    const attributes = Array( this.tlInput.nativeElement.attributes )[ 0 ];
    for ( let item = 0; item < attributes.length; item++ ) {
      if ( attributes[ item ].nodeName === 'required' ) {
        this.required = true;
        break;
      }
    }
  }

  hasMask() {
    if ( this.mask ) {
      this.fieldMask = new InputMask( this, this.renderer, this.mask );
    }
  }

  validateClearButtonPosition() {
    if ( this.textClearButton ) {
      this.clearButtonPosition = this.textClearButton.nativeElement.offsetWidth + 5;
    }
    if ( this.iconClearButton ) {
      this.clearButtonPosition = this.iconClearButton.nativeElement.offsetWidth + 5;
    }
    if ( this.textClearButton && this.iconClearButton ) {
      this.clearButtonPosition =
        (this.textClearButton.nativeElement.offsetWidth + this.iconClearButton.nativeElement.offsetWidth) + 5;
    }
  }

  onClickAddon( MouseEvent, side ) {
    this.clickAddon.emit( { MouseEvent, side } );
  }

  onInputFocus( $event ) {
    this.focus.emit( $event );
  }

  onInputBlur( $event ) {
    this.blur.emit( $event );
  }

  clearInput( $event? ) {
    this.value = '';
    this.input.nativeElement.focus();
    this.clear.emit( $event );
  }

}
