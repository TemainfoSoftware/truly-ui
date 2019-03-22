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
import { ComponentFactoryResolver, ComponentRef, Injectable, Renderer2, ViewContainerRef } from '@angular/core';
import { TlSimpleSubMenu } from '../parts/simple/simple-sub-menu';
import { TlAdvancedSubMenu } from '../parts/advanced/parts/advanced-sub-menu';
import { TlAdvancedRootMenu } from '../parts/advanced/advanced-root-menu';

@Injectable()
export class SubMenuService {

  private renderer: Renderer2;

  private rootMenu;

  private viewSubMenu: ViewContainerRef;

  private viewRootMenu: ViewContainerRef;

  private menu: ComponentRef<any>;

  private subMenuItem: ComponentRef<any>;

  private listComponents = [];

  private subMenuData: any;

  private properties;

  private factoryMenu;

  private subscription;

  private anchorElement: HTMLElement;

  private anchorRootElement;

  private subMenuDataSource;

  constructor( private compiler: ComponentFactoryResolver ) {
  }

  setRenderer( render: Renderer2 ) {
    this.renderer = render;
  }

  setRootMenu( menu ) {
    this.rootMenu = menu.element;
  }

  setViewSubMenu( view: ViewContainerRef ) {
    this.viewSubMenu = view;
  }

  setViewRootMenu( view: ViewContainerRef ) {
    this.viewRootMenu = view;
  }

  setRootHeightChange(height) {
    if (this.menu) {
      (<TlAdvancedRootMenu>this.menu.instance).maxHeight = height;
    }
  }

  setSubMenuData( data, properties ) {
    this.subMenuData = data;
    this.properties = properties;
  }

  setAnchorRootElement( anchorRoot: HTMLElement ) {
    this.anchorRootElement = anchorRoot;
  }

  setAnchorElement( anchor: HTMLElement ) {
    this.anchorElement = anchor;
  }

  createAdvancedMenu() {
    if ( !this.menu ) {
      this.subMenuDataSource = this.subMenuData;
      this.factoryMenu = this.compiler.resolveComponentFactory( TlAdvancedRootMenu );
      this.menu = this.viewRootMenu.createComponent( this.factoryMenu );
      (<TlAdvancedRootMenu>this.menu.instance).setProperties( this.properties );
      (<TlAdvancedRootMenu>this.menu.instance).setDataSubMenu( this.subMenuData ? this.subMenuData : this.subMenuDataSource );
      (<TlAdvancedRootMenu>this.menu.instance).setMenuServiceInstance( this );
      this.listComponents.push( this.menu );
    }
    this.menu.instance.onRootMenuLoad.subscribe( () => {
      this.renderer.appendChild( this.anchorRootElement, this.menu.location.nativeElement );
      this.handleSubItemsAdvancedMenu();
      return;
    } );
    this.handleLoadRootChangeItems();
  }

  handleLoadRootChangeItems() {
    this.subscription = this.menu.instance.onChangeItems.subscribe( () => {
      this.renderer.appendChild( this.anchorRootElement, this.menu.location.nativeElement );
      this.handleSubItemsAdvancedMenu();
    } );
  }

  createSimpleSubMenu() {
    const componentFactory = this.compiler.resolveComponentFactory( TlSimpleSubMenu );
    const subMenu = this.viewRootMenu.createComponent( componentFactory );
    (<TlSimpleSubMenu>subMenu.instance).setProperties( this.properties );
    (<TlSimpleSubMenu>subMenu.instance).setDataSubMenu( this.subMenuData );
    this.subMenuItem = subMenu;
    this.appendSubMenuAnchor( subMenu );
    this.handleSubItemsSimpleSubMenu( subMenu );
  }

  createAdvancedSubMenu( nestedMenu? ) {
    const componentFactory = this.compiler.resolveComponentFactory( TlAdvancedSubMenu );
    const subMenu = this.viewSubMenu.createComponent( componentFactory );
    this.handlePreviousSubMenu( subMenu, nestedMenu );
    (<TlAdvancedSubMenu>subMenu.instance).setProperties( this.properties );
    (<TlAdvancedSubMenu>subMenu.instance).setDataSubMenu( this.subMenuData );
    (<TlAdvancedSubMenu>subMenu.instance).setMenuService( this );
    this.subMenuItem = subMenu;
    this.listComponents.push( subMenu );
    this.appendSubMenuAnchor( subMenu );
    this.handleLoadSubMenu( subMenu );
  }

  handleLoadSubMenu( subMenu ) {
    subMenu.instance.onSubMenuLoad.subscribe( () => {
      this.handleSubItemsAdvancedSubMenu( subMenu );
    } );
  }

  handlePreviousSubMenu( subMenu, nestedMenu ) {
    if ( !nestedMenu ) {
      return subMenu.instance.previousMenu = this.menu.instance;
    }
  }

  handleDockedMenu() {
    setTimeout( () => {
      if ( this.properties.docked ) {
        this.renderer.setStyle( this.viewRootMenu.get( 0 )[ 'rootNodes' ][ 0 ].firstElementChild,
          'left', (parseInt( this.properties.dockWidth, 10 ) + 1) + 'px' );
      }
    }, 1 );
  }

  handleSubItemsAdvancedSubMenu( subMenu ) {
    if ( subMenu.instance.anchorElements.length > 0 ) {
      this.createNewSubItems( subMenu, 'advanced', true );
    }
  }

  handleSubItemsAdvancedMenu() {
    if ( this.menu.instance.anchorElements.length > 0 ) {
      this.createNewSubItems( this.menu, 'advanced' );
      this.subscription.unsubscribe();
    }
  }

  handleSubItemsSimpleSubMenu( subMenu ) {
    setTimeout( () => {
      if ( subMenu.instance.anchorElements.length > 0 ) {
        this.createNewSubItems( subMenu, 'simple' );
      }
    }, 1 );
  }

  createNewSubItems( menu, type, nestedMenu? ) {
    menu.instance.anchorElements.forEach( ( item, index ) => {
      this.setAnchorElement( item.rootElement );
      this.subMenuData = item.subItems;
      type === 'simple' ? this.createSimpleSubMenu() : this.createAdvancedSubMenu( nestedMenu );
      this.setParentNodeSubMenu( item );
      this.handleSubMenuAnchor( menu, index );
    } );
  }

  setParentNodeSubMenu( item ) {
    if ( this.subMenuItem ) {
      this.subMenuItem.instance.parentNode = item.rootElement;
    }
  }

  handleSubMenuAnchor( subMenu, index ) {
    subMenu.instance.anchorElements[ index ][ 'subMenu' ] = this.subMenuItem.instance;
    this.subMenuItem.instance.previousMenu = subMenu.instance;
  }

  appendSubMenuAnchor( subMenu ) {
    if ( !this.anchorElement ) {
      this.anchorElement = this.anchorRootElement;
    }
    this.renderer.appendChild( this.anchorElement, subMenu.location.nativeElement );
  }

  getListComponents() {
    return this.listComponents;
  }

  getSubMenus() {
    return this.listComponents.filter( ( value ) => {
      return value.instance instanceof TlAdvancedSubMenu;
    } );
  }

  resetAdvancedMenu() {
    this.anchorElement = null;
    this.subMenuData = null;
    this.viewSubMenu.clear();
  }

  closeMenu() {
    if (this.menu) {
      (<TlAdvancedRootMenu>this.menu.instance).close();
    }
  }

  clearView() {
    this.viewRootMenu.clear();
    this.viewSubMenu.clear();
    this.listComponents = [];
    this.menu = null;
  }

}
