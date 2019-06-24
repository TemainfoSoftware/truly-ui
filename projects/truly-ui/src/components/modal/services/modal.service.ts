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
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Injectable,
  OnDestroy,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {Subject} from 'rxjs';
import {SmartFormConfiguration} from '../classes/modal-smart-form';
import {ModalOptions} from '../interfaces/modal-options';
import {ContainerModalService} from '../addons/container-modal/container-modal.service';
import {TlModal} from '../modal';
import {TlBackdrop} from '../../core/components/backdrop/backdrop';
import {ActionsModal} from '../../core/enums/actions-modal';
import {ModalResult} from '../../core/enums/modal-result';
import {TlDialogConfirmation} from '../../dialog/dialog-confirmation/dialog-confirmation';
import {ModalFormConfig} from '../interfaces/modal-smart-form-config';
import {ModalInstance} from '../interfaces/modal-instance';
import {TlDialogInfo} from '../../dialog/dialog-info/dialog-info';
import {I18nService} from '../../i18n/i18n.service';

let lastZIndex = 500;

@Injectable()
export class ModalService implements OnDestroy {

  public instanceComponent: ModalInstance;

  public componentList: ModalInstance[] = [];

  public changeModal = new Subject();

  public frontModal = new Subject();

  public activeModal: ComponentRef<any>;

  public componentInjected: ComponentRef<any>;

  private modalShow = new Subject();

  private component: ComponentRef<TlModal>;

  private view: ViewContainerRef;

  private modalConfiguration: SmartFormConfiguration;

  private selectedModal: ModalInstance;

  private modalOptions: ModalOptions;

  private backdrop: ComponentRef<TlBackdrop>;

  private eventCallback: EventEmitter<any>;

  private visibleModals = [];

  private referenceSmartForm;

  constructor( private i18nService: I18nService,
               private containerModal: ContainerModalService ) {
  }

  createModalDialog( component: Type<any>, factoryResolver, mdOptions ) {
    this.view = this.containerModal.view;
    return new Promise( ( resolve ) => {
      this.setComponentModal( component, factoryResolver, null, null, mdOptions );
      this.handleCallbackModal( resolve );
    } );
  }

  createModal( component: Type<any>, factoryOrConfig: ComponentFactoryResolver,
               identifier: string = '', parentElement: ElementRef = null, mdOptions?: ModalOptions ) {
    this.view = this.containerModal.view;
    return new Promise( ( resolve ) => {
      this.setComponentModal( component, factoryOrConfig, identifier, parentElement, mdOptions );
      this.handleCallbackModal( resolve );
    } );
  }

  createSmartFormModal( component: Type<any>, formConfig: ModalFormConfig, mdOptions?: ModalOptions ) {
    this.view = this.containerModal.view;
    this.modalConfiguration = Object.assign( new SmartFormConfiguration(), formConfig );
    return new Promise( ( resolve ) => {
      this.setComponentModal( component, this.modalConfiguration, null, null, mdOptions );
      this.handleCallbackModal( resolve );
    } );
  }

  private handleCallbackModal( resolve ) {
    if ( this.instanceComponent ) {
      this.instanceComponent.eventCallback.subscribe( ( value ) => {
        resolve( value );
      } );
    }
  }

  private isConfigSmartForm( config ) {
    return config instanceof SmartFormConfiguration;
  }

  private setInjectedComponent( factory, component ) {
    const factoryInject = factory.resolveComponentFactory( component );
    this.componentInjected = (<TlModal>this.component.instance).body.createComponent( factoryInject );
  }

  private createComponentWrapper( factory: ComponentFactoryResolver ) {
    const componentFactory = factory.resolveComponentFactory( TlModal );
    this.component = this.view.createComponent( componentFactory );
    (<TlModal>this.component.instance).setServiceControl( this );
    (<TlModal>this.component.instance).setComponentRef( this.component );
    this.reallocateComponent();
  }

  private handleSmartFormTitle( config ) {
    if ( this.isConfigSmartForm( config ) ) {
      if ( (<SmartFormConfiguration>this.instanceComponent.smartForm).titleByAction ) {
        const isActionInsert = (<SmartFormConfiguration>this.instanceComponent.smartForm).isInsertAction();
        this.replaceTitleModal( isActionInsert ? this.i18nService.getLocale().Modal.includingMessage :
          this.i18nService.getLocale().Modal.updatingMessage );
      }
    }
  }

  private replaceTitleModal( value: string ) {
    this.component.instance.title = `${value} ${this.component.instance.title}`;
  }

  private setModalOptions( mdOptions: ModalOptions ) {
    this.modalOptions = null;
    this.modalOptions = Reflect.getOwnMetadata( 'annotations',
      Object.getPrototypeOf( this.componentInjected.instance ).constructor );
    this.modalOptions = Object.assign( this.modalOptions[ 0 ], mdOptions );
  }

  private setComponentWrapperProperties( config, identifier, parentElement ) {
    (<TlModal>this.component.instance).setOptions( this.modalOptions );
    (<TlModal>this.component.instance).setIdentifier( this.isConfigSmartForm( config ) ? config[ 'identifier' ] : identifier );
    (<TlModal>this.component.instance).setParentElement( this.isConfigSmartForm( config ) ? config[ 'parentElement' ] : parentElement );
  }


  private setInstanceComponent( config: ComponentFactoryResolver | SmartFormConfiguration ) {
    this.instanceComponent = {
      id: this.component.instance.id,
      modal: this.component,
      componentInjected: this.componentInjected,
      modalOptions: this.modalOptions,
      eventCallback: new Subject(),
      smartForm: config
    };
  }

  private isModalExists( config ) {
    return this.componentList.filter( ( value, index, array ) => config.identifier === value.id )[ 0 ];
  }

  private isUniqueSmartForm( config ) {
    return config.unique;
  }

  private validateUnique( config ) {
    return this.isConfigSmartForm( config ) && this.isModalExists( config ) && this.isUniqueSmartForm( config );
  }

  private isSmartFormUpdateDeleteAction( config ) {
    return this.isConfigSmartForm( config ) && (this.isUpdateAction( config ) || this.isDeleteAction( config ));
  }

  private setComponentModal( component: Type<any>,
                             config: SmartFormConfiguration | ComponentFactoryResolver,
                             identifier?, parentElement?, mdOptions?: ModalOptions ) {

    const factory = this.isConfigSmartForm( config ) ? config[ 'factory' ] : config;
    if ( this.isSmartFormUpdateDeleteAction( config ) && !this.validateDataFormUpdate( config ) ) {
      return;
    }

    if ( this.validateUnique( config ) && !this.isDeleteAction( config ) ) {
      this.showModal( this.isModalExists( config ).modal );
      return;
    }

    this.createComponentWrapper( factory );
    this.setInitialZIndex();
    this.setInjectedComponent( factory, component );
    this.setModalOptions( mdOptions );
    this.handleBackDrop( factory );
    this.setComponentWrapperProperties( config, identifier, parentElement );
    this.setInstanceComponent( config );
    this.setActiveModal( this.component );
    this.addNewComponent();
    this.handleSmartFormTitle( config );
    this.emitChangeListModals();
    this.handleDeleteSmartForm( config );
  }

  private addNewComponent() {
    this.componentList.push( this.instanceComponent );
  }

  private emitChangeListModals() {
    this.changeModal.next();
  }

  private handleDeleteSmartForm( config: SmartFormConfiguration | ComponentFactoryResolver ) {
    if ( this.isConfigSmartForm( config ) ) {
      if ( this.isDeleteAction( config ) ) {
        this.confirmDelete( this.instanceComponent );
      }
    } else {
      if ( this.instanceComponent.componentInjected.instance instanceof TlDialogConfirmation ) {
        if ( this.referenceSmartForm ) {
          this.removeOfList( this.referenceSmartForm.id );
          this.view.remove( this.view.indexOf( this.referenceSmartForm.modal ) );
        }
      }
    }
  }

  private isUpdateAction( component ) {
    return component.executeAction === ActionsModal.UPDATE;
  }

  private validateDataFormUpdate( component ) {
    if ( !component[ 'dataForm' ] ) {
      this.createModalDialog( TlDialogInfo, component[ 'factory' ], null );
      this.componentInjected.instance.message = component[ 'recordNotFoundMessage' ];
      return false;
    }
    return true;
  }

  close( id ?: string ) {
    if ( id ) {
      const itemList = this.getComponentById( id );
      this.removeOfView( itemList.modal );
      this.removeBackdrop( itemList.modal );
      this.removeOfList( id );
      return;
    }
    if ( this.selectedModal ) {
      this.removeOfView( this.selectedModal.modal );
      this.removeBackdrop( this.selectedModal.modal );
      this.removeOfList( this.selectedModal.id );
    }
  }

  minimizeAll() {
    this.componentList.forEach( ( item: ModalInstance ) => {
      this.minimize( item.modal );
    } );
  }

  private removeOfView( modal ) {
    this.view.remove( this.view.indexOf( modal ) );
    this.view.element.nativeElement.removeChild( modal.location.nativeElement );
  }

  closeAll() {
    if (this.view) {
      this.view.clear();
      this.componentList = [];
      this.destroyBackdrop();
    }
  }

  private removeOfList( id: string ) {
    this.componentList = this.componentList.filter( ( item ) => item.id !== id );
  }

  getModal( identifier: string ) {
    this.selectedModal = this.componentList.filter( ( item ) => item.id === identifier )[ 0 ];
    return this;
  }

  private handleBackDrop( factory: ComponentFactoryResolver ) {
    if ( this.modalOptions.backdrop ) {
      this.createBackdrop( TlBackdrop, factory );
    }
  }

  private setInitialZIndex() {
    lastZIndex++;
    (<TlModal>this.component.instance).modal.nativeElement.style.zIndex = lastZIndex;
  }

  private setZIndex( componentRef: ComponentRef<TlModal> ) {
    const element = componentRef.instance.getElementModal();
    lastZIndex = this.getHighestZIndexModals( this.getZIndexModals() );
    element.nativeElement.style.zIndex = lastZIndex + 10;
    this.updateZIndexBackdrop( lastZIndex + 5, this.hasBackdrop( componentRef ) );
  }

  private updateZIndexBackdrop( index: number, hasBackdrop: boolean ) {
    if ( this.backdrop && hasBackdrop ) {
      (<TlBackdrop>this.backdrop.instance).setBackdropOptions( { 'zIndex': index } );
    }
  }

  private getZIndexModals() {
    const maxZIndex = [];
    const modals = this.getVisibleModals();
    for ( let index = 0; index < modals.length; index++ ) {
      const element: any = modals[ index ];
      maxZIndex.push( element.firstElementChild.style.zIndex );
    }
    return maxZIndex;
  }

  private getHighestZIndexModals( arrayModals: Array<any> ) {
    return Math.max.apply( Math, arrayModals );
  }

  hasBackdrop( componentRef ) {
    const modalOptions = this.getCurrentModalOptions( componentRef );
    if ( modalOptions.length > 0 ) {
      return modalOptions[ 0 ].modalOptions.backdrop;
    }
    return false;
  }

  setActiveModal( componentRef: ComponentRef<any> ) {
    this.setZIndex( componentRef );
    this.activeModal = componentRef;
    this.frontModal.next( { activeModal: this.activeModal } );
  }

  getCurrentModalOptions( compRef: ComponentRef<any> ) {
    return this.componentList.filter( ( item, index, array ) => item.modal === compRef );
  }

  private createBackdrop( backdrop: Type<any>, factoryResolver: ComponentFactoryResolver ) {
    if ( !this.backdrop ) {
      this.view = this.containerModal.view;
      const backdropFactory = factoryResolver.resolveComponentFactory( backdrop );
      this.backdrop = this.view.createComponent( backdropFactory );
      (<TlBackdrop>this.backdrop.instance).setBackdropOptions( { 'zIndex': lastZIndex - 1 } );
      this.reallocateBackdrop();
    }
  }

  private reallocateComponent() {
    this.view.element.nativeElement.insertAdjacentElement( 'afterbegin', (this.component.location.nativeElement) );
  }

  private reallocateBackdrop() {
    this.view.element.nativeElement.insertAdjacentElement( 'afterbegin', (<TlBackdrop>this.backdrop.instance).backdrop.nativeElement );
  }

  showModal( item: ComponentRef<any> ) {
    lastZIndex++;
    item.location.nativeElement.firstElementChild[ 'style' ].zIndex = lastZIndex;
    item.instance.element.nativeElement.style.display = 'block';
    this.handleShowBackdrop( this.hasBackdrop( item ) );
    this.setActiveModal( item );
    this.modalShow.next();
  }

  minimize( component: ComponentRef<any> ) {
    component.instance.element.nativeElement.style.display = 'none';
    this.handleHideBackdrop( this.hasBackdrop( component ) );
    this.handleActiveWindow();
  }

  private getVisibleHighestZIndex() {
    return this.getHighestZIndexModals( this.getZIndexModals() );
  }

  private handleActiveWindow() {
    const highest = this.getVisibleHighestZIndex();
    this.componentList.forEach( ( value ) => {
      if ( this.visibleModals.length === 0 ) {
        this.hideBackdrop();
        return this.activeModal = null;
      }
      if ( Number( value.modal.instance.modal.nativeElement.style.zIndex ) === Number( highest ) ) {
        return this.setActiveModal( value.modal );
      }
    } );
    this.handleResetIndex();
  }

  handleResetIndex() {
    if (this.componentList.length === 0) {
      this.resetZIndex();
    }
  }

  private resetZIndex() {
    lastZIndex = 500;
  }

  hideBackdrop() {
    if ( this.backdrop ) {
      this.backdrop.instance.hideBackdrop();
    }
  }

  private handleHideBackdrop( hasBackdrop: boolean ) {
    if ( this.backdrop && hasBackdrop ) {
      this.backdrop.instance.hideBackdrop();
    }
  }

  private handleShowBackdrop( hasBackdrop: boolean ) {
    if ( this.backdrop && hasBackdrop ) {
      this.backdrop.instance.showBackdrop();
    }
  }

  private getVisibleModals() {
    this.visibleModals = [];
    const modals = document.querySelectorAll( 'tl-modal' );
    for ( let index = 0; index < modals.length; index++ ) {
      const element: any = modals[ index ];
      if ( element.style.display !== 'none' ) {
        this.visibleModals.push( modals[ index ] );
      }
    }
    return this.visibleModals;
  }

  private removeBackdrop( compRef: ComponentRef<any> ) {
    if ( this.backdrop && this.hasBackdrop( compRef ) ) {
      this.destroyBackdrop();
    }
  }

  private destroyBackdrop() {
    if (this.backdrop) {
      this.backdrop.destroy();
      this.view.element.nativeElement.removeChild( this.backdrop.location.nativeElement );
      this.backdrop = null;
    }
  }

  private getComponentById( id: string ) {
    return this.componentList.filter( ( item ) => item.id === id )[ 0 ];
  }

  execCallBack( result: any, id: string ): Promise<any> {
    const componentModal = this.getComponentById( id );
    return new Promise( ( resolve ) => {
      if ( this.isResultUndefined( result.mdResult ) ) {
        return;
      }
      if ( !(this.isMdResultEqualsOK( result.mdResult )) ) {
        this.close( id );
        this.handleRelativeDataSource( componentModal );
      } else if ( componentModal.modalOptions.closeOnOK ) {
        this.close( id );
        this.handleRelativeDataSource( componentModal );
      }
      this.resultCallback( componentModal, result );
      this.handleActiveWindow();
      resolve();
    } );
  }

  private handleRelativeDataSource( componentModal: ModalInstance ) {
    if ( componentModal.smartForm && componentModal.smartForm['relativeDataSource'] ) {
      componentModal.smartForm['relativeDataSource'].setFocus();
    }
  }

  private resultCallback( component, result ) {
    component.eventCallback.next( result );
    this.handleSmartFormCallback( component, result );
  }

  private confirmDelete( component: ModalInstance ) {
    if ( component.smartForm[ 'executeAction' ] === ActionsModal.DELETE ) {
      this.referenceSmartForm = component;
      this.createModalDialog( TlDialogConfirmation, this.referenceSmartForm.smartForm[ 'factory' ], null ).then( ( value: any ) => {
        if ( value.mdResult === ModalResult.MRYES ) {
          this.handleSmartFormCallback( this.referenceSmartForm,
            { formResult: this.referenceSmartForm.smartForm[ 'dataForm' ] } );
        }
      } );
      this.componentInjected.instance.message = this.referenceSmartForm.smartForm[ 'deleteConfirmationMessage' ];
      return true;
    }
    return false;
  }

  private isDeleteAction( component ) {
    return component.executeAction === ActionsModal.DELETE;
  }

  private handleSmartFormCallback( component: ModalInstance, result ) {
    if ( this.isResultNotAllowed( component.smartForm, result )
      || !this.isConfigSmartForm( component.smartForm ) ) {
      return;
    }
    if ( this.mathActionsModal( component.smartForm ).length === 0 ) {
      throw Error( 'The Action provided is not valid or is undefined' );
    }
    this.executeAction( component.smartForm, result );
  }

  private mathActionsModal( component: ComponentFactoryResolver | SmartFormConfiguration ) {
    return Object.keys( ActionsModal ).filter( ( value, index, array ) =>
    ActionsModal[ value ] === component[ 'executeAction' ] );
  }

  private executeAction( smartForm: ComponentFactoryResolver | SmartFormConfiguration, result ) {
    const actions = {
      'I': () => {
        smartForm[ 'actions' ].insertCall( result.formResult );
      },
      'U': () => {
        smartForm[ 'actions' ].updateCall( result.formResult );
      },
      'D': () => {
        smartForm[ 'actions' ].deleteCall( result.formResult );
      },
      'V': () => {
        smartForm[ 'actions' ].viewCall();
      }
    };
    return actions[ smartForm[ 'executeAction' ] ]();
  }

  private isResultNotAllowed( smartForm: ComponentFactoryResolver | SmartFormConfiguration, result ) {
    return result.mdResult === ModalResult.MRCANCEL || result.mdResult === ModalResult.MRCLOSE
      || !smartForm[ 'actions' ];
  }

  private isResultUndefined( result: ModalResult ) {
    return result === undefined;
  }

  private isMdResultEqualsOK( result: ModalResult ) {
    return Number( result ) === Number( ModalResult.MROK );
  }

  ngOnDestroy() {
    lastZIndex = 1;
  }

}
