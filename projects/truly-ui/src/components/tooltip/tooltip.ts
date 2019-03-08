import { AfterContentInit, Input, Component, ElementRef, ViewChild } from '@angular/core';
import { TooltipOptions } from './tooltipOptions';
import { OverlayAnimation } from '../core/directives/overlay-animation';

@Component( {
  selector: 'tl-tooltip',
  templateUrl: './tooltip.html',
  styleUrls: [ './tooltip.scss' ],
  animations: [ OverlayAnimation ],
} )
export class TlToolTip {

  @Input() options: TooltipOptions;

  getClassByPlacement() {
    if ( this.options.placement.includes( 'left' ) ) {
      return 'left';
    }
    if ( this.options.placement.includes( 'right' ) ) {
      return 'right';
    }
    if ( this.options.placement.includes( 'top' ) ) {
      return 'top';
    }
    if ( this.options.placement.includes( 'bottom' ) ) {
      return 'bottom';
    }
  }
}
