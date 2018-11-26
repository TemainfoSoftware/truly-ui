import {
  AfterViewInit,
  Directive,
  DoCheck,
  HostListener,
  Inject,
  KeyValueDiffer,
  KeyValueDiffers,
  Input,
  OnInit,
  Optional, ViewChild, ContentChild, AfterContentInit
} from '@angular/core';

import { CurrencyConfig, CURRENCY_MASK_CONFIG } from './currency-mask.config';
import { CurrencyHandler } from './currency.handler';
import { TlInput } from '../../input';

@Directive( {
  selector: '[currency]',
} )
export class CurrencyDirective implements AfterContentInit, DoCheck, OnInit {

  @Input() currencyOptions: any = {};

  @ContentChild( TlInput ) inputCurrency: TlInput;

  public inputHandler: CurrencyHandler;

  public keyValueDiffer: KeyValueDiffer<any, any>;

  public optionsTemplate = {
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: '.',
    precision: 2,
    prefix: '$ ',
    suffix: '',
    thousands: ',',
    nullable: false
  };

  constructor( @Optional() @Inject( CURRENCY_MASK_CONFIG ) private currencyConfig: CurrencyConfig,
               private keyValueDiffers: KeyValueDiffers ) {
    if ( currencyConfig ) {
      this.optionsTemplate = currencyConfig;
    }
    this.keyValueDiffer = keyValueDiffers.find( {} ).create();
  }

  ngAfterContentInit() {
    this.inputCurrency.textAlign = this.currencyOptions.align ? this.currencyOptions.align : this.optionsTemplate.align;
    this.inputHandler.setOnModelChange( this.inputCurrency.propagateChange );
    this.inputHandler.setOnModelTouched( this.inputCurrency.propagateTouched );
  }

  ngDoCheck() {
    if ( this.keyValueDiffer.diff( this.currencyOptions ) ) {
      this.inputCurrency.textAlign = this.currencyOptions.align ? this.currencyOptions.align : this.optionsTemplate.align;
      this.inputHandler.updateOptions( (<any>Object).assign( {}, this.optionsTemplate, this.currencyOptions ) );
    }
  }

  ngOnInit() {
    this.inputHandler = new CurrencyHandler( this.inputCurrency.input.nativeElement,
      (<any>Object).assign( {}, this.optionsTemplate, this.currencyOptions ) );
  }

  @HostListener( 'blur', [ '$event' ] )
  handleBlur( event: any ) {
    this.inputHandler.getOnModelTouched().apply( event );
  }

  @HostListener( 'cut', [ '$event' ] )
  handleCut( event: any ) {
    if ( !this.isChromeAndroid() ) {
      this.inputHandler.handleCut( event );
    }
  }

  @HostListener( 'input', [ '$event' ] )
  handleInput( event: any ) {
    if ( this.isChromeAndroid() ) {
      this.inputHandler.handleInput( event );
    }
  }

  @HostListener( 'keydown', [ '$event' ] )
  handleKeydown( event: any ) {
    if ( !this.isChromeAndroid() ) {
      this.inputHandler.handleKeydown( event );
    }
  }

  @HostListener( 'keypress', [ '$event' ] )
  handleKeypress( event: any ) {
    if ( !this.isChromeAndroid() ) {
      this.inputHandler.handleKeypress( event );
    }
  }

  @HostListener( 'paste', [ '$event' ] )
  handlePaste( event: any ) {
    if ( !this.isChromeAndroid() ) {
      this.inputHandler.handlePaste( event );
    }
  }

  isChromeAndroid(): boolean {
    return /chrome/i.test( navigator.userAgent ) && /android/i.test( navigator.userAgent );
  }

}
