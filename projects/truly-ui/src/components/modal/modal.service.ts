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
  ComponentFactoryResolver, Injectable, ViewContainerRef, OnDestroy, Type, ElementRef,
  ComponentRef, Injector, ViewRef, EventEmitter
} from '@angular/core';
import { ContainerModalService } from './addons/container-modal/container-modal.service';
import { TlModal } from './modal';
import { ModalResult } from '../core/enums/modal-result';
import { TlBackdrop } from '../core/components/backdrop/backdrop';
import { Subject, Subscription } from 'rxjs';
import { ActionsModal } from '../core/enums/actions-modal';
import { TlDialogConfirmation } from '../dialog/dialog-confirmation/dialog-confirmation';

let lastZIndex = 1;

export interface ModalConfiguration {
  factory: ComponentFactoryResolver;
  executeAction: ActionsModal;
  identifier: string;
  dataForm?: Object;
  deleteMessage?: string;
  parentElement?: ElementRef;
  actions?: {
    insertCall?: Function;
    updateCall?: Function;
    deleteCall?: Function;
    viewCall?: Function;
  };
}


@Injectable()
export class ModalService implements OnDestroy {

  public component: ComponentRef<any>;

  public componentList = [];

  public componentInjected: ComponentRef<any>;

  public activeModal: ComponentRef<any>;

  public view: ViewContainerRef;

  public subject = new Subject();

  public head = new Subject();

  public modalConfiguration: ComponentFactoryResolver | ModalConfiguration;

  private selectedModal;

  public modalOptions;

  public backdrop;

  private callBack = Function();

  private eventCallback: EventEmitter<any>;

  constructor( private containerModal: ContainerModalService ) {
  }

  createModalDialog( component: Type<any>, factoryResolver, callback ) {
    this.view = this.containerModal.getView();
    this.setComponentModal( factoryResolver );
    this.injectComponentToModal( component, factoryResolver );
    this.setGlobalSettings( factoryResolver );
    this.setInitialZIndex();
    this.callBack = callback;
    return this;
  }

  createModal( component: Type<any>, factoryOrConfig: ComponentFactoryResolver | ModalConfiguration,
               identifier: string = '', parentElement: ElementRef = null ) {
    this.modalConfiguration = factoryOrConfig;
    this.eventCallback = new EventEmitter();

    return new Promise( ( resolve, reject ) => {
      this.view = this.containerModal.getView();

      if ( factoryOrConfig[ 'executeAction' ] === ActionsModal.DELETE ) {
        this.createModalDialog( TlDialogConfirmation, factoryOrConfig[ 'factory' ], ( dialog ) => {
          if ( dialog.mdResult === ModalResult.MRYES ) {
            factoryOrConfig[ 'actions' ].deleteCall();
          }
        } );
        this.componentInjected.instance.message = factoryOrConfig[ 'deleteMessage' ];
        return;
      }

      if ( !factoryOrConfig[ 'factory' ] ) {
        this.setComponentModal( factoryOrConfig, identifier );
        this.injectComponentToModal( component, factoryOrConfig );
        this.setGlobalSettings( factoryOrConfig, parentElement );
      } else {
        this.setComponentModal( factoryOrConfig[ 'factory' ], factoryOrConfig[ 'identifier' ] );
        this.injectComponentToModal( component, factoryOrConfig[ 'factory' ] );
        this.setGlobalSettings( factoryOrConfig[ 'factory' ], factoryOrConfig[ 'parentElement' ] );
      }

      this.setInitialZIndex();
      this.eventCallback.subscribe( ( result: any ) => {
        resolve( result );
        if ( result.mdResult === ModalResult.MRCANCEL
          || result === ModalResult.MRCLOSE
          || !factoryOrConfig[ 'actions' ] ) {
          return;
        }
        const instantResult = result.formResult ? result.formResult.value : result;
        switch ( factoryOrConfig[ 'executeAction' ] ) {
          case ActionsModal.INSERT:
            if ( !factoryOrConfig[ 'actions' ].insertCall ) {
              this.throwError( 'INSERT' );
            }
            factoryOrConfig[ 'actions' ].insertCall( instantResult );
            break;
          case ActionsModal.DELETE:
            if ( !factoryOrConfig[ 'actions' ].deleteCall ) {
              this.throwError( 'DELETE' );
            }
            break;
          case ActionsModal.UPDATE:
            if ( !factoryOrConfig[ 'actions' ].updateCall ) {
              this.throwError( 'UPDATE' );
            }
            factoryOrConfig[ 'actions' ].updateCall( instantResult );
            break;
          case ActionsModal.VIEW:
            if ( !factoryOrConfig[ 'actions' ].viewCall ) {
              this.throwError( 'VIEW' );
            }
            factoryOrConfig[ 'actions' ].viewCall( instantResult );
            break;
        }
      } );
    } );
  }

  throwError( type: string ) {
    throw new Error( 'Callback ' + type + ' not implemented' );
  }

  private setComponentModal( compiler, id? ) {
    const componentFactory = compiler.resolveComponentFactory( TlModal );
    this.component = this.view.createComponent( componentFactory );
    this.componentList.push( { componentRef: this.component, identifier: id } );
    this.subject.next( this.component );
    (<TlModal>this.component.instance).setServiceControl( this );
    (<TlModal>this.component.instance).setComponentRef( this.component );
    this.setActiveModal( this.component );
  }

  private injectComponentToModal( component: Type<any>, compiler ) {
    const factoryInject = compiler.resolveComponentFactory( component );
    this.componentInjected = (<TlModal>this.component.instance).body.createComponent( factoryInject );
  }

  getParentModalInjectedView() {
    return this.component.instance.body.parentInjector.view.component.componentRef;
  }

  private setGlobalSettings( factoryResolver, parent?: ElementRef, ) {
    this.modalOptions = Reflect.getOwnMetadata( 'annotations',
      Object.getPrototypeOf( this.componentInjected.instance ).constructor );
    this.setParentElement( parent );
    this.handleBackDrop( factoryResolver );
    (<TlModal>this.component.instance).status = 'MAX';
    (<TlModal>this.component.instance).setOptions( this.modalOptions[ 0 ] );
  }

  private setParentElement( parent: ElementRef ) {
    if ( this.modalOptions && parent ) {
      this.modalOptions[ 0 ][ 'parentElement' ] = parent;
    }
  }

  private handleBackDrop( factoryResolver ) {
    if ( this.modalOptions[ 0 ].backdrop ) {
      this.createBackdrop( TlBackdrop, factoryResolver );
    }
  }

  getModal( identifier: string ) {
    this.selectedModal = null;
    const listFilteredComponent = this.componentList.filter( ( item ) => item.identifier === identifier );
    if ( listFilteredComponent.length > 0 ) {
      this.selectedModal = listFilteredComponent[ 0 ].componentRef;
    }
    return this;
  }

  private setInitialZIndex() {
    lastZIndex++;
    (<TlModal>this.component.instance).modal.nativeElement.style.zIndex = lastZIndex;
  }

  setZIndex( componentRef?: ComponentRef<any>, element?: ElementRef ) {
    this.setActiveModal( componentRef );
    lastZIndex = this.getHighestZIndexModals( this.getZIndexModals() );
    element.nativeElement.style.zIndex = lastZIndex + 1;
  }

  private  getZIndexModals() {
    const maxZIndex = [];
    const modals = document.querySelectorAll( 'tl-modal' );
    for ( let index = 0; index < modals.length; index++ ) {
      const element: any = modals[ index ];
      maxZIndex.push( element.firstElementChild.style.zIndex );
    }
    return maxZIndex;
  }

  private getHighestZIndexModals( arrayModals: Array<any> ) {
    return Math.max.apply( Math, arrayModals );
  }

  private setActiveModal( componentRef?: ComponentRef<any> ) {
    this.activeModal = componentRef;
    this.head.next( { activeModal: this.activeModal } );
  }

  createBackdrop( backdrop, factoryResolver ) {
    this.view = this.containerModal.getView();
    const backdropFactory = factoryResolver.resolveComponentFactory( backdrop );
    this.backdrop = this.view.createComponent( backdropFactory );

    (<TlBackdrop>this.backdrop.instance).setBackdropOptions( {
      'zIndex': 1
    } );

    this.reallocateBackdrop();
  }

  reallocateBackdrop() {
    this.view.element.nativeElement.insertAdjacentElement( 'afterbegin', (<TlBackdrop>this.backdrop.instance).backdrop.nativeElement );
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

  close( component?: ComponentRef<any> ) {
    if ( (this.view === undefined) || (this.selectedModal === null) && !component ) {
      return;
    }
    this.view.remove( this.view.indexOf( component || this.selectedModal ) );
    this.subject.next( this.componentList );
    this.removeOfTheList( component || this.selectedModal );
    this.removeBackdrop();
  }

  private handleActiveWindow() {
    const visibleHighestZIndex = [];
    this.getVisibleModals().forEach( ( value ) => {
      visibleHighestZIndex.push( value.firstElementChild.style.zIndex );
    } );

    const highest = this.getHighestZIndexModals( visibleHighestZIndex );

    this.componentList.forEach( ( value ) => {
      if ( this.getVisibleModals().length === 0 ) {
        return this.setActiveModal( null );
      }
      if ( Number( value.componentRef.instance.modal.nativeElement.style.zIndex ) === Number( highest ) ) {
        return this.setActiveModal( value.componentRef );
      }
    } );
  }

  private getVisibleModals() {
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

  private removeOfTheList( component ) {
    const index = this.componentList.findIndex( ( item ) => item.componentRef === component );
    this.componentList.splice( index, 1 );
    this.sortComponentsByZIndex();
  }

  private removeBackdrop() {
    if ( this.backdrop ) {
      this.view.remove( this.view.indexOf( this.backdrop ) );
    }
  }

  sortComponentsByZIndex() {
    this.componentList.sort( ( a, b ) => {
      return a.componentRef.location.nativeElement.children[ 0 ].style.zIndex
        - b.componentRef.location.nativeElement.children[ 0 ].style.zIndex;
    } );
  }

  execCallBack( result: any, component? ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      this.setMdResult( result );
      if ( this.isResultUndefined() ) {
        return;
      }
      if ( !(this.isMdResultEqualsOK( result.mdResult ))) {
        this.close( component );
      }
      if (this.modalOptions[0].closeOnOK) {
        this.close( component );
      }
      setTimeout( () => {
        this.resultCallback();
        this.handleActiveWindow();
        resolve();
      }, 500 );
    } );
  }

  private isMdResultEqualsOK( mdResult: ModalResult ) {
    return Number( mdResult ) === Number( ModalResult.MROK );
  }

  private isResultUndefined() {
    return this.componentInjected.instance.modalResult === undefined;
  }

  setMdResult( mdResult: ModalResult ) {
    this.componentInjected.instance.modalResult = mdResult;
  }

  resultCallback() {
    if ( this.componentInjected.instance.modalResult ) {
      this.callBack( this.componentInjected.instance.modalResult );
      this.eventCallback.emit( this.componentInjected.instance.modalResult );
    }
  }


  on( event, callback ) {
    this.component.instance[ event ].subscribe( callback );
    return this;
  }

  ngOnDestroy() {
    lastZIndex = 1;
  }
}
