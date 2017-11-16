import { Renderer2 } from '@angular/core';
import { KeyEvent } from '../core/enums/key-events';

export class InputMask {

    private tlInput;

    private maskGuides = true;

    private valueUppercase;

    private literalChar;

    private _value;

    private input;

    private startPosition: number;

    private endPosition: number;

    private shiftStart = '';

    private maskExpression: string;

    private maskGuideExpression: string;

    private maskSpecialCharacters: string[] = [ '/', '(', ')', '.', ':', '-', ' ', '+' ];

    private maskAwaliablePatterns: { [key: string]: RegExp } = {
        '0': /\d/,
        '9': /\d/,
        'A': /[a-zA-Z]/,
    };

    constructor( element, private renderer: Renderer2, maskValue  ) {
        this.tlInput = element;
        this.input = element.input;
        this.setMaskExpression(maskValue);
        this.initializeMask();
    }

    setMaskExpression(value) {
        if ( !value ) {
            return;
        }
        if ( typeof value === 'string' ) {
            this.maskExpression = value;
            return;
        }
        if ( value[ 'guides' ] === false ) {
            this.maskGuides = value[ 'guides' ];
        }
        this.literalChar = value[ 'withLiteralChar' ];
        this.valueUppercase = value[ 'uppercase' ];
        this.maskExpression = value[ 'mask' ];
    }

    get value() {
        return this.input.nativeElement.value;
    }

    set value( value ) {
        this.input.nativeElement.value = value;
    }

    initializeMask() {
        this.inicializeOnFocus();
        this.generateMaskGuideExpression();
        this.applyMaskOnInit();

        this.setPlaceholder();
        this.setValidation();

        this.onKeyPressInputListener();
        this.onMouseUpInputListener();
        this.onKeyDownInputListener();
    }


    onKeyPressInputListener() {
        this.renderer.listen(this.input.nativeElement, 'keypress', $event => {
            this.handleKeypress( $event );
            this.updateModel();
            this.onComplete();
        });
    }

    onMouseUpInputListener() {
        this.renderer.listen(this.input.nativeElement, 'mouseup', $event => {
            $event.stopPropagation();
            this.getPosition();
        });
    }

    onKeyDownInputListener() {
        this.renderer.listen(this.input.nativeElement, 'keydown', $event => {
            switch ( $event.keyCode ) {
                case KeyEvent.BACKSPACE:
                    this.handleBackspace( $event );
                    break;
                case KeyEvent.DELETE:
                    this.handleDelete( $event );
                    break;
                case KeyEvent.ARROWRIGHT:
                    this.handleArrowRight( $event );
                    break;
                case KeyEvent.ARROWLEFT:
                    this.handleArrowLeft( $event );
                    break;
                case KeyEvent.HOME:
                    this.handleHome( $event );
                    break;
                case KeyEvent.END:
                    this.handleEnd( $event );
                    break;
                case 'KeyA':
                    this.handleSelectAll( $event );
                    break;
            }
        });
    }

    private applyMaskOnInit() {
        if ( this.value !== this.maskGuideExpression ) {
            setTimeout( () => {
                if ( this.value.length > 0 ) {
                    this.setValueOnInitialize();
                    this.applyGuides();
                    this.applyMask();
                }
            }, 0 );
        }
    }

    private getPosition() {
        this.startPosition = this.input.nativeElement.selectionStart;
        this.endPosition = this.input.nativeElement.selectionEnd;
    }

    private inicializeOnFocus() {
        this.renderer.listen( this.input.nativeElement, 'focus', () => {
            this.onFocus();
        } );
        this.renderer.listen( this.input.nativeElement, 'focusout', () => {
            this.onFocusOut();
        } );
    }

    private onFocus() {
        this.applyGuides();
        setTimeout( () => {
            if ( !this.isTextLengthMatchWithExpressionLength() ) {
                this.setPosition( 0 );
            } else {
                this.setPosition( 0, this.value.length );
            }
        }, 0 );
    }

    private onFocusOut() {
        if ( !this.isTextLengthMatchWithExpressionLength() ) {
            this.value = '';
            this.tlInput.ngValue = '';
            this.updateModel();
            this.onComplete();
        }
    }

    private handleBackspace( event ) {
        const value = this.value;
        const start = this.input.nativeElement.selectionStart;
        const endPosition = this.input.nativeElement.selectionEnd;
        const valueArray = value.split( '' );
        this.getPosition();

        if ( InputMask.hasTextSelected( this.startPosition, this.endPosition ) ) {
            event.preventDefault();
            this.deleteTextOnKeyPress( valueArray, this.startPosition, this.endPosition );
            return;
        }
        if ( this.maskGuides ) {
            event.preventDefault();
            if ( this.isCharBeforeEqualMaskGuide( value, endPosition ) ) {
                this.jumpCharMask( start, endPosition );
            } else {
                this.deleteTextOnKeyPress( valueArray, start, endPosition );
            }
        }
        this.updateModel();
        this.onComplete();
    }

    private handleDelete( event ) {
        const valueArray = this.value.split( '' );
        const self = this;
        this.getPosition();
        event.preventDefault();
        if ( this.maskGuides ) {
            if ( InputMask.hasTextSelected( this.startPosition, this.endPosition ) ) {
                this.deleteTextOnKeyPress( valueArray, this.startPosition, this.endPosition );
            } else {
                this.value = this.deleteCharOnDeleteKey(valueArray);
                this.setPosition( self.endPosition );
            }
        }
        this.updateModel();
        this.onComplete();
    }

    private handleKeypress( event ) {
        const charInputted = event.key;
        let inputArray = this.value.split( '' );

        if ( event.key === 'Enter' ) {
            return;
        }
        if ( InputMask.hasTextSelected( this.startPosition, this.endPosition ) ) {
            this.deleteTextOnKeyPress( inputArray, this.startPosition, this.endPosition );
            this.setPosition( this.startPosition );
            inputArray = this.value.split( '' );
        }
        if ( this.maskGuides ) {
            this.getPosition();
            this.replaceValidChar( charInputted, this.getCursorPosition( this.endPosition ), inputArray );
        } else {
            this.applyMask( charInputted );
            event.preventDefault();
        }
    }

    private handleArrowRight( event ) {
        this.getPosition();
        if (event.shiftKey) {
            this.setShiftKey('Right');
            event.preventDefault();
            if ( this.shiftStart === 'Left' ) {
                this.setPosition( this.startPosition + 1, this.endPosition );
            } else {
                this.setPosition( this.startPosition, this.endPosition + 1 );
            }

        }
    }

    private handleArrowLeft( event ) {
        this.getPosition();
        if ( event.shiftKey ) {
            this.setShiftKey('Left');
            event.preventDefault();
            if ( this.shiftStart === 'Right' ) {
                this.setPosition( this.startPosition, this.endPosition - 1 );
            } else {
                if ( this.startPosition !== 0 ) {
                    this.setPosition( this.startPosition - 1, this.endPosition );
                }
            }
        }
    }

    private handleHome( event ) {
        event.preventDefault();
        this.getPosition();
        if ( event.shiftKey ) {
            this.setShiftKey( 'Left' );
            this.setPosition( 0, this.endPosition );
        } else {
            this.setPosition( 0 );
        }

    }

    private handleEnd( event ) {
        event.preventDefault();
        this.getPosition();
        if ( event.shiftKey ) {
            this.setShiftKey( 'Right' );
            this.setPosition( this.startPosition, this.value.length );
        } else {
            this.setPosition( this.value.length );
        }

    }


    private handleSelectAll( event ) {
        if ( event.ctrlKey ) {
            this.setPosition(0, this.value.length);
        }
    }

    private setShiftKey(value) {
        if (this.startPosition === this.endPosition) {
            this.shiftStart = '';
        }
        if (this.shiftStart === '') {
            this.shiftStart = value;
        }
    }

    private applyMask( charInputted? ) {
        let cursor = 0;
        let result = '';

        if ( charInputted !== undefined ) {
            this.value += charInputted;
        }

        const inputArray: string[] = this.value.split( '' );

        for ( let i = 0, inputSymbol = inputArray[ 0 ]; i < inputArray.length; i++ , inputSymbol = inputArray[ i ] ) {
            if ( result.length === this.maskExpression.length ) {
                break;
            }
            if ( this.isValidSymbolMask( inputSymbol, this.maskExpression[ cursor ] ) ) {
                result += inputSymbol;
                cursor++;
            } else if ( this.maskSpecialCharacters.indexOf( this.maskExpression[ cursor ] ) !== -1 ) {
                result += this.maskExpression[ cursor ];
                cursor++;
                i--;
            } else if ( this.maskExpression[ cursor ] === '9' ) {
                cursor++;
                i--;
            }
        }
        this.value = result;
        this.updateModel();
        this.onComplete();
    }

    private deleteTextOnKeyPress( valueArray, startPosition, endPosition ) {
        if ( InputMask.hasTextSelected( startPosition, endPosition ) ) {
            this.value = this.deleteTextSelected( valueArray, startPosition, endPosition );
            this.setPosition( startPosition, startPosition );
        } else {
            this.value = this.deleteCharOnBackspaceKey( valueArray, endPosition );
            this.setPosition( startPosition - 1, endPosition - 1 );
        }
    }

    private deleteTextSelected( valueArray, startPosition, endPosition ) {
        const self = this;
        let valueResult = '';
        valueArray.forEach( function ( myValue, index ) {
            if ( index >= startPosition && index < endPosition && self.maskGuides
                && self.maskSpecialCharacters.indexOf( index ) < 0 ) {
                valueResult = valueResult + self.maskGuideExpression[ index ];
            } else if ( index >= startPosition && index < endPosition && self.maskSpecialCharacters.indexOf( index ) < 0 ) {
                valueResult = valueResult + '';
            } else {
                valueResult = valueResult + myValue;
            }
        } );

        return valueResult;
    }


    private deleteCharOnBackspaceKey( valueArray, endPosition ) {
        const self = this;
        let valueResult = '';
        valueArray.forEach( function ( myValue, index ) {
            if ( index === endPosition - 1 ) {
                valueResult = valueResult + self.maskGuideExpression[ endPosition - 1 ];
            } else {
                valueResult = valueResult + myValue;
            }
        } );
        return valueResult;
    }

    private deleteCharOnDeleteKey(valueArray) {
        const self = this;
        valueArray.forEach( function ( value, index, array ) {
            if ( index === self.endPosition ) {
                array[ index ] = self.maskGuideExpression[ self.endPosition ];
            }
        } );
        return String(valueArray).replace(/,/gi, '');
    }

    private replaceUndescoreForChar( valueArray, charInputed, cursorEnd ) {
        if ( this.maskSpecialCharacters.indexOf( this.maskExpression[ cursorEnd ] ) >= 0 ) {
            cursorEnd++;
        }
        valueArray.forEach( function ( value, index, array ) {
            if ( index === cursorEnd ) {
                array[ index ] = charInputed;
            }
        } );
        return valueArray.toString().replace( /,/gi, '' );
    }

    private getCursorPosition( endPosition ) {
        let cursor = endPosition;
        while ( this.maskExpression.length - 1 > cursor ) {
            if ( this.maskSpecialCharacters.indexOf( this.maskExpression[ cursor ] ) >= 0 ) {
                cursor++;
                this.setPosition( cursor );
            } else {
                break;
            }
        }
        return cursor;
    }

    private replaceValidChar( charInputted, cursor, inputArray ) {
        if ( this.isValidSymbolMask( charInputted, this.maskExpression[ cursor ] ) ) {
            this.value = this.replaceUndescoreForChar( inputArray, charInputted, cursor );
            this.setPosition( cursor + 1 );
        }
    }

    private onComplete() {
        if (this.tlInput.validations['required']) {
            this.tlInput.validations['validMask'] = !this.isTextLengthMatchWithExpressionLength();
        }
        if ( this.isTextLengthMatchWithExpressionLength() ) {
            this.tlInput.writeValue( this.value );
            setTimeout(() => {
              this.tlInput.componentModel.model = this.clearMask(this.value);
            }, 100)
        }
    }

    private isTextLengthMatchWithExpressionLength() {
        return ( this.clearMask( this.maskExpression ).length === this.clearMask( this.value ).length)
            && ( ( InputMask.cleanValue( this.maskExpression ).length === InputMask.cleanValue( this.value ).length))
            && ( ( InputMask.removeUnderscore( this.maskExpression ).length === InputMask.removeUnderscore( this.value ).length));
    }

    private isValidSymbolMask( inputSymbol: string, maskSymbolChar: string ): boolean {
        if ( this.maskSpecialCharacters.indexOf( inputSymbol ) >= 0 ) {
            return false;
        }
        return ( inputSymbol === maskSymbolChar || this.maskAwaliablePatterns[ maskSymbolChar ] )
            && (this.maskAwaliablePatterns[ maskSymbolChar ].test( inputSymbol ));

    }

    private updateModel(): void {
        const endPosition = this.input.nativeElement.selectionEnd;
        if ( this.valueUppercase ) {
            this.value = this.value.toUpperCase();
        }
        setTimeout( () => {
            this.tlInput.onChangeCallback( this.clearMask( this.value ) );
            this.tlInput.componentModel.model = this.clearMask( this.value );
        }, 0 );
        this.setPosition( endPosition );
    }


    private setValidation() {
        this.input.nativeElement.maxLength = this.maskExpression.length;
        this.input.nativeElement.minLength = this.maskExpression.length;
    }

    private applyGuides() {
        const self = this;
        if ( this.maskGuides ) {
            setTimeout( function () {
                if ( self.input.nativeElement.value.length === 0 ) {
                    self.input.nativeElement.value = self.maskGuideExpression;
                }
            }, 1 );
        }
    }

    private generateMaskGuideExpression(): string {
        let mask = this.maskExpression;
        mask = mask.replace( /9/gi, '_' );
        mask = mask.replace( /0/gi, '_' );
        mask = mask.replace( /A/gi, '_' );
        return this.maskGuideExpression = mask;
    }

    private clearMask( value: string ): string {
        if ( !(this.literalChar) ) {
            return InputMask.cleanValue( value );
        }
        return InputMask.removeUnderscore( value );
    }

    private jumpCharMask( startPosition, endPosition ) {
        if ( InputMask.isFirstPosition( startPosition ) ) {
            this.setPosition( startPosition - 1, endPosition - 1 );
        }
    }

    private setPosition( startPosition, endPosition? ) {
        if ( endPosition === undefined ) {
            endPosition = startPosition;
        }
        this.input.nativeElement.setSelectionRange( startPosition, endPosition );
        this.getPosition();
    }

    private isCharBeforeEqualMaskGuide( value, position ) {
        return value[ position - 1 ] === this.maskGuideExpression[ position - 1 ];
    }

    private static isFirstPosition( startPosition ) {
        return startPosition > 0;
    }

    private static hasTextSelected( startPosition, endPosition ) {
        return startPosition !== endPosition;
    }

    private static removeUnderscore( value ) {
        return value.replace( /_/gi, '' );
    }

    private setPlaceholder() {
        this.input.nativeElement.placeholder = this.maskExpression;
    }

    private setValueOnInitialize() {
        this._value = this.value;
    }

    private static cleanValue( value ) {
        return value.replace( /([\/.-_():+])/gi, '' );
    }
}
