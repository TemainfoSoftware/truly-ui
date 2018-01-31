/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
  ComponentFactoryResolver, Injectable, ViewContainerRef, OnDestroy, Type, ElementRef,
  ComponentRef
} from '@angular/core';
import { ContainerModalService } from './addons/container-modal/container-modal.service';
import { TlModal } from './modal';
import { ModalResult } from '../core/enums/modal-result';
import { TlBackdrop } from '../core/components/backdrop/backdrop';
import { Subject } from 'rxjs/Subject';

let lastZIndex = 1;

@Injectable()
export class ModalService implements OnDestroy {

    public component: ComponentRef<any>;

    public componentList: Array<ComponentRef<any>> = [];

    public componentInjected: ComponentRef<any>;

    public forms: Array<ComponentRef<any>> = [];

    public activeModal: ComponentRef<any>;

    public view: ViewContainerRef;

    public subject = new Subject();

    public head = new Subject();

    public modalOptions;

    public backdrop;

    private callBack = Function();

    constructor( private compiler: ComponentFactoryResolver, private containerModal: ContainerModalService) {
    }

    createModalDialog(component: Type<any>, callback) {
      this.view = this.containerModal.getView();
      this.setComponentModal();
      this.injectComponentToModal( component );
      this.setGlobalSettings();
      this.setInitialZIndex();
      this.callBack = callback;
      return this;
    }

    createModal( component: Type<any>, parentElement: ElementRef, callback ) {
        this.view = this.containerModal.getView();
        this.setComponentModal();
        this.injectComponentToModal( component );
        this.setGlobalSettings( parentElement );
        this.setInitialZIndex();
        this.callBack = callback;
        return this;
    }

    setComponentModal() {
        const componentFactory = this.compiler.resolveComponentFactory( TlModal );
        this.component = this.view.createComponent( componentFactory );
        this.componentList.push(this.component);
        (<TlModal>this.component.instance).setServiceControl( this );
        (<TlModal>this.component.instance).setComponentRef( this.component );
        this.setActiveModal(this.component);
    }

    injectComponentToModal( component: Type<any> ) {
        const factoryInject = this.compiler.resolveComponentFactory( component );
        this.componentInjected = (<TlModal>this.component.instance).body.createComponent( factoryInject );
        this.addFormModalToList();
    }

    setGlobalSettings( parent?: ElementRef ) {
        this.modalOptions = Reflect.getOwnMetadata('annotations',
          Object.getPrototypeOf(this.componentInjected.instance).constructor);
        this.setParentElement(parent);
        this.handleBackDrop();
        (<TlModal>this.component.instance).status = 'MAX';
        (<TlModal>this.component.instance).setOptions( this.modalOptions[0] );
    }

    setParentElement(parent: ElementRef) {
      if (this.modalOptions && parent) {
        this.modalOptions[0]['parentElement'] = parent;
      }
    }

    handleBackDrop() {
      if (this.modalOptions[0].backdrop) {
        this.createBackdrop(TlBackdrop);
      }
    }

    setInitialZIndex() {
        lastZIndex++;
        (<TlModal>this.component.instance).modal.nativeElement.style.zIndex = lastZIndex;
    }

    setZIndex( componentRef?: ComponentRef<any>, element?: ElementRef ) {
        this.setActiveModal( componentRef );
        lastZIndex = this.getHighestZIndexModals( this.getZIndexModals() );
        element.nativeElement.style.zIndex = lastZIndex + 1;
    }

    getZIndexModals() {
        const maxZIndex = [];
        const modals = document.querySelectorAll( 'tl-modal' );
        for ( let index = 0; index < modals.length; index++ ) {
            const element: any = modals[ index ];
            maxZIndex.push( element.firstElementChild.style.zIndex );
        }
        return maxZIndex;
    }

    getHighestZIndexModals( arrayModals: Array<any> ) {
        return Math.max.apply( Math, arrayModals );
    }

    setActiveModal( componentRef?: ComponentRef<any> ) {
        this.activeModal = componentRef;
        this.head.next({activeModal: this.activeModal});
    }

    createBackdrop( backdrop ) {
      this.view = this.containerModal.getView();
        const backdropFactory = this.compiler.resolveComponentFactory( backdrop );
        this.backdrop = this.view.createComponent( backdropFactory );
    }

    showModal( item: ComponentRef<any> ) {
        lastZIndex++;
        item.location.nativeElement.firstElementChild.style.zIndex = lastZIndex;
        item.instance.element.nativeElement.style.display = 'block';
    }

    minimize( component: ComponentRef<any> ) {
        component.instance.status = 'MIN';
        component.instance.element.nativeElement.style.display = 'none';
        this.handleActiveWindow();
    }

    close( component: ComponentRef<any> ) {
        if ( this.view === undefined || component === undefined ) {
            return;
        }
        this.view.remove( this.view.indexOf( this.handleComponentList( component ) ) );
        this.handleModalForms( component );
        this.subject.next(this.forms);
        this.removeOfTheList();
        this.removeBackdrop();
    }

    handleComponentList( component ) {
        let comp = component;
        this.componentList.forEach( ( value ) => {
            if ( value.location.nativeElement === component ) {
                comp = value;
            }
        } );
        return comp;
    }

    handleModalForms( component: ComponentRef<any> ) {
        if ( this.forms.length > 0 ) {
            const index = this.forms.indexOf( component );
            this.forms.splice( index, 1 );
        }
        this.setActiveWindow();
    }

    handleActiveWindow() {
        const visibleHighestZIndex = [];
        this.getVisibleModals().forEach( ( value, index2, array ) => {
            visibleHighestZIndex.push( value.firstElementChild.style.zIndex );
        } );

        const highest = this.getHighestZIndexModals( visibleHighestZIndex );

        this.forms.forEach( ( value, index2, array ) => {
            if ( this.getVisibleModals().length === 0 ) {
                return this.setActiveModal(null);
            }
            if ( Number( value.instance.modal.nativeElement.style.zIndex ) === Number( highest ) ) {
                return this.setActiveModal(value);
            }
        } );
    }

    getVisibleModals() {
        const visibleModals = [];
        const modals = document.querySelectorAll( 'tl-modal' );

        for ( let index = 0; index < modals.length; index++ ) {
            const element: any = modals[ index ];
            if ( element.style.display !== 'none' ) {
                visibleModals.push( modals[ index ] );
            }
        }
        return visibleModals;
    }

    setActiveWindow() {
        let maxZindex = [];
        if ( (this.getVisibleModals().length - 1) <= 0 ) {
            return this.setActiveModal(null);
        }
        maxZindex = this.forms;
        this.sortArrayByZIndex( maxZindex );
        this.setActiveModal(maxZindex[ maxZindex.length - 1 ]);
    }

    sortArrayByZIndex( array: Array<any> ) {
        return array.sort( ( a, b ) => {
            return a.location.nativeElement.firstElementChild.style.zIndex -
              b.location.nativeElement.firstElementChild.style.zIndex;
        } );
    }

    addFormModalToList() {
        this.forms.push( this.component );
        this.subject.next(this.forms);
    }

    removeOfTheList() {
        this.componentList.splice( this.componentList.length - 1, 1 );
        this.sortComponentsByZIndex();
    }

    removeBackdrop() {
        if (this.backdrop) {
            this.view.remove( this.view.indexOf(this.backdrop) );
        }
    }

    sortComponentsByZIndex() {
        this.componentList.sort( ( a, b ) => {
            return a.location.nativeElement.children[ 0 ].style.zIndex - b.location.nativeElement.children[ 0 ].style.zIndex;
        } );
    }

    execCallBack( result: any, component? ): Promise<any> {
        return new Promise((resolve, reject) => {
            this.setMdResult( result );
            if ( this.isResultUndefined() ) {
                return;
            }
            if ( !(this.isMdResultEqualsNone( result.mdResult )) ) {
                this.close(component);
            }
            setTimeout(() => {
                this.resultCallback();
                resolve();
            }, 500);
        });
    }

    isMdResultEqualsNone( mdResult: ModalResult ) {
        return Number( mdResult ) === Number( ModalResult.MRCUSTOM );
    }

    isResultUndefined() {
        return this.componentInjected.instance.modalResult === undefined;
    }

    setMdResult( mdResult: ModalResult ) {
        this.componentInjected.instance.modalResult = mdResult;
    }

    resultCallback() {
      if (this.componentInjected.instance.modalResult) {
        this.callBack( this.componentInjected.instance.modalResult );
      }
    }

    on(event, callback) {
      this.component.instance[event].subscribe(callback);
      return this;
    }

    ngOnDestroy() {
        lastZIndex = 1;
    }
}
