import {
  ComponentFactoryResolver, Directive, HostListener, Input, ViewContainerRef, Renderer2
} from '@angular/core';
import { TlToolTip } from '../tooltip';
import { TooltipOptions } from '../tooltipOptions';
import { TlToolTipContainer } from '../parts/tooltip-container';


@Directive( {
  selector: '[tooltip]'
} )
export class TooltipDirective  {

  @Input() tooltip: TooltipOptions;

  constructor( private view: ViewContainerRef, private compiler: ComponentFactoryResolver ) {}

  @HostListener( 'mouseenter' )
  onMouseEnter() {
    this.show();
  }

  @HostListener( 'mouseleave' )
  onMouseLeave() {
    this.hide();
  }

  private show() {
    if ( this.tooltip.text !== '' ) {
      const componentFactory = this.compiler.resolveComponentFactory( TlToolTipContainer );
      const componentRef = this.view.createComponent( componentFactory );
      (<TlToolTipContainer>componentRef.instance).setOptions( this.tooltip );
      (<TlToolTipContainer>componentRef.instance).setElement( this.view.element );
    }
  }

  private hide() {
    this.view.clear();
  }

}
