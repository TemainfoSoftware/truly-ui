/*
    MIT License

    Copyright (c) 2017 Temainfo Sistemas

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
    AfterViewInit,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
    ViewContainerRef
} from '@angular/core';
import { LoadingConfig } from './loading-config';
import { TlLoadingComponent } from './loading.component';

@Directive({
    selector: '[tlLoading]'
})
export class TlLoading implements OnChanges, AfterViewInit {

    @Input() tlLoading: boolean;

    @Input() loadingConfig: LoadingConfig = new LoadingConfig();

    private loadingElement: ElementRef;

    private loadingElementInstance: ComponentRef<TlLoadingComponent>;

    constructor( private elementRef: ElementRef,
                 private viewContainerRef: ViewContainerRef,
                 private renderer: Renderer2,
                 private compiler: ComponentFactoryResolver
    ) {}

    ngOnChanges(changes) {
        if (changes['tlLoading'] && (!changes['tlLoading'].firstChange) ) {
            this.troggleLoader( changes['tlLoading'].currentValue )
        }
    }

    ngAfterViewInit() {
        this.createElementInstance();
        this.getElementRefFromIstance();
        this.setConfigToElement();
        this.buildLoadingElement();
    }

    private createElementInstance() {
        const componentFactory = this.compiler.resolveComponentFactory( TlLoadingComponent );
        this.loadingElementInstance = this.viewContainerRef.createComponent( componentFactory );
    }

    private setConfigToElement() {
        this.loadingElementInstance.instance.config = this.loadingConfig;
    }

    private troggleLoader(showLoading: boolean) {
        showLoading ? this.show() : this.hide();
    }

    private show() {
        if ( this.happenedResize() ) {
           this.buildLoadingElement();
        }
        this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'blur(1px)');
        this.renderer.setStyle(this.loadingElement.nativeElement, 'display', 'table');
    }

    private getElementRefFromIstance() {
        this.loadingElement = this.loadingElementInstance.instance.element;
    }

    private hide() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'blur(0px)');
        this.renderer.setStyle(this.loadingElement.nativeElement, 'display', 'none');
    }

    private happenedResize(){
        if (this.loadingElement.nativeElement.style.height !== this.elementRef.nativeElement.clientHeight + "px") return true;
        if (this.loadingElement.nativeElement.style.width !== this.elementRef.nativeElement.clientWidth + "px") return true;
    }

    private buildLoadingElement() {
       this.renderer.setStyle(this.loadingElement.nativeElement, 'height', this.elementRef.nativeElement.clientHeight + 'px');
       this.renderer.setStyle(this.loadingElement.nativeElement, 'width', this.elementRef.nativeElement.clientWidth + 'px');
       this.renderer.setStyle(this.loadingElement.nativeElement, 'top', this.elementRef.nativeElement.offsetTop + 'px');
       this.renderer.setStyle(this.loadingElement.nativeElement, 'position', 'absolute');
       this.renderer.setStyle(this.loadingElement.nativeElement, 'display', 'none');
       this.renderer.setStyle(this.loadingElement.nativeElement, 'background-color', 'rgba(245, 245, 245, 0.8)');
    }
}
