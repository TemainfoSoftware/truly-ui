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
  AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, QueryList, Output, ViewChild,
  ViewChildren
} from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PermissionDataConfig } from './parts/interfaces/permission-dataconfig.interface';
import { Permission } from './parts/models/permission.model';
import { PermissionGroupDirective } from './parts/directives/permission-group.directive';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ListOptionDirective } from '../misc/listoption.directive';

@Component( {
  selector: 'tl-permissions',
  templateUrl: './permissions.html',
  styleUrls: [ './permissions.scss' ],
} )
export class TlPermissions implements OnInit, AfterContentInit, AfterViewInit {

  @Input() data: Array<PermissionDataConfig> = [];

  @Input() permissions: string[] = [];

  @Input() height = '300px';

  @ViewChildren( PermissionGroupDirective ) permissionGroup: QueryList<PermissionGroupDirective>;

  @ViewChildren( ListOptionDirective ) permissionList: QueryList<ListOptionDirective>;

  @ViewChild( 'listGroup' ) listGroup: ElementRef;

  @ViewChild( 'listPermission' ) listPermission: ElementRef;

  @Output() changePermission: EventEmitter<any> = new EventEmitter();

  public keyManagerPermissionGroup: FocusKeyManager<PermissionGroupDirective>;

  public keyManagerPermissionList: FocusKeyManager<ListOptionDirective>;

  public dataSource = [];

  public filterGroup: Subject<any> = new Subject();

  public filterPermissions: Subject<any> = new Subject();

  public selectedGroup: any = [];

  public selectedGroupIndex = 0;

  public selected = false;

  public dataSourceSelected: any = [];

  constructor() {}

  ngOnInit() {
    this.setUpDataSource();
    this.handleFilterGroup();
    this.handleFilterPermissions();
  }

  ngAfterContentInit() {
    this.dataSource.forEach( ( item: PermissionDataConfig ) => {
      item.permissions.forEach(( itemPermission ) => {
        if (this.permissions.indexOf( <string>itemPermission.key) > -1) {
          itemPermission['allow'] = true;
        }
      });
      const allowed = item.permissions.filter((permission, index, array) => permission['allow']);
      if (allowed.length === item.permissions.length) {
        item['checked'] = true;
      } else if (allowed.length === 0) {
        item['checked'] = false;
      } else {
        item['checked'] = 'indeterminate';
      }
    } );
    this.setFirstGroupSelected();
  }

  ngAfterViewInit() {
    this.keyManagerPermissionGroup = new FocusKeyManager( this.permissionGroup );
    this.keyManagerPermissionList = new FocusKeyManager( this.permissionList );
  }

  handleFilterGroup() {
    this.filterGroup.pipe(
      debounceTime( 300 ),
      distinctUntilChanged() ).subscribe( ( term ) => {
      term.length > 0 ? this.filterByGroup( term ) : this.setUpDataSource();
    } );
  }

  handleFilterPermissions() {
    this.filterPermissions.pipe(
      debounceTime( 100 ),
      distinctUntilChanged() ).subscribe( ( term ) => {
      term.length > 0 ? this.filterByRule( term ) : this.setSelectedGroup();
    } );
  }

  handleCheckPermission() {
    const selected = this.selectedGroup.filter( ( item ) => item.allow );
    if ( selected.length === 0 ) {
      this.dataSource[ this.selectedGroupIndex ].checked = false;
      return;
    }
    if ( selected.length === this.selectedGroup.length ) {
      this.dataSource[ this.selectedGroupIndex ].checked = true;
    } else {
      this.dataSource[ this.selectedGroupIndex ].checked = 'indeterminate';
    }
  }

  emitChange(permission) {
    this.changePermission.emit(permission);
  }

  setSelectedGroup() {
    this.dataSourceSelected = this.permissionGroup.filter( ( item ) => item.selected )[ 0 ].permissions;
  }

  selectGroup( selectGroup: PermissionGroupDirective, index: number ) {
    this.deselectGroups( selectGroup );
    this.selectedGroupIndex = index;
    this.selectedGroup = selectGroup.permissions;
    this.dataSourceSelected = selectGroup.permissions;
    this.selected = true;
  }

  deselectGroups( selectGroup ) {
    this.permissionGroup.forEach( ( item ) => {
      item.selected = selectGroup === item;
    } );
  }

  filterByGroup( term ) {
    this.dataSource = this.data.filter( ( item: PermissionDataConfig ) =>
      item.group.toLowerCase().includes( term.toLowerCase() ) );
    this.selected = false;
  }

  filterByRule( term ) {
    this.dataSourceSelected = this.selectedGroup.filter( ( item: Permission ) =>
      item.permission.toLowerCase().includes( term.toLowerCase() ) );
  }

  setFirstPermissionSelected() {
    setTimeout( () => {
      this.keyManagerPermissionList.setFirstItemActive();
    }, 100 );
  }

  setFirstGroupSelected() {
    setTimeout( () => {
      this.keyManagerPermissionGroup.setFirstItemActive();
      this.selectGroup( this.permissionGroup.toArray()[ 0 ], 0 );
    }, 100 );
  }

  setUpDataSource() {
    this.dataSource = this.data;
  }

  setRightListFocus() {
    this.keyManagerPermissionList.setFirstItemActive();
  }

  setLeftListFocus() {
    this.keyManagerPermissionGroup.setActiveItem( this.selectedGroupIndex );
  }

  onCheckGroup( checked: boolean | string ) {
    setTimeout( () => {
      const change = [];
      this.selectedGroup.forEach( ( item: Permission ) => {
        item['allow'] = <boolean>checked;
        change.push({key: item.key, allow: item['allow']});
      });
      this.emitChange(change);
    } );
  }

  handleKeyManager($event: KeyboardEvent, manager: FocusKeyManager<any>) {
    manager.onKeydown($event);
  }

  handleSelectPermission( $event: Event, item: Permission ) {
    this.stopEvent( $event );
    item['allow'] = !item['allow'];
    this.handleCheckPermission();
    this.emitChange([{key: item.key, allow: item['allow']}]);
  }

  handleSpaceSelect( $event: Event, item: PermissionDataConfig ) {
    this.stopEvent( $event );
    if ( item[ 'checked' ] === 'indeterminate' ) {
      item[ 'checked' ] = true;
      return this.onCheckGroup( item[ 'checked' ] );
    }
    item[ 'checked' ] = !item[ 'checked' ];
    this.onCheckGroup( item[ 'checked' ] );
  }

  stopEvent( $event: Event ) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  inputFilterGroup( $event ) {
    this.filterGroup.next( $event );
  }

  inputFilterPermissions( $event ) {
    this.filterPermissions.next( $event );
  }


}
