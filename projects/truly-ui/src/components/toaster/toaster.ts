import { AfterContentInit, Component, ComponentRef, OnDestroy, HostBinding, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ToasterService } from './services/toaster.service';

@Component( {
  selector: 'tl-toaster',
  templateUrl: './toaster.html',
  styleUrls: [ './toaster.scss' ],
/*  animations: [
    trigger(
      'enterAnimation', [
        transition( ':enter', [
          style( { transform: 'translateY(-20%)', opacity: 0 } ),
          animate( '200ms', style( { transform: 'translateY(0)', opacity: 1 } ) )
        ] ),
        transition( ':leave', [
          style( { transform: 'translateY(0)', opacity: 1 } ),
          animate( '200ms', style( { transform: 'translateY(100%)', opacity: 0 } ) )
        ] )
      ]
    )
  ],*/
} )
export class TlToaster implements AfterContentInit, OnDestroy {

  @ViewChild('toasterWrapper') toasterWrapper;

  public message = 'Message Description';

  public title = 'Title !';

  public icon;

  public position = '';

  public time = 3000;

  public progressBar = 0;

  public color = 'primary';

  public width = '400px';

  public height = 'auto';

  public componentRef;

  public closeButton = false;

  public progress = false;

  public showIcon = true;

  public topPosition = undefined;

  public bottomPosition = undefined;

  private timeout;

  private interval;

  private heightElement = 0;

  private margin = 20;

  private numberToasters: number;

  private toasterService: ToasterService;

  // @HostBinding( '@enterAnimation' ) animation;

  constructor() {}

  ngAfterContentInit() {
    this.setPosition();
    this.handleProgressBarTime();
    this.handleAutoDestroy();
  }

  handleProgressBarTime() {
    if ( this.progress ) {
      this.interval = setInterval( () => {
        this.progressBar = this.progressBar + 100;
      }, 100 );
    }
  }

  handleAutoDestroy() {
    this.timeout = setTimeout( () => {
      this.autoDestroy();
    }, this.time );
  }

  setProperties( properties ) {
    Object.keys( properties ).forEach( ( item ) => {
      this[ item ] = properties[ item ];
    } );
  }

  setServiceInstance( instanceService: ToasterService ) {
    this.toasterService = instanceService;
  }

  setComponentRef( componentRef: ComponentRef<any> ) {
    this.componentRef = componentRef;
  }

  setPosition() {
    setTimeout(() => {
      this.setHeight();
      this.position.includes('top') ? this.setTopPosition() : this.setBottomPosition();
    });
  }

  setHeight() {
    this.heightElement = this.toasterWrapper.nativeElement.offsetHeight;
  }

  getLeftWidth() {
    const left = parseInt(this.width, 10);
    return left / 2;
  }

  setBottomPosition() {
    this.getNumberToastersBottom();
    this.bottomPosition = this.getPositionToast();
  }

  setTopPosition() {
    this.getNumberToastersTop();
    this.topPosition = this.getPositionToast();
  }

  getPositionToast() {
    return this.numberToasters <= 0 ? 0 :
      (this.numberToasters * this.heightElement) + (this.margin * this.numberToasters) + 'px';
  }

  getListToastersByTopPosition() {
    return this.toasterService.getListToasters().filter((value) => {
      return value.instance.position.includes('top');
    });
  }

  getListToastersByBottomPosition() {
    return this.toasterService.getListToasters().filter((value) => {
      return value.instance.position.includes('bottom');
    });
  }

  autoDestroy() {
    this.toasterService.removeToaster( this.componentRef );
    this.componentRef.destroy();
  }

  getNumberToastersBottom() {
    this.numberToasters = this.getListToastersByBottomPosition().length - 1;
  }

  getNumberToastersTop() {
    this.numberToasters = this.getListToastersByTopPosition().length - 1;
  }

  setTopPositionChange() {
    this.getListToastersByTopPosition().forEach( ( value, index ) => {
      const height = this.toasterWrapper.nativeElement.offsetHeight;
      value.instance.topPosition = (index * height) + ( this.margin * index) + 'px';
    } );
  }

  setPositionChanges() {
    this.position.includes('top') ? this.setTopPositionChange() : this.setBottomPositionChange();
  }

  setBottomPositionChange() {
    this.getListToastersByBottomPosition().forEach( ( value, index ) => {
      const height = this.toasterWrapper.nativeElement.offsetHeight;
      value.instance.bottomPosition = (index * height) + ( this.margin * index) + 'px';
    } );
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.setPositionChanges();
  }

}
