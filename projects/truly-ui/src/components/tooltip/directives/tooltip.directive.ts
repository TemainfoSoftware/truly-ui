import {
  ComponentFactoryResolver,
  Directive, HostListener, Input, OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { TlToolTip } from '../tooltip';
import { TooltipOptions } from '../tooltipOptions';

@Directive( {
  selector: '[tooltip]'
} )
export class TooltipDirective implements OnDestroy {

  @Input() tooltip: TooltipOptions;

  private listenerWheel;

  constructor( private view: ViewContainerRef, private compiler: ComponentFactoryResolver ) {
    this.listenerWheel = document.addEventListener('mousewheel', () => {
      this.hide();
    });
  }

  @HostListener( 'mouseenter' )
  onMouseEnter() {
    this.show();
  }

  @HostListener( 'mouseleave' )
  onMouseLeave() {
    this.hide();
  }

  show() {
    if ( this.tooltip.text !== '' ) {
      const componentFactory = this.compiler.resolveComponentFactory( TlToolTip );
      const componentRef = this.view.createComponent( componentFactory );
      (<TlToolTip>componentRef.instance).setOptions( this.tooltip );
      (<TlToolTip>componentRef.instance).setPosition( this.view.element );
    }
  }

  hide() {
    this.view.clear();
  }

  ngOnDestroy() {
    document.removeEventListener('mousewheel', this.listenerWheel, false);
  }

}
