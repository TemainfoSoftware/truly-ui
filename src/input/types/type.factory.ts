/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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

import { CustomType } from './custom-type';
import { CpfType } from './cpf.type';
import { CnpjType } from './cnpj.type';
import { NullType } from './null.type';
import { FloatNumberType } from './floatnumber.type';

export class TypeFactory {

    static getInstance( type, tlinput, decimals ): CustomType {
        switch ( type ) {
            case 'cpf':
                this.setCpfMask(tlinput);
                return new CpfType();
            case 'cnpj':
                this.setCnpjMask(tlinput);
                return new CnpjType();
            case 'floatnumber':
                this.setFloatNumber( tlinput, decimals );
                return new FloatNumberType();
            default :
                return new NullType();
        }

    }

    static setCpfMask(tlinput) {
        if (tlinput) {
            tlinput.mask = '999.999.999-99';
        }
    }

    static setCnpjMask(tlinput) {
        if (tlinput) {
            tlinput.mask = '99.999.999/9999-99';
        }
    }

    static setFloatNumber( tlinput, decimals ) {
        if ( tlinput ) {
            tlinput.input.nativeElement.value = tlinput.input.nativeElement.value.replace( /\D/g, '' );
            tlinput.input.nativeElement.addEventListener( 'blur', $event => {
                if ( !tlinput.input.nativeElement.value.includes( ',' ) && tlinput.input.nativeElement.value !== '' ) {
                    tlinput.input.nativeElement.value =
                        new Intl.NumberFormat(
                            'pt-BR', { minimumFractionDigits: decimals } )
                            .format( Number( tlinput.input.nativeElement.value ) );
                }
            } );
        }
    }
}
