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

import {CurrencyMaskConfig, CURRENCY_MASK_CONFIG} from './currency-mask.config';
import {InputHandler} from './input.handler';
import { TlInput } from '../../input';

@Directive({
  selector: '[currency]',
})
export class CurrencyDirective implements AfterContentInit, DoCheck, OnInit {

  @Input() options: any = {};

  @ContentChild( TlInput ) inputCurrency: TlInput;

  public inputHandler: InputHandler;

  public keyValueDiffer: KeyValueDiffer<any, any>;

  public optionsTemplate = {
    align: 'right',
    allowNegative: true,
    allowZero: true,
    decimal: '.',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: ',',
    nullable: false
  };

  constructor(@Optional() @Inject(CURRENCY_MASK_CONFIG) private currencyMaskConfig: CurrencyMaskConfig,
              private keyValueDiffers: KeyValueDiffers) {
    if (currencyMaskConfig) {
      this.optionsTemplate = currencyMaskConfig;
    }
    this.keyValueDiffer = keyValueDiffers.find({}).create();
  }

  ngAfterContentInit() {
    this.inputCurrency.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
    this.inputHandler.setOnModelChange(this.inputCurrency.propagateChange);
    this.inputHandler.setOnModelTouched(this.inputCurrency.propagateTouched);
  }

  ngDoCheck() {
    if (this.keyValueDiffer.diff(this.options)) {
      this.inputCurrency.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
      this.inputHandler.updateOptions((<any>Object).assign({}, this.optionsTemplate, this.options));
    }
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(this.inputCurrency.input.nativeElement,
      (<any>Object).assign({}, this.optionsTemplate, this.options));
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: any) {
    this.inputHandler.getOnModelTouched().apply(event);
  }

  @HostListener('cut', ['$event'])
  handleCut(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  handleInput(event: any) {
    if (this.isChromeAndroid()) {
      this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handlePaste(event);
    }
  }

  isChromeAndroid(): boolean {
    return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
  }

}
