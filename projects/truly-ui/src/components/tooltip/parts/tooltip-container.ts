import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TooltipOptions } from '../tooltipOptions';
import { OverlayAnimation } from '../../core/directives/overlay-animation';
import {FixedPositionDirective} from '../../misc/fixed-position.directive';

@Component( {
  selector: 'tl-tooltip-container',
  template: `
    <ng-template cdkConnectedOverlay
                 [cdkConnectedOverlayHasBackdrop]="false"
                 [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
                 [cdkConnectedOverlayOpen]="true">
      <tl-tooltip @overlay [options]="options"></tl-tooltip>
    </ng-template>
  `,
  animations: [OverlayAnimation],
} )
export class TlToolTipContainer implements AfterContentInit {

  @ViewChild( 'tooltip', {static: true} ) tooltip;

  @ViewChild( CdkConnectedOverlay, {static: true} ) connectedOverlay: CdkConnectedOverlay;

  public options: TooltipOptions;

  private element;

  setOptions( options: TooltipOptions ) {
    this.options = options;
  }

  setElement( element ) {
    this.element = element;
  }

  ngAfterContentInit() {
    this.connectedOverlay.origin = new CdkOverlayOrigin( this.element );
    this.getPositionsByPlacement();
  }

  getPositionsByPlacement() {
    const placements = {
      'left-top': () => this.setLeftTop(),
      'left-center' : () => this.setLeftCenter(),
      'left-bottom' : () => this.setLeftBottom(),
      'right-top': () => this.setRightTop(),
      'right-center': () => this.setRightCenter(),
      'right-bottom': () => this.setRightBottom(),
      'top-center': () => this.setTopCenter(),
      'bottom-center': () => this.setBottomCenter()
    };
    if (placements[this.options.placement]) {
      placements[this.options.placement]();
    }
  }

  setBottomCenter() {
    this.connectedOverlay.positions = [ {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top'
    } ];
  }

  setTopCenter() {
    this.connectedOverlay.positions = [ {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom'
    } ];
  }

  setRightCenter() {
    this.connectedOverlay.positions = [ {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center'
    } ];
  }

  setRightTop() {
    this.connectedOverlay.positions = [ {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top'
    } ];
  }

  setRightBottom() {
    this.connectedOverlay.positions = [ {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom'
    } ];
  }

  setLeftBottom() {
    this.connectedOverlay.positions = [ {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom'
    } ];
  }

  setLeftTop() {
    this.connectedOverlay.positions = [ {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top'
    } ];
  }

  setLeftCenter() {
    this.connectedOverlay.positions = [ {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center'
    } ];
  }

}
