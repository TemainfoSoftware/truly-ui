import {
    Directive,
    HostListener,
    Input,
    AfterViewChecked, AfterViewInit, Inject, ComponentRef
} from '@angular/core';

import { TlInput } from '../../input/input';

@Directive( {
    selector: '[mask]',
} )
export class FieldMaskDirective implements AfterViewInit, AfterViewChecked {

    @Input( 'guides' ) guides;

    private tlInput;
    private input;

    private maskExpression : string;
    private maskSpecialCharacters : string[] = [ '/', '(', ')', '.', ':', '-', ' ', '+', '_' ];
    private maskAwaliablePatterns : { [key : string] : RegExp } = {
        '0': /\d/,
        '9': /\d/,
        'A': /[a-zA-Z]/,
    };

    constructor( @Inject( TlInput ) private tlinput : ComponentRef<TlInput> ) {
        this.tlInput = tlinput;
    }

    public ngAfterViewInit() {
        this.input = this.tlInput.input;
        this.input.nativeElement.placeholder = this.maskExpression;
        this.applyValidation();
    }

    public ngAfterViewChecked() {
        this.applyValueChanges();
        this.applyGuides();
    }

    @Input( 'mask' )
    public set _maskExpression( value : string ) {
        if ( !value ) {
            return;
        }
        this.maskExpression = value;
    }

    @HostListener( 'input', [ '$event' ] )
    public onInput( $event ) : void {
        this.applyValueChanges();
        this.callBackForInput();
    }

    @HostListener( 'change' )
    public onChange() : void {
        this.setValidation();
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
        this.input.nativeElement.value = this.applyMask( value, this.maskExpression );
    }

    private callBackForInput() : void {
        this.tlInput.onChangeCallback( this.removeMask( this.input.nativeElement.value ) );
    }

    private removeMask( value : string ) : string {
        return value.replace( /(\/|\.|-|\(|\)|:| |\+)/gi, '' );
    }

    private applyValidation() {
        const model = this.input.nativeElement.value;
        if ( model ) {
            this.setValidation();
            this.tlInput.onChangeCallback( this.input.nativeElement.value );
        }
    }

    private setValidation() {
        this.tlInput.validations[ 'minLength' ] = this.maskExpression.length;
        this.tlInput.validations[ 'maxLength' ] = this.maskExpression.length;
    }

    private applyGuides() {
        const value = this.maskExpression;
        const model = this.tlInput.ngValue;
        if ( model === '' ) {
            if ( this.guides ) {
                this.input.nativeElement.value = value.replace( /9/gi, '_' );
                this.input.nativeElement.value = value.replace( /0/gi, '_' );
            }
        }
    }
}
