/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { BlockUIConfig } from './blockui-config';
import { TlBlockUIComponent } from './blockui.component';

@Directive( {
  selector: '[tlBlockui]'
} )
export class TlBlockUI implements OnChanges {

  @Input() tlBlockui: boolean;

  @Input() dimensionsFrom: 'parent' | 'client' = 'client';

  @Input() blockuiConfig: BlockUIConfig = new BlockUIConfig();

  private overlayElement: ElementRef;

  private overlayElementInstance: ComponentRef<TlBlockUIComponent>;

  constructor( private elementRef: ElementRef,
               private viewContainerRef: ViewContainerRef,
               private compiler: ComponentFactoryResolver ) {
  }

  initializeBlockUi() {
    this.createElementInstance();
    this.getElementRefFromInstance();
    this.setConfigToElement();
  }

  private getElementRefFromInstance() {
    this.overlayElement = this.overlayElementInstance.instance.element;
  }

  private getPaddingElementRef() {
    return window.getComputedStyle(this.elementRef.nativeElement).padding;
  }

  private setConfigToElement() {
    this.blockuiConfig.width = this.elementRef.nativeElement.offsetWidth - 2 + 'px';
    this.blockuiConfig.height = this.elementRef.nativeElement.offsetHeight + 'px';
    this.blockuiConfig.padding = this.getPaddingElementRef();
    this.overlayElementInstance.instance.config = this.blockuiConfig;
  }

  private createElementInstance() {
    const componentFactory = this.compiler.resolveComponentFactory( TlBlockUIComponent );
    this.overlayElementInstance = this.viewContainerRef.createComponent( componentFactory );
    this.insertElement();
  }

  private insertElement() {
    this.elementRef.nativeElement.insertAdjacentElement( 'afterBegin', this.overlayElementInstance.location.nativeElement );
  }

  ngOnChanges( changes ) {
    if ( changes[ 'tlBlockui' ] ) {
      this.toggleLoader( changes[ 'tlBlockui' ].currentValue );
    }
  }

  private toggleLoader( showLoading: boolean ) {
    showLoading ? this.show() : this.hide();
  }

  private show() {
    this.initializeBlockUi();
  }

  private hide() {
    this.viewContainerRef.clear();
  }

}
