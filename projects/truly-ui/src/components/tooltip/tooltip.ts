import { Component, ElementRef, ViewChild } from '@angular/core';
import { TooltipOptions } from './tooltipOptions';
import { transition, trigger, style, animate } from '@angular/animations';

@Component( {
    selector: 'tl-tooltip',
    template: `
        <div #tooltip [@enterAnimation]="show" class="tooltip-text" [ngStyle]="getStyleTooltip()"><span>{{text}}</span>
            <div [ngClass]="'-'+placement" [ngStyle]="getStyleTooltipArrow()"></div>
        </div>`,
    styleUrls: [ './tooltip.scss' ],
    animations: [
        trigger(
            'enterAnimation', [
                transition( ':enter', [
                    style( { opacity: 0 } ),
                    animate( '200ms', style( { opacity: 1 } ) )
                ] ),
                transition( ':leave', [
                    style( { opacity: 1 } ),
                    animate( '200ms', style( { opacity: 0 } ) )
                ] )
            ]
        )
    ],
} )
export class TlToolTip implements TooltipOptions {

    @ViewChild( 'tooltip' ) tooltip;

    public text: string;

    public color = '#000';

    public placement = 'top';

    public fontColor = '#FFF';

    public width = '';

    public show = true;

    private tooltipWidth = 0;

    private elementWidth = 0;

    private elementHeight = 0;

    private tooltipPadding = 10;

    private element;

    setOptions( options: TooltipOptions ) {
        const self = this;
        Object.keys( options ).forEach( function ( key ) {
            self[ key ] = options[ key ];
        } );
    }

    setPlacementTop() {
        const self = this;
        this.getElementWidth();
        this.getElementHeight();
        setTimeout( function () {
            self.getTopMeasureForTopTooltip();
            self.setAlignCenter();
        }, 0 );

    }

    setPlacementLeft() {
        const self = this;
        setTimeout( function () {
            self.getTopMeasureForLeftAndRight();
            self.setAlignLeft();
        }, 0 );
    }

    setPlacementRight() {
        const self = this;
        this.getElementWidth();
        setTimeout( function () {
            self.getTopMeasureForLeftAndRight();
            self.setAlignRight();
        }, 0 );
    }

    setPlacementBottom() {
        const self = this;
        this.getElementWidth();
        this.getElementHeight();
        setTimeout( function () {
            self.setTopMeasureForBottom();
            self.setAlignCenter();
        }, 0 );
    }

    getStyleTooltip() {
        return { 'background-color': this.color, 'color': this.fontColor, 'width': this.width };
    }

    getStyleTooltipArrow() {
        switch ( this.placement ) {
            case 'right':
                return {
                    'border-color': 'transparent ' + this.color + ' transparent transparent'
                };
            case 'left':
                return {
                    'border-color': 'transparent transparent transparent' + this.color
                };
            case 'top':
                return {
                    'border-color': this.color + ' transparent transparent transparent'
                };
            case 'bottom':
                return {
                    'border-color': 'transparent transparent ' + this.color + ' transparent'
                };
        }
    }

    setPosition( element: ElementRef ) {
        this.getElement( element );
        switch ( this.placement ) {
            case 'top':
                this.setPlacementTop();
                break;
            case 'left':
                this.setPlacementLeft();
                break;
            case 'right':
                this.setPlacementRight();
                break;
            case 'bottom':
                this.setPlacementBottom();
                break;
        }
    }

    private getElement( element ) {
        this.element = element;
    }

    private existsMeasureOnNativeElement(): boolean {
        return this.element.nativeElement.offsetWidth > 0 && this.element.nativeElement.offsetHeight > 0;
    }

    private isLessOrEqualThanNormalWidth(): boolean {
        return this.tooltip.nativeElement.offsetHeight <= 27;
    }

    private getElementWidth() {
        this.existsMeasureOnNativeElement() ? this.elementWidth = this.element.nativeElement.offsetWidth
            : this.elementWidth = this.element.nativeElement.firstChild.clientWidth;
    }

    private getTopMeasureForTopTooltip() {
        this.tooltip.nativeElement.style.top = this.getElementTop() -
                this.tooltip.nativeElement.offsetHeight - this.tooltipPadding + 'px';
    }

    private getTopMeasureForLeftAndRight() {
      this.tooltip.nativeElement.style.top =
        this.getElementTop() + (this.element.nativeElement.offsetHeight / 2) -
         (this.tooltip.nativeElement.offsetHeight / 2) + 'px';
    }

    private getElementHeight() {
        this.existsMeasureOnNativeElement() ? this.elementHeight = this.element.nativeElement.offsetHeight :
            this.elementHeight = this.element.nativeElement.firstChild.clientHeight;
    }

    private setTopMeasureForBottom() {
        this.tooltip.nativeElement.style.top =
          this.getElementTop() + this.elementHeight + this.tooltipPadding + 'px';
    }

    private setAlignCenter() {
        this.tooltip.nativeElement.style.left = this.element.nativeElement.getBoundingClientRect().left +
            (this.elementWidth / 2) - this.tooltip.nativeElement.offsetWidth / 2 + 'px';
    }

    private setAlignRight() {
        this.tooltip.nativeElement.style.left = this.element.nativeElement.getBoundingClientRect().left +
            this.elementWidth + this.tooltipPadding + 'px';
    }

    private setAlignLeft() {
        this.tooltip.nativeElement.style.left = this.element.nativeElement.getBoundingClientRect().left
          - this.tooltip.nativeElement.offsetWidth + 'px';
    }

    private getElementTop() {
        return this.element.nativeElement.getBoundingClientRect().top;
    }
}
