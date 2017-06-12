import {
    Directive,
    HostListener,
    Input,
    AfterViewInit, OnInit, ContentChildren, QueryList, AfterContentInit, EventEmitter, Output
} from '@angular/core';
import { TlInput } from '../../input/input';


@Directive( {
    selector: '[mask]',
} )
export class FieldMaskDirective implements AfterViewInit, OnInit, AfterContentInit {

    @ContentChildren( TlInput ) tlinput : QueryList<TlInput>;

    private maskGuides;
    private value;
    private input;

    private maskExpression : string;
    private maskGuideExpression : string;
    private maskSpecialCharacters : string[] = [ '/', '(', ')', '.', ':', '-', ' ', '+' ];
    private maskAwaliablePatterns : { [key : string] : RegExp } = {
        '0': /\d/,
        '9': /\d/,
        'A': /[a-zA-Z]/,
    };

    @Input( 'mask' )
    public set _maskExpression( value : any ) {
        if ( !value ) {
            return;
        }
        if ( typeof value === 'string' ) {
            this.maskExpression = value;
            return;
        }
        this.maskGuides = value[ 'guides' ];
        this.maskExpression = value[ 'mask' ];
    }

    @HostListener( 'keypress', [ '$event' ] )
    public onKeyPress( $event ) : void {
        this.handleKeypress( $event );
        this.updateModel();
    }


    @HostListener( 'keydown', [ '$event' ] )
    onKeyDown( event ) : void {
        if ( event.code === 'Backspace' ) {
            const value = this.input.nativeElement.value;
            const start = this.input.nativeElement.selectionStart;
            const end = this.input.nativeElement.selectionEnd;

            if ( this.maskGuides ) {
                if ( value[ end - 1 ] === this.maskGuideExpression[ end - 1 ] ) {
                    event.preventDefault();
                    if ( start > 0 ) {
                        this.input.nativeElement.setSelectionRange( start - 1, end - 1 );
                    }
                }

                if ( value[ end - 1 ] !== this.maskGuideExpression[ end - 1 ] ) {
                    const valueArray = value.split( '' );
                    event.preventDefault();
                    let valueResult = '';
                    const self = this;
                    valueArray.forEach( function ( myValue, index, array ) {
                        if ( index === end - 1 ) {
                            valueResult = valueResult + self.maskGuideExpression[ end - 1 ];
                        } else {
                            valueResult = valueResult + myValue;
                        }
                    } );

                    this.input.nativeElement.value = valueResult;
                    this.input.nativeElement.setSelectionRange( start - 1, end - 1 );
                }
            }
            this.updateModel();
            this.onComplete();
        }
        const cursor = this.input.nativeElement.selectionEnd;
        if ( event.code === 'Delete' ) {
            event.preventDefault();
            const valueArray = this.input.nativeElement.value.split( '' );
            const self = this;
            valueArray.forEach(function ( value, index, array ) {
               if (index === cursor) {
                    array[index] = self.maskGuideExpression[cursor];
               }
            });
            this.input.nativeElement.value = String(valueArray).replace(/,/gi, '');
        }
        this.input.nativeElement.setSelectionRange( cursor, cursor );
    }

    public ngOnInit() {
    }

    ngAfterContentInit() {
        this.input = this.tlinput.toArray()[ 0 ].input;
    }

    public ngAfterViewInit() {
        this.generateMaskGuideExpression();
        this.applyMaskOnInit();
        this.setPlaceholder();
        this.setValidation();
    }


    private setPlaceholder() {
        this.input.nativeElement.placeholder = this.maskExpression;
    }

    private setValueOnInicialize() {
        this.value = this.input.nativeElement.value;
    }

    private applyMaskOnInit() {
        if ( this.input.nativeElement.value !== this.maskGuideExpression ) {
            setTimeout( () => {
                this.setValueOnInicialize();
                this.applyGuides();
                this.applyMask();
            }, 0 );
        }
    }


    private applyMask() {
        let cursor = 0;
        let result = '';

        const inputArray : string[] = this.input.nativeElement.value.split( '' );

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
        this.input.nativeElement.value = result;
        this.onComplete();
    }


    private replaceUndescoreForChar( valueArray, charInputed, cursorEnd ) {
        if ( this.maskSpecialCharacters.indexOf( this.maskExpression[ cursorEnd ] ) >= 0 ) {
            cursorEnd++;
        }
        for ( let index = 0; index < valueArray.length; index++ ) {
            if ( index === cursorEnd ) {
                valueArray[ index ] = charInputed;
            }
        }
        return valueArray.toString().replace( /,/gi, '' );
    }

    private handleKeypress( event ) {

        const charInputed = event.key;
        if ( charInputed !== 'Enter' && charInputed.length > 0 ) {

            const start = this.input.nativeElement.selectionStart;
            const end = this.input.nativeElement.selectionEnd;
            const inputArray = this.input.nativeElement.value.split( '' );

            if ( this.isValidSymbolMask( charInputed, this.maskExpression[ end ] ) === false ) {
                event.preventDefault();
                return;
            }

            if ( this.maskGuides ) {

                this.input.nativeElement.value = this.replaceUndescoreForChar( inputArray, charInputed, end );
                event.preventDefault();

                if ( this.input.nativeElement.value.split( '' )[ end + 1 ] === this.maskExpression[ end + 1 ]
                    || this.maskSpecialCharacters.indexOf( this.maskExpression[ end ] ) >= 0 ) {
                    this.input.nativeElement.setSelectionRange( start + 2, end + 2 );
                } else {
                    this.input.nativeElement.setSelectionRange( start + 1, end + 1 );
                }

            } else {
                this.input.nativeElement.value += charInputed;
                this.applyMask();
                event.preventDefault();
            }
        }
        this.onComplete();
    }

    private onComplete() {
        if ( this.clearMask( this.maskExpression ).length === this.clearMask( this.input.nativeElement.value ).length ) {
            this.tlinput.toArray()[ 0 ].validations[ 'validMask' ] = true;
        } else {
            this.tlinput.toArray()[ 0 ].validations[ 'validMask' ] = false;
        }
    }

    private isValidSymbolMask( inputSymbol : string, maskSymbolChar : string ) : boolean {
        return inputSymbol === maskSymbolChar || this.maskAwaliablePatterns[ maskSymbolChar ]
            && this.maskAwaliablePatterns[ maskSymbolChar ].test( inputSymbol );
    }

    private updateModel() : void {
        this.tlinput.toArray()[ 0 ].onChangeCallback( this.clearMask( this.input.nativeElement.value ) );
    }

    private clearMask( value : string ) : string {
        return value.replace( /(\/|\.|-|_|\(|\)|:|\+)/gi, '' );
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

    private generateMaskGuideExpression() : string {
        let mask = this.maskExpression;
        mask = mask.replace( /9/gi, '_' );
        mask = mask.replace( /0/gi, '_' );
        mask = mask.replace( /A/gi, '_' );
        return this.maskGuideExpression = mask;
    }

}
