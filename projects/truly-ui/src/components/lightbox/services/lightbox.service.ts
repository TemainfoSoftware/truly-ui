import {ComponentRef, Injectable, OnDestroy} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Subscription} from 'rxjs';
import {TlLightbox} from '../lightbox';

@Injectable()
export class LightboxService implements OnDestroy {

  private lightBox: ComponentRef<TlLightbox>;

  private subscription: Subscription = new Subscription();

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private overlay: Overlay) {}

  private overlayRef: OverlayRef;

  create( images, current ) {
    this.close();
    const positionStrategy = this.overlay.position().global();
    this.overlayRef = this.overlay.create({
      positionStrategy,
      width: '100vw',
      height: '100vh',
      backdropClass: 'cdk-darker-overlay-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      disposeOnNavigation: false,
      hasBackdrop: true
    });
    const menuPortal = new ComponentPortal( TlLightbox );
    this.lightBox = this.overlayRef.attach( menuPortal );
    this.lightBox.instance.init( images, current );

    this.listenBackDropClick();
  }

  listenBackDropClick() {
    if (this.lightBox) {
      this.subscription.add( this.lightBox.instance.close.subscribe(() => {
        this.close();
      }));
      this.subscription.add(this.overlayRef.backdropClick().subscribe(() => {
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
