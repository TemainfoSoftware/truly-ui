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
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ButtonStyleOptions } from './button-style-options';
import { ButtonAddonStyleOptions } from './button-addon-style-options';

@Component( {
    selector: 'tl-button',
    templateUrl: './button.html',
    styleUrls: [ './button.scss' ]
} )
export class TlButton {

    @Input() type = 'button';
    @Input() textButton = '';
    @Input() styleOptions: ButtonStyleOptions = new ButtonStyleOptions();
    @Input() iconBefore: ButtonAddonStyleOptions = new ButtonAddonStyleOptions();
    @Input() iconAfter: ButtonAddonStyleOptions = new ButtonAddonStyleOptions();
    @Input() width;
    @Input() iconLeftTextButton = '';
    @Input() iconRightTextButton = '';
    @Input() disabled: boolean = null;

    @ViewChild( 'buttonBox' ) buttonBox: ElementRef;


    @HostListener( 'mouseenter' ) onMouseEnter() {
        if ( this.disabled !== true ) {
            this.hoverButton( this.borderColor( this.styleOptions.backgroundColor, -0.05 ) );
        }
    }

    @HostListener( 'mouseleave' ) onMouseLeave() {
        this.hoverButton( this.styleOptions.backgroundColor );
    }

    @HostListener( 'mousedown' ) onMouseDown() {
        this.hoverButton( this.borderColor( this.styleOptions.backgroundColor, -0.09 ) );
    }

    @HostListener( 'mouseup' ) onMouseUp() {
        this.onMouseEnter();
    }


    // ComponentDefaultBase

    public getStyle() {
        return {
            'background-color': this.styleOptions.backgroundColor,
            'border': '1px solid ' + this.borderColor( this.styleOptions.backgroundColor, -0.14 ),
            'color': this.styleOptions.fontColor,
            'font-size': this.styleOptions.fontSize
        };
    }


    public getAddonStyle( addonPosition ) {
        if ( addonPosition === 'left' ) {
            return {
                'background-color': this.iconBefore.backgroundColor,
                'font-size': this.iconBefore.fontSize,
                'border-right': '1px solid ' + this.borderColor( this.styleOptions.backgroundColor, -0.14 )
            };
        } else {
            return {
                'background-color': this.iconAfter.backgroundColor,
                'font-size': this.iconAfter.fontSize,
                'border-left': '1px solid ' + this.borderColor( this.styleOptions.backgroundColor, -0.14 )
            };
        }
    }

    borderColor( hex, lum ) {

        // Validar string HEXADECIMAL
        hex = String( hex ).replace( /[^0-9a-f]/gi, '' );
        if ( hex.length < 6 ) {
            hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ];
        }
        lum = lum || 0;

        // Converter para decimal e mudar a luminosidade
        let rgb = '#', c, i;
        for ( i = 0; i < 3; i++ ) {
            c = parseInt( hex.substr( i * 2, 2 ), 16 );
            c = Math.round( Math.min( Math.max( 0, c + (c * lum) ), 255 ) ).toString( 16 );
            rgb += ('00' + c).substr( c.length );
        }
        return rgb;
    }

    private hoverButton( color: string ) {
        if ( this.disabled !== true ) {
            this.buttonBox.nativeElement.style.backgroundColor = color;
        }
    }
}

