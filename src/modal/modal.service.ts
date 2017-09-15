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
import { ComponentFactoryResolver, Injectable, ViewContainerRef, OnDestroy } from '@angular/core';
import { TlModal } from './modal';
import { ModalResult } from '../core/enums/modal-result';
import { TlBackdrop } from '../backdrop/backdrop';
import set = Reflect.set;

let lastZIndex = 1;

@Injectable()
export class ModalService implements OnDestroy {

    public component;

    public componentList: any[] = [];

    public componentInjected;

    public backdrop;

    public forms = [];

    public activeModal;

    public view: ViewContainerRef;

    public minModals: any[] = [];

    private callBack = Function();

    constructor( private compiler: ComponentFactoryResolver ) {}

    setView( view ) {
        this.view = view;
    }

    createModal( component, modalOptions, callback ) {
        if (modalOptions.backdrop) {
            this.createBackdrop(TlBackdrop);
        }
        this.setComponentModal();
        this.setComponentInjected( component );
        this.setGlobalSettings( modalOptions );
        this.setInitialZIndex();

        this.callBack = callback;
    }

    setComponentModal() {
        const componentFactory = this.compiler.resolveComponentFactory( TlModal );
        this.component = this.view.createComponent( componentFactory );
        this.componentList.push(this.component);
        (<TlModal>this.component.instance).setServiceControl( this );
        (<TlModal>this.component.instance).setComponentRef( this.component );
        this.activeModal = this.component;
    }

    setComponentInjected( component ) {
        const factoryInject = this.compiler.resolveComponentFactory( component );
        this.componentInjected = (<TlModal>this.component.instance).body.createComponent( factoryInject );
        this.addFormModalToList();
    }

    setGlobalSettings( modalOptions ) {
        (<TlModal>this.component.instance).status = 'MAX';
        (<TlModal>this.component.instance).setOptions( modalOptions );
    }

    setInitialZIndex() {
        lastZIndex++;
        (<TlModal>this.component.instance).modal.nativeElement.style.zIndex = lastZIndex;
    }

    setZIndex( componentRef?, element? ) {
        this.setActiveModal( componentRef );
        lastZIndex = this.getHighestZIndexModals( this.getZIndexModals() );
        element.nativeElement.style.zIndex = lastZIndex + 1;
    }


    getZIndexModals() {
        const maxZIndex = [];
        const modals = document.querySelectorAll( 'tl-modal' );
        for ( let index = 0; index < modals.length; index++ ) {
            const element: any = modals[ index ];
            maxZIndex.push( element.firstChild.style.zIndex );
        }
        return maxZIndex;
    }

    getHighestZIndexModals( arrayModals ) {
        return Math.max.apply( Math, arrayModals );
    }

    setActiveModal( componentRef? ) {
        this.activeModal = componentRef;
    }

    createBackdrop( backdrop ) {
        const backdropFactory = this.compiler.resolveComponentFactory( backdrop );
        this.backdrop = this.view.createComponent( backdropFactory );
    }

    setBackdropModalOverModal() {
        setTimeout( () => {
            this.backdrop.instance.backdrop.nativeElement.style.display = 'none';
            this.setBackdropzIndex();
        }, 1 )
    }

    setBackdropzIndex() {
        this.backdrop.instance.backdrop.nativeElement.style.zIndex =
            this.component.instance.element.nativeElement.firstChild.style.zIndex - 1;
        setTimeout( () => {
            this.backdrop.instance.backdrop.nativeElement.style.display = 'block';
        }, 280 );
    }

    showModal( item, indexModal ) {
        lastZIndex++;
        item.location.nativeElement.firstChild.style.zIndex = lastZIndex;
        item.instance.element.nativeElement.style.display = 'block';
        this.minModals.splice( indexModal, 1 );

    }

    minimize( component ) {
        component.instance.status = 'MIN';
        component.instance.element.nativeElement.style.display = 'none';
        this.minModals.push( component );
        this.handleActiveWindow();
    }

    close( component ) {
        this.view.remove( this.view.indexOf( this.handleComponentList( component ) ) );
        this.handleModalForms( component );
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

    handleModalForms( component ) {
        if ( this.forms.length > 0 ) {
            const index = this.forms.indexOf( component );
            this.forms.splice( index, 1 );
        }
        this.setActiveWindow();
    }

    handleActiveWindow() {
        const visibleHighestZIndex = [];
        this.getVisibleModals().forEach( ( value, index2, array ) => {
            visibleHighestZIndex.push( value.firstChild.style.zIndex );
        } );

        const highest = this.getHighestZIndexModals( visibleHighestZIndex );

        this.forms.forEach( ( value, index2, array ) => {
            if ( this.getVisibleModals().length === 0 ) {
                return this.activeModal = null;
            }
            if ( Number( value.instance.modal.nativeElement.style.zIndex ) === Number( highest ) ) {
                return this.activeModal = value;
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

        if ( (this.getVisibleModals().length - 1) === 0 ) {
            return this.activeModal = null;
        }

        maxZindex = this.forms;
        this.sortArrayByZIndex( maxZindex );
        this.activeModal = maxZindex[ maxZindex.length - 1 ];
    }

    sortArrayByZIndex( array ) {
        return array.sort( ( a, b ) => {
            return a.location.nativeElement.firstChild.style.zIndex - b.location.nativeElement.firstChild.style.zIndex
        } );
    }

    addFormModalToList() {
        this.forms.push( this.component );
    }

    removeOfTheList() {
        setTimeout( () => {
            this.componentList.splice( this.componentList.length - 1, 1 );
            this.sortComponentsByZIndex();
        }, 1 );
    }

    removeBackdrop() {
        if (this.backdrop) {
            this.view.remove( this.view.indexOf(this.backdrop) );
        }
    }

    sortComponentsByZIndex() {
        this.componentList.sort( ( a, b ) => {
            return a.location.nativeElement.children[ 0 ].style.zIndex - b.location.nativeElement.children[ 0 ].style.zIndex
        } );
    }

    execCallBack( result: any, component? ) {
        this.setMdResult( result );
        if ( this.isResultUndefined() ) {
            return;
        }
        if ( !(this.isMdResultEqualsNone( result.mdResult )) ) {
            this.close(component);
        }
        this.resultCallback();
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
        this.callBack( this.componentInjected.instance.modalResult );
    }

    ngOnDestroy() {
        lastZIndex = 1;
    }
}
