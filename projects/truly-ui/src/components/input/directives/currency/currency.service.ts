import {CurrencyManager} from './currency.manager';
import {CurrencyConfig} from './currency-mask.config';


export class CurrencyService {
  PER_AR_NUMBER: Map<string, string> = new Map<string, string>();

  public inputManager: CurrencyManager;

  initialize() {
    this.PER_AR_NUMBER.set('\u06F0', '0');
    this.PER_AR_NUMBER.set('\u06F1', '1');
    this.PER_AR_NUMBER.set('\u06F2', '2');
    this.PER_AR_NUMBER.set('\u06F3', '3');
    this.PER_AR_NUMBER.set('\u06F4', '4');
    this.PER_AR_NUMBER.set('\u06F5', '5');
    this.PER_AR_NUMBER.set('\u06F6', '6');
    this.PER_AR_NUMBER.set('\u06F7', '7');
    this.PER_AR_NUMBER.set('\u06F8', '8');
    this.PER_AR_NUMBER.set('\u06F9', '9');

    this.PER_AR_NUMBER.set('\u0660', '0');
    this.PER_AR_NUMBER.set('\u0661', '1');
    this.PER_AR_NUMBER.set('\u0662', '2');
    this.PER_AR_NUMBER.set('\u0663', '3');
    this.PER_AR_NUMBER.set('\u0664', '4');
    this.PER_AR_NUMBER.set('\u0665', '5');
    this.PER_AR_NUMBER.set('\u0666', '6');
    this.PER_AR_NUMBER.set('\u0667', '7');
    this.PER_AR_NUMBER.set('\u0668', '8');
    this.PER_AR_NUMBER.set('\u0669', '9');
  }

  constructor(private htmlInputElement: any, private options: CurrencyConfig) {
    this.inputManager = new CurrencyManager(htmlInputElement);
    this.initialize();
  }

  addNumber(keyCode: number): void {
    if (!this.rawValue) {
      this.rawValue = this.applyMask(false, '0');
    }

    const keyChar = String.fromCharCode(keyCode);
    const selectionStart = this.inputSelection.selectionStart;
    const selectionEnd = this.inputSelection.selectionEnd;
    this.rawValue = this.rawValue.substring(0, selectionStart) + keyChar + this.rawValue.substring(selectionEnd, this.rawValue.length);
    this.updateFieldValue(selectionStart + 1);
  }

  applyMask(isNumber: boolean, rawValue: string): string {
    const {allowNegative, decimal, precision, prefix, suffix, thousands, nullable} = this.options;
    rawValue = isNumber ? Number(rawValue).toFixed(precision) : rawValue;
    const onlyNumbers = rawValue.replace(/[^0-9\u0660-\u0669\u06F0-\u06F9]/g, '');

    if (!onlyNumbers) {
      return '';
    }

    let integerPart = onlyNumbers.slice(0, onlyNumbers.length - precision)
      .replace(/^\u0660*/g, '')
      .replace(/^\u06F0*/g, '')
      .replace(/^0*/g, '')
      .replace(/\B(?=([0-9\u0660-\u0669\u06F0-\u06F9]{3})+(?![0-9\u0660-\u0669\u06F0-\u06F9]))/g, thousands);

    if (integerPart.startsWith(thousands)) {
      integerPart = integerPart.substring(1);
    }


    if (integerPart === '') {
      integerPart = '0';
    }

    let newRawValue = integerPart;
    const decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);

    if (precision > 0) {
      newRawValue += decimal + decimalPart;
    }

    const isZero = parseInt(integerPart, 10) === 0 && (parseInt(decimalPart, 10) === 0 || decimalPart === '');
    const operator = (rawValue.indexOf('-') > -1 && allowNegative && !isZero) ? '-' : '';
    return operator + prefix + newRawValue + suffix;
  }

  clearMask(rawValue: string): number {
    if (this.isNullable() && rawValue === '') {
      return null;
    }

    let value = (rawValue || '0').replace(this.options.prefix, '').replace(this.options.suffix, '');

    if (this.options.thousands) {
      value = value.replace(new RegExp('\\' + this.options.thousands, 'g'), '');
    }

    if (this.options.decimal) {
      value = value.replace(this.options.decimal, '.');
    }

    this.PER_AR_NUMBER.forEach((val: string, key: string) => {
      const re = new RegExp(key, 'g');
      value = value.replace(re, val);
    });
    return parseFloat(value);
  }

  changeToNegative(): void {
    if (this.options.allowNegative && this.rawValue !== '' && this.rawValue.charAt(0) !== '-' && this.value !== 0) {
      this.rawValue = '-' + this.rawValue;
    }
  }

  changeToPositive(): void {
    this.rawValue = this.rawValue.replace('-', '');
  }

  removeNumber(keyCode: number): void {
    if (this.isNullable() && this.value === 0) {
      this.rawValue = null;
      return;
    }

    let selectionEnd = this.inputSelection.selectionEnd;
    let selectionStart = this.inputSelection.selectionStart;

    if (selectionStart > this.rawValue.length - this.options.suffix.length) {
      selectionEnd = this.rawValue.length - this.options.suffix.length;
      selectionStart = this.rawValue.length - this.options.suffix.length;
    }

    let move = this.rawValue.substr(selectionStart - 1, 1).match(/\d/) ? 0 : -1;
    if ((
        keyCode === 8 &&
        selectionStart - 1 === 0 &&
        !(this.rawValue.substr(selectionStart, 1).match(/\d/))
      ) ||
      (
        (keyCode === 46 || keyCode === 63272) &&
        selectionStart === 0 &&
        !(this.rawValue.substr(selectionStart + 1, 1).match(/\d/))
      )
    ) {
      move = 1;
    }
    selectionEnd = keyCode === 46 || keyCode === 63272 ? selectionEnd + 1 : selectionEnd;
    selectionStart = keyCode === 8 ? selectionStart - 1 : selectionStart;
    this.rawValue = this.rawValue.substring(0, selectionStart) + this.rawValue.substring(selectionEnd, this.rawValue.length);
    this.updateFieldValue(selectionStart + move);
  }

  updateFieldValue(selectionStart?: number): void {
    const newRawValue = this.applyMask(false, this.rawValue || '');
    selectionStart = selectionStart === undefined ? this.rawValue.length : selectionStart;
    this.inputManager.updateValueAndCursor(newRawValue, this.rawValue.length, selectionStart);
  }

  updateOptions(options: any): void {
    const value: number = this.value;
    this.options = options;
    this.value = value;
  }

  prefixLength(): any {
    return this.options.prefix.length;
  }

  isNullable() {
    return this.options.nullable;
  }

  get canInputMoreNumbers(): boolean {
    return this.inputManager.canInputMoreNumbers;
  }

  get inputSelection(): any {
    return this.inputManager.inputSelection;
  }

  get rawValue(): string {
    return this.inputManager.rawValue;
  }

  set rawValue(value: string) {
    this.inputManager.rawValue = value;
  }

  get storedRawValue(): string {
    return this.inputManager.storedRawValue;
  }

  get value(): any {
    return this.clearMask(this.rawValue);
  }

  set value(value: any) {
    this.rawValue = this.applyMask(true, '' + value);
  }
}
