/**
 * Created by William on 16/06/2017.
 */
import {
    ComponentFactoryResolver,
    Directive, ElementRef, HostListener, Input, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TlToolTip } from "../../tooltip/tooltip";
import { TooltipOptions } from "../../tooltip/tooltipOptions";

@Directive( {
    selector: '[tooltip]'
} )
export class TooltipDirective {
    @Input( 'tooltip' ) tooltipOptions : TooltipOptions;

    private tooltip;

    constructor( private view : ViewContainerRef, private compiler : ComponentFactoryResolver ) {}

    @HostListener( 'mouseenter' )
    onMouseEnter() { this.show() }

    @HostListener( 'mouseleave' )
    onMouseLeave() { this.hide() }

    show() {
        const componentFactory = this.compiler.resolveComponentFactory( TlToolTip );
        const componentRef = this.view.createComponent( componentFactory );
        (<TlToolTip>componentRef.instance).setOptions( this.tooltipOptions );
        (<TlToolTip>componentRef.instance).setPosition( this.view.element );
    }

    hide() {
        this.view.clear();
    }

}