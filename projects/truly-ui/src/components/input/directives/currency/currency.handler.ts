import {CurrencyService} from './currency.service';

export class CurrencyHandler {

  private _inputService: CurrencyService;
  private onModelChange: Function;
  private onModelTouched: Function;

  get inputService() {
    return this._inputService;
  }

  set inputService( value: CurrencyService ) {
    this._inputService = value;
  }

  constructor(htmlInputElement: HTMLInputElement, options: any) {
    this.inputService = new CurrencyService(htmlInputElement, options);
  }

  handleCut(event: any): void {
    setTimeout(() => {
      this.inputService.updateFieldValue();
      this.setValue(this.inputService.value);
      this.onModelChange(this.inputService.value);
    }, 0);
  }

  handleInput(event: any): void {
    const keyCode = this.inputService.rawValue.charCodeAt(this.inputService.rawValue.length - 1);
    const rawValueLength = this.inputService.rawValue.length;
    const rawValueSelectionEnd = this.inputService.inputSelection.selectionEnd;
    const storedRawValueLength = this.inputService.storedRawValue.length;
    this.inputService.rawValue = this.inputService.storedRawValue;

    if (rawValueLength !== rawValueSelectionEnd || Math.abs(rawValueLength - storedRawValueLength) !== 1) {
      this.setCursorPosition(event);
      return;
    }

    if (rawValueLength < storedRawValueLength) {
      this.inputService.removeNumber(8);
    }

    if (rawValueLength > storedRawValueLength) {
      switch (keyCode) {
        case 43:
          this.inputService.changeToPositive();
          break;
        case 45:
          this.inputService.changeToNegative();
          break;
        default:
          if (!this.inputService.canInputMoreNumbers) {
            return;
          }

          this.inputService.addNumber(keyCode);
      }
    }

    this.setCursorPosition(event);
    this.onModelChange(this.inputService.value);
  }

  handleKeydown(event: any): void {
    const keyCode = event.which || event.charCode || event.keyCode;

    if (keyCode === 8 || keyCode === 46 || keyCode === 63272) {
      event.preventDefault();
      const selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd
        - this.inputService.inputSelection.selectionStart);

      if (selectionRangeLength === 0) {
        this.inputService.removeNumber(keyCode);
        this.onModelChange(this.inputService.value);
      }

      if (selectionRangeLength >= (this.inputService.rawValue.length - this.inputService.prefixLength())) {
        this.clearValue();
      }
    }
  }

  clearValue() {
    this.setValue(this.inputService.isNullable() ? null : 0);
    this.onModelChange(this.inputService.value);
  }

  handleKeypress(event: any): void {
    const keyCode = event.which || event.charCode || event.keyCode;

    if (keyCode === 97 && event.ctrlKey) {
      return;
    }

    switch (keyCode) {
      case undefined:
      case 9:
      case 13:
      case 37:
      case 39:
        return;
      case 43:
        this.inputService.changeToPositive();
        break;
      case 45:
        this.inputService.changeToNegative();
        break;
      default:
        if (this.inputService.canInputMoreNumbers) {
          const selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd
            - this.inputService.inputSelection.selectionStart);

          if (selectionRangeLength === this.inputService.rawValue.length) {
            this.setValue(0);
          }

          this.inputService.addNumber(keyCode);
        }
    }

    event.preventDefault();
    this.onModelChange(this.inputService.value);
  }

  handlePaste(event: any): void {
    setTimeout(() => {
      this.inputService.updateFieldValue();
      this.setValue(this.inputService.value);
      this.onModelChange(this.inputService.value);
    }, 1);
  }

  updateOptions(options: any): void {
    this.inputService.updateOptions(options);
  }

  getOnModelChange(): Function {
    return this.onModelChange;
  }

  setOnModelChange(callbackFunction: Function): void {
    this.onModelChange = callbackFunction;
  }

  getOnModelTouched(): Function {
    return this.onModelTouched;
  }

  setOnModelTouched(callbackFunction: Function) {
    this.onModelTouched = callbackFunction;
  }

  setValue(value: number): void {
    this.inputService.value = value;
  }

  private setCursorPosition(event: any): void {
    setTimeout(function () {
      event.target.setSelectionRange(event.target.value.length, event.target.value.length);
    }, 0);
  }
}
