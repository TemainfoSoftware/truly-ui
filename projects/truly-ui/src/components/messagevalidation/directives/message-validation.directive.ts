/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import {
  AfterContentInit,
  AfterViewInit,
  ComponentRef,
  ContentChild,
  Directive,
  ElementRef, OnDestroy,
  OnInit, Renderer2
} from '@angular/core';
import {FormControlName, NgModel} from '@angular/forms';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {TlMessageValidationComponent} from '../messagevalidation.component';
import {Subscription, throwError} from 'rxjs';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Directive({
  selector: '[showValidations]',
})
export class TlMessageValidationDirective implements AfterContentInit, AfterViewInit, OnDestroy {

  @ContentChild(NgModel, {static: true}) ngModel: NgModel;

  @ContentChild(FormControlName, {static: true}) ngControl: FormControlName;

  private overlayRef: OverlayRef;

  private validationsRef: ComponentRef<TlMessageValidationComponent>;

  private subscription = new Subscription();

  get control() {
    return this.ngModel ? this.ngModel : this.ngControl;
  }

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private overlay: Overlay) {
  }

  ngAfterContentInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.getNativeInput())
      .withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      }]);
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      disposeOnNavigation: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  ngAfterViewInit() {
    this.listenBlur();
    this.listenFocus();
    this.listenValueChanges();
    this.listenBackdrop();
  }

  listenFocus() {
    this.subscription.add(this.renderer.listen(this.getNativeInput(), 'focus', () => {
      if (!this.validationsRef) {
        this.create();
      }
    }));
  }

  listenBlur() {
    this.subscription.add(this.renderer.listen(this.getNativeInput(), 'blur', () => {
      this.remove();
    }));
  }

  listenBackdrop() {
    if (this.overlayRef) {
      this.subscription.add(this.overlayRef.backdropClick().subscribe(() => {
        this.remove();
      }));
    }
  }

  listenValueChanges() {
    if (this.control) {
      this.subscription.add(this.control.valueChanges.subscribe(() => {
        !this.validationsRef ? this.create() : this.validationsRef.instance.setMessages();
      }));
    }
  }

  create() {
    setTimeout(() => {
      if (this.control && this.control.errors && this.control.dirty && !this.overlayRef.hasAttached()) {
        const validationsPortal = new ComponentPortal(TlMessageValidationComponent);
        this.validationsRef = this.overlayRef.attach(validationsPortal);
        this.validationsRef.instance.init(this.control, this.getElementWidth());
        this.validationsRef.instance.setMessages();
      }
    });
  }

  remove() {
    this.overlayRef.detach();
    this.validationsRef = null;
  }

  getNativeInput() {
    const nativeInput = this.elementRef.nativeElement.querySelector('input') ||
      this.elementRef.nativeElement.querySelector('textarea');
    return nativeInput ? nativeInput : throwError(`There's no input element relative with origin element`);
  }

  getElementWidth() {
    return `${this.getNativeInput().offsetWidth}px`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
