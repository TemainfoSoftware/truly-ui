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
  Input, Component, OnDestroy,
  Renderer2, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterContentInit, ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { SubMenuService } from './services/submenu.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'tl-menu',
  templateUrl: './menu.html',
  styleUrls: [ './menu.scss' ],
  providers: [ SubMenuService ],
} )
export class TlMenu implements AfterContentInit, OnChanges, OnDestroy {

  @Input() items = [];

  @Input() label = '';

  @Input() icon = '';

  @Input() subItem = '';

  @Input() dockWidth = '40px';

  @Input() width = '200px';

  @Input() docked = false;

  @Input() charsToSearch = 2;

  @Input() group = '';

  @Input() filterEmptyMessage = 'Nothing to Show';

  @Input() maxHeight = '800px';

  @Input() itemHeight = '30px';

  @Input() topDislocation = 0;

  @Input() widthRootMenu = '250px';

  @Input() outsideBorder = false;

  @Input() inputPlaceholder = 'Search...';

  @Input() titleMenu = 'Main Menu';

  @Input() operationMode: 'click' | 'hover' = 'hover';

  @Input() mode: 'simple' | 'advanced' = 'simple';

  @Input() link = '';

  @ViewChild( 'menuList', { read: ViewContainerRef, static: true } ) menuList: ViewContainerRef;

  private listElement;

  private iconElement;

  private labelElement;

  private iconSubElement;

  private elements =  [];

  private indexSubMenu = 0;

  private callBack = Function();

  private subscription = new Subscription();

  constructor( private renderer: Renderer2,
               private router: Router,
               private subMenuService: SubMenuService,
               private viewRoot: ViewContainerRef ) {
  }

  ngAfterContentInit() {
    this.initializeMenu();
    this.listenWindowResize();
    this.listenDocumentClick();
    this.listenRouteChange();
  }


  listenRouteChange() {
    this.subscription.add(this.router.events.subscribe(() => {
      this.elements.forEach((value, index, array) => {
        this.isRouterActive(value.item) ? this.renderer.addClass( value.element, 'router-active') :
          this.renderer.removeClass(value.element, 'router-active');
      });
    }));
  }

  createList() {
    const list = this.items;
    for ( let item = 0; item < list.length; item++ ) {
      this.createElementList( list[ item ] );
      this.addRootClass();
      this.handleDockedClass();
      this.handleAlwaysActive( list[ item ][ 'alwaysActive' ] );
      this.insertListElementToList();
      this.createElementIcon( list[ item ][ this.icon ] );
      this.createElementLabel( list[ item ][ this.label ] );
      this.orderElements();
      this.createElementIconSubMenu( list[ item ][ this.subItem ] );
      this.handleListenerSubMenu( list[ item ][ this.subItem ] );
      this.handleSubItems( list[ item ] );
    }
  }

  addRootClass() {
    this.renderer.addClass( this.listElement.nativeElement, 'root-list' );
  }

  handleDockedClass() {
    if ( this.docked ) {
      this.renderer.addClass( this.listElement.nativeElement, 'docked' );
      this.renderer.setStyle( this.listElement.nativeElement, 'grid-template-columns', this.dockWidth );
    }
  }

  initializeMenu() {
    this.subMenuService.setRenderer( this.renderer );
    this.subMenuService.setRootMenu( this.menuList );
    this.subMenuService.setViewRootMenu( this.viewRoot );
    this.subMenuService.setViewSubMenu( this.menuList );
    this.createList();
  }

  handleAlwaysActive( value ) {
    if ( value ) {
      this.renderer.addClass( this.listElement.nativeElement, 'always-active' );
    }
  }

  handleSubItems( item ) {
    if ( item[ this.subItem ] ) {
      if ( this.mode === 'simple' ) {
        this.subMenuService.setAnchorRootElement( this.listElement.nativeElement );
        this.subMenuService.setSubMenuData( item[ this.subItem ], this );
        this.subMenuService.createSimpleSubMenu();
        this.subMenuService.handleDockedMenu();
      } else {
        this.subMenuService.setAnchorRootElement( this.menuList.element.nativeElement.children[ 0 ] );
        this.subMenuService.setSubMenuData( item[ this.subItem ], this );
        this.subMenuService.createAdvancedMenu();
        this.subMenuService.handleDockedMenu();
      }
    }
  }

  handleListenerSubMenu( item ) {
    if ( item ) {
      this.listenClickListElement();
    }
  }

  createElementList( item ) {
    this.listElement = new ElementRef( this.renderer.createElement( 'li' ) );
    this.renderer.addClass( this.listElement.nativeElement, 'ui-menulist-item' );
    if (this.isRouterActive(item)) {
      this.renderer.addClass( this.listElement.nativeElement, 'router-active');
    }
    this.listenClickElementList( item );
    this.setStyleListElement();
    this.elements.push({ item: item, element: this.listElement.nativeElement });
  }

  listenDocumentClick() {
    this.subscription.add(this.renderer.listen( document, 'click', ( $event ) => {
      this.subMenuService.closeMenu();
    } ));
  }

  isRouterActive(item) {
    return this.router.url === item[this.link];
  }

  listenClickElementList( item ) {
    this.subscription.add(this.renderer.listen( this.listElement.nativeElement, 'click', ( MouseEvent ) => {
      if ( item[ this.link ] ) {
        this.router.navigate( [ item[ this.link ] ] );
        this.subMenuService.closeMenu();
        return;
      }
      if ( item[ 'callback' ] ) {
        this.callBack = item[ 'callback' ];
        this.callBack( MouseEvent );
        this.subMenuService.closeMenu();
      }
    } ));
  }

  setStyleListElement() {
    this.renderer.setStyle( this.listElement.nativeElement, 'max-width', this.width );
    this.renderer.setStyle( this.listElement.nativeElement, 'height', this.itemHeight );
    this.renderer.setStyle( this.listElement.nativeElement, 'line-height', this.itemHeight );
    this.renderer.setStyle( this.listElement.nativeElement, 'grid-template-columns',
      this.dockWidth + ' 1fr ' + '25px' );
  }

  createElementIcon( icon ) {
    this.iconElement = new ElementRef( this.renderer.createElement( 'i' ) );
    this.renderer.addClass( this.iconElement.nativeElement, icon );
    this.renderer.addClass( this.iconElement.nativeElement, 'icon' );
    this.renderer.addClass( this.iconElement.nativeElement, 'fa' );
    this.renderer.setStyle( this.iconElement.nativeElement, 'height', this.itemHeight );
    this.renderer.setStyle( this.iconElement.nativeElement, 'line-height', this.itemHeight );
  }

  createElementIconSubMenu( subItem ) {
    if ( !this.isDocked() ) {
      this.iconSubElement = new ElementRef( this.renderer.createElement( 'i' ) );
      this.renderer.addClass( this.iconSubElement.nativeElement, 'icon' );
      this.renderer.appendChild( this.listElement.nativeElement, this.iconSubElement.nativeElement );
      if ( subItem ) {
        this.renderer.addClass( this.iconSubElement.nativeElement, 'ion-ios-arrow-forward' );
      }
    }
  }

  listenWindowResize() {
    this.subscription.add(this.renderer.listen( window, 'resize', () => {
      this.subMenuService.setRootHeightChange( this.maxHeight );
    } ));
  }

  listenClickListElement() {
    if ( this.mode === 'advanced' ) {
      this.subscription.add(this.renderer.listen( this.listElement.nativeElement, 'click', ( $event ) => {
        if ( this.isTargetOnListElement( $event ) ) {
          this.subMenuService.getListComponents()[ 0 ].instance.toggleVisibility();
          this.handleVisibilitySubMenu();
        }
      } ));
    }
  }

  handleVisibilitySubMenu() {
    this.subMenuService.getListComponents().forEach( ( value, index ) => {
      if ( (index > 0) && (value.instance.visibilitySubMenu) ) {
        value.instance.toggleVisibility();
      }
    } );
  }

  isTargetOnListElement( $event ) {
    for ( const item of $event.currentTarget.children ) {
      if ( item === $event.target ) {
        return true;
      }
    }
    return false;
  }

  createElementLabel( label ) {
    if ( !this.isDocked() ) {
      this.labelElement = new ElementRef( this.renderer.createElement( 'span' ) );
      this.renderer.addClass( this.labelElement.nativeElement, 'label' );
      this.renderer.setStyle( this.labelElement.nativeElement, 'height', this.itemHeight );
      this.renderer.setStyle( this.labelElement.nativeElement, 'line-height', this.itemHeight );
      this.labelElement.nativeElement.innerHTML = label;
      return;
    }
    this.labelElement = null;
  }

  isDocked() {
    return this.listElement.nativeElement.getAttribute( 'class' ).includes( 'docked' );
  }

  orderElements() {
    this.renderer.appendChild( this.listElement.nativeElement, this.iconElement.nativeElement );
    if ( this.labelElement ) {
      this.renderer.appendChild( this.listElement.nativeElement, this.labelElement.nativeElement );
    }
  }

  insertListElementToList() {
    this.renderer.appendChild( this.menuList.element.nativeElement, this.listElement.nativeElement );
  }

  resetList() {
    this.subMenuService.clearView();
    this.menuList.element.nativeElement.innerHTML = '';
    this.indexSubMenu = 0;
  }

  ngOnChanges( changes: SimpleChanges ) {
    this.handleChangeDocked( changes );
    this.handleChangeItems( changes );
    this.handleChangeMode( changes );
  }

  handleChangeDocked( changes ) {
    if ( changes[ 'docked' ] ) {
      if ( !changes[ 'docked' ].firstChange ) {
        this.resetList();
        this.initializeMenu();
      }
    }
  }

  handleChangeItems( changes ) {
    if ( changes[ 'items' ] ) {
      if ( !changes[ 'items' ].firstChange ) {
        this.initializeMenu();
      }
    }
  }

  handleChangeMode( changes ) {
    if ( changes[ 'mode' ] ) {
      if ( !changes[ 'mode' ].firstChange ) {
        this.resetList();
        this.initializeMenu();
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
