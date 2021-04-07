import {ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {TooltipOptions} from './tooltipOptions';
import {TlToolTipContainer} from './parts/tooltip-container';

@Injectable()
export class TooltipService {

  private component: ComponentRef<any>;

  constructor( private compiler: ComponentFactoryResolver ) {}

  create( tooltip: TooltipOptions, view: ViewContainerRef, element: HTMLElement ) {
    const componentFactory = this.compiler.resolveComponentFactory( TlToolTipContainer );
    this.component = view.createComponent( componentFactory );
    (<TlToolTipContainer>this.component.instance).setOptions( tooltip );
    (<TlToolTipContainer>this.component.instance).setElement( element );
  }

  destroy() {
    this.component.destroy();
  }

}
