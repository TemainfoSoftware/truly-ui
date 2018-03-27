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
import { ComponentFactoryResolver, ComponentRef, Injectable, Renderer2, ViewContainerRef } from '@angular/core';
import { TlSimpleSubMenu } from '../parts/simple/simple-sub-menu';

@Injectable()
export class SubMenuService {

  private renderer: Renderer2;

  private rootMenu;

  private view: ViewContainerRef;

  private component: ComponentRef<any>;

  private subMenuData: any;

  private properties;

  private anchorElement: HTMLElement;

  constructor( private compiler: ComponentFactoryResolver ) {
  }

  setRenderer( render: Renderer2 ) {
    this.renderer = render;
  }

  setRootMenu( menu ) {
    this.rootMenu = menu.element;
  }

  setViewContainerRef( view: ViewContainerRef ) {
    this.view = view;
  }

  setSubMenuData( data, properties ) {
    this.subMenuData = data;
    this.properties = properties;
  }

  setAnchorElement( anchor: HTMLElement ) {
    this.anchorElement = anchor;
  }

  createSimpleSubMenu() {
    const componentFactory = this.compiler.resolveComponentFactory( TlSimpleSubMenu );
    this.component = this.view.createComponent( componentFactory );
    (<TlSimpleSubMenu>this.component.instance).setProperties( this.properties );
    (<TlSimpleSubMenu>this.component.instance).setDataSubMenu( this.subMenuData );
    this.appendSubMenuAnchor();
    this.hasMoreSubItems();
  }

  handleDockedMenu() {
    setTimeout(() => {
      if (this.properties.docked) {
        this.renderer.setStyle(this.view.get(0)['rootNodes'][0].firstElementChild,
          'left', (parseInt(this.properties.dockWith, 10) + 1) + 'px');
      }
    }, 1);
  }

  hasMoreSubItems() {
    setTimeout(() => {
      if ((<TlSimpleSubMenu>this.component.instance).anchorElements.length > 0) {
        this.createNewSubItems((<TlSimpleSubMenu>this.component.instance).anchorElements);
      }
    }, 1);
  }

  createNewSubItems( subItem ) {
    subItem.forEach((item) => {
      this.setAnchorElement(item.rootElement);
      this.subMenuData = item.subItems;
      this.createSimpleSubMenu();
    });
  }

  appendSubMenuAnchor() {
    this.renderer.appendChild( this.anchorElement, this.component.location.nativeElement );
  }

  clearView() {
    this.view.clear();
  }

}
