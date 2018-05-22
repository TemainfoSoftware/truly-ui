/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  AfterViewInit, ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnChanges, OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { BlockUIConfig } from './blockui-config';
import { TlBlockUIComponent } from './blockui.component';

@Directive( {
  selector: '[tlBlockui]'
} )
export class TlBlockUI implements OnChanges, AfterContentInit {

  @Input() tlBlockui: boolean;

  @Input() dimensionsFrom: 'parent' | 'client' = 'client';

  @Input() blockuiConfig: BlockUIConfig = new BlockUIConfig();

  private overlayElement: ElementRef;

  private overlayElementInstance: ComponentRef<TlBlockUIComponent>;

  constructor( private elementRef: ElementRef,
               private viewContainerRef: ViewContainerRef,
               private renderer: Renderer2,
               private change: ChangeDetectorRef,
               private compiler: ComponentFactoryResolver ) {
  }

  ngOnChanges( changes ) {
    if ( changes[ 'tlBlockui' ] && (!changes[ 'tlBlockui' ].firstChange) ) {
      this.toggleLoader( changes[ 'tlBlockui' ].currentValue );
    }
  }

  ngAfterContentInit() {
    this.createElementInstance();
    this.getElementRefFromInstance();
    this.setConfigToElement();
    this.buildLoadingElement();
    this.toggleLoader( this.tlBlockui );
  }

  private createElementInstance() {
    const componentFactory = this.compiler.resolveComponentFactory( TlBlockUIComponent );
    this.overlayElementInstance = this.viewContainerRef.createComponent( componentFactory );
  }

  private setConfigToElement() {
    this.overlayElementInstance.instance.config = this.blockuiConfig;
  }

  private toggleLoader( showLoading: boolean ) {
    showLoading ? this.show() : this.hide();
  }

  private show() {
    setTimeout(() => {
      if ( this.happenedResize() ) {
        this.buildLoadingElement();
      }
      this.renderer.setStyle( this.elementRef.nativeElement, 'filter', 'blur(1px)' );
      this.renderer.setStyle( this.overlayElement.nativeElement, 'top', this.elementRef.nativeElement.offsetTop + 'px' );

      if (this.dimensionsFrom === 'client') {
        this.renderer.setStyle( this.overlayElement.nativeElement, 'height', this.elementRef.nativeElement.clientHeight + 'px' );
        this.renderer.setStyle( this.overlayElement.nativeElement, 'width', this.elementRef.nativeElement.clientWidth + 'px' );
      } else {
        this.renderer.setStyle( this.overlayElement.nativeElement, 'height',
          this.elementRef.nativeElement.offsetParent.clientHeight + 'px' );
        this.renderer.setStyle( this.overlayElement.nativeElement, 'width',
          this.elementRef.nativeElement.offsetParent.clientWidth + 'px' );
      }

      this.renderer.setStyle( this.overlayElement.nativeElement, 'display', 'table' );

    }, 50);
  }

  private getElementRefFromInstance() {
    this.overlayElement = this.overlayElementInstance.instance.element;
  }

  private hide() {
    this.renderer.setStyle( this.elementRef.nativeElement, 'filter', 'blur(0px)' );
    this.renderer.setStyle( this.overlayElement.nativeElement, 'display', 'none' );
  }

  private happenedResize() {
    if ( this.overlayElement.nativeElement.style.height !== this.elementRef.nativeElement.clientHeight + 'px' ) {
      return true;
    }
    if ( this.overlayElement.nativeElement.style.width !== this.elementRef.nativeElement.clientWidth + 'px' ) {
      return true;
    }
  }

  private buildLoadingElement() {

    if (this.dimensionsFrom === 'client') {
      this.renderer.setStyle( this.overlayElement.nativeElement, 'height', this.elementRef.nativeElement.clientHeight + 'px' );
      this.renderer.setStyle( this.overlayElement.nativeElement, 'width', this.elementRef.nativeElement.clientWidth + 'px' );
    } else {
      this.renderer.setStyle( this.overlayElement.nativeElement, 'height', this.elementRef.nativeElement.offsetParent.clientHeight + 'px' );
      this.renderer.setStyle( this.overlayElement.nativeElement, 'width', this.elementRef.nativeElement.offsetParent.clientWidth + 'px' );
    }

    this.renderer.setStyle( this.overlayElement.nativeElement, 'position', 'absolute' );
    this.renderer.setStyle( this.overlayElement.nativeElement, 'display', 'none' );
    this.renderer.setStyle( this.overlayElement.nativeElement, 'background-color', 'rgba(245, 245, 245, 0.8)' );
    this.change.detectChanges();
  }
}
