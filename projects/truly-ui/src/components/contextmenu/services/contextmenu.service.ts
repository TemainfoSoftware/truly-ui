import {ComponentRef, ElementRef, Injectable, OnDestroy} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Subscription} from 'rxjs';
import {TlContextMenuComponent} from '../context-menu';
import {ContextMenuInterface} from '../interfaces/context-menu.interface';

@Injectable()
export class ContextMenuService implements OnDestroy {

  private menuRef: ComponentRef<TlContextMenuComponent>;

  private subscription: Subscription = new Subscription();

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private overlay: Overlay) {}

  private overlayRef: OverlayRef;

  create( event: MouseEvent, elementRef: ElementRef, itemsMenu: ContextMenuInterface[], context? ) {
    this.close();
    event.preventDefault();
    const coords = { x: event.x, y: event.y };
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x: coords.x, y: coords.y })
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
    const menuPortal = new ComponentPortal( TlContextMenuComponent );
    this.menuRef = this.overlayRef.attach( menuPortal );
    this.menuRef.instance.init( itemsMenu, context );

    this.listenBackDropClick();
    this.listenSelect();
  }

  listenBackDropClick() {
    if (this.menuRef) {
      this.subscription.add(this.overlayRef.backdropClick().subscribe(() => {
        this.close();
      }));
    }
  }

  listenSelect() {
    if (this.menuRef) {
      this.subscription.add(this.menuRef.instance.select.subscribe(() => {
        this.close();
      }));
    }
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
