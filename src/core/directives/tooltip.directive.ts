import {
    ComponentFactoryResolver,
    Directive, HostListener, Input,
    ViewContainerRef
} from '@angular/core';
import { TlToolTip } from '../../tooltip/tooltip';
import { TooltipOptions } from '../../tooltip/tooltipOptions';

@Directive( {
    selector: '[tooltip]'
} )
export class TooltipDirective {

    @Input() tooltip : TooltipOptions;

    constructor( private view : ViewContainerRef, private compiler : ComponentFactoryResolver ) {}

    @HostListener( 'mouseenter' )
    onMouseEnter() { this.show() }

    @HostListener( 'mouseleave' )
    onMouseLeave() { this.hide() }

    show() {
        const componentFactory = this.compiler.resolveComponentFactory( TlToolTip );
        const componentRef = this.view.createComponent( componentFactory );
        (<TlToolTip>componentRef.instance).setOptions( this.tooltip );
        (<TlToolTip>componentRef.instance).setPosition( this.view.element );
    }

    hide() {
        this.view.clear();
    }
}
