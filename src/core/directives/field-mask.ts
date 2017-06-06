import {
    AfterContentInit,
    ContentChildren,
    Directive,
    HostListener,
    Input,
    QueryList,
    AfterViewChecked,
} from '@angular/core';

import { TlInput } from '../../input/input';

@Directive( {
    selector: '[mask]',
} )
export class FieldMask implements AfterContentInit, AfterViewChecked {

    @ContentChildren( TlInput ) element : QueryList<TlInput>;
    private tlInput;
    private input;

    private maskExpression : string;
    private maskSpecialCharacters : string[] = [ '/', '(', ')', '.', ':', '-', ' ', '+' ];
    private maskAwaliablePatterns : { [key : string] : RegExp } = {
        '0': /\d/,
        '9': /\d/,
        'A': /[a-zA-Z]/,
    };

    public ngAfterContentInit() {
        this.tlInput = this.element.toArray()[ 0 ];
        this.input = this.element.toArray()[ 0 ].input;
        this.defineValidation();
    }

    public ngAfterViewChecked() {
        this.applyValueChanges();
    }

    @Input( 'mask' )
    public set _maskExpression( value : string ) {
        if ( !value ) {
            return;
        }
        this.maskExpression = value;
    }

    @HostListener( 'input' )
    public onInput() : void {
        this.applyValueChanges();
        this.callBackForInput();
    }

    private applyMask( inputValue : string, maskExpression : string ) : string {
        let cursor = 0;
        let result = '';

        const inputArray : string[] = inputValue.split( '' );

        for ( let i = 0, inputSymbol : string = inputArray[ 0 ]; i
        < inputArray.length; i++ , inputSymbol = inputArray[ i ] ) {
            if ( result.length === maskExpression.length ) {
                break;
            }
            if ( this.checkSymbolMask( inputSymbol, maskExpression[ cursor ] ) ) {
                result += inputSymbol;
                cursor++;
            } else if ( this.maskSpecialCharacters.indexOf( maskExpression[ cursor ] ) !== -1 ) {
                result += maskExpression[ cursor ];
                cursor++;
                i--;
            } else if ( maskExpression[ cursor ] === '9' ) {
                cursor++;
                i--;
            }
        }
        if ( result.length + 1 === maskExpression.length
            && this.maskSpecialCharacters.indexOf( maskExpression[ maskExpression.length - 1 ] ) !== -1 ) {
            result += maskExpression[ maskExpression.length - 1 ];
        }
        return result;
    }

    private checkSymbolMask( inputSymbol : string, maskSymbol : string ) : boolean {
        return inputSymbol === maskSymbol
            || this.maskAwaliablePatterns[ maskSymbol ]
            && this.maskAwaliablePatterns[ maskSymbol ].test( inputSymbol );
    }

    private applyValueChanges() : void {
        const value : string = this.input.nativeElement.value;
        const masked = this.applyMask( value, this.maskExpression );
        this.input.nativeElement.value = masked;
    }

    private callBackForInput() : void {
        this.tlInput.onChangeCallback( this.removeMask( this.input.nativeElement.value ) );
    }

    private removeMask( value : string ) : string {
        return value.replace( /(\/|\.|-|\(|\)|:| |\+)/gi, '' );
    }

    private defineValidation() {
        this.tlInput.validations[ 'minLength' ] = this.maskExpression.length;
        this.tlInput.validations[ 'maxLength' ] = this.maskExpression.length;
    }
}
