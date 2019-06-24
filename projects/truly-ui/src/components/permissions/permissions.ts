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
  AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, QueryList, Output, ViewChild,
  ViewChildren, OnChanges, SimpleChanges, ChangeDetectorRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PermissionDataConfig } from './parts/interfaces/permission-dataconfig.interface';
import { Permission } from './parts/models/permission.model';
import { PermissionGroupDirective } from './parts/directives/permission-group.directive';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ListOptionDirective } from '../misc/listoption.directive';
import { I18nService } from '../i18n/i18n.service';

@Component( {
  selector: 'tl-permissions',
  templateUrl: './permissions.html',
  styleUrls: [ './permissions.scss' ],
} )
export class TlPermissions implements OnInit, AfterContentInit, AfterViewInit, OnChanges {

  @Input() data: Array<PermissionDataConfig> = [];

  @Input() permissions: string[] = [];

  @Input() height = '300px';

  @Input() color = 'basic';

  @Input() keyGroup = 'description';

  @Input() keyPermissions = 'permissions';

  @Input() keyPermissionValue = 'permission';

  @Input() keyPermissionDescription = 'description';

  @ViewChildren( PermissionGroupDirective ) permissionGroup: QueryList<PermissionGroupDirective>;

  @ViewChildren( ListOptionDirective ) permissionList: QueryList<ListOptionDirective>;

  @ViewChild( 'listGroup', {static: true} ) listGroup: ElementRef;

  @ViewChild( 'listPermission', {static: true} ) listPermission: ElementRef;

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

  public notFound = this.i18n.getLocale().Permissions.notFound;

  public searchGroup = this.i18n.getLocale().Permissions.searchGroup;

  public searchFunctionality = this.i18n.getLocale().Permissions.searchFunctionality;

  public allowColumn = this.i18n.getLocale().Permissions.allowColumnText;

  constructor( private changes: ChangeDetectorRef, private i18n: I18nService ) {
  }

  ngOnInit() {
    this.setUpDataSource();
    this.handleFilterGroup();
    this.handleFilterPermissions();
  }

  ngAfterContentInit() {
    this.handleChangePermissions();
    this.setFirstGroupSelected();
  }

  ngAfterViewInit() {
    this.keyManagerPermissionGroup = new FocusKeyManager( this.permissionGroup );
    this.keyManagerPermissionList = new FocusKeyManager( this.permissionList );
  }

  filterPermissionAllowed( dataSourceItem ) {
    if (this.permissions) {
      return this.permissions.filter( ( item, index, array ) =>
      item[ this.keyPermissionValue ] === dataSourceItem[ this.keyPermissionValue ] );
    }
    return [];
  }

  handleChangePermissions() {
    if ( this.dataSource.length > 0 ) {
      this.dataSource.forEach( ( item: PermissionDataConfig ) => {
        item[ this.keyPermissions ].forEach( ( itemPermission ) => {
          itemPermission['allow'] = this.filterPermissionAllowed( itemPermission ).length > 0;
        } );
        const allowed = item[ this.keyPermissions ].filter( ( permission, index, array ) => permission[ 'allow' ] );
        if ( allowed.length === item[ this.keyPermissions ].length ) {
          item[ 'checked' ] = true;
        } else if ( allowed.length === 0 ) {
          item[ 'checked' ] = false;
        } else {
          item[ 'checked' ] = 'indeterminate';
        }
      } );
    }
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
    if (! ( this.dataSource.length > 0) ) {
      return;
    }
    const selected = this.selectedGroup.filter( ( item ) => item.allow );
    if ( selected.length === 0 ) {
      this.dataSource[ this.selectedGroupIndex ].checked = false;
      return;
    }
    (selected.length === this.selectedGroup.length) ? this.dataSource[ this.selectedGroupIndex ].checked = true :
      this.dataSource[ this.selectedGroupIndex ].checked = 'indeterminate';
  }

  emitChange() {
    const allowed = [];
    this.dataSource.forEach( ( item ) => {
      item[ this.keyPermissions ].forEach( ( permission: Permission ) => {
        if (permission[ 'allow' ]) {
         const clone = Object.assign({}, permission);
         delete clone['allow'];
         allowed.push(clone);
        }
      });
    });
    this.changePermission.emit(allowed);
  }

  setSelectedGroup() {
    if (this.permissionGroup.length > 0) {
      this.dataSourceSelected = this.permissionGroup.filter( ( item ) => item.selected )[ 0 ].permissions;
      return;
    }
    return [];
  }

  selectGroup( selectGroup: PermissionGroupDirective, index: number ) {
    if (selectGroup) {
      this.deselectGroups( selectGroup );
      this.selectedGroupIndex = index;
      this.selectedGroup = selectGroup.permissions;
      this.dataSourceSelected = selectGroup.permissions;
      this.selected = true;
    }
  }

  deselectGroups( selectGroup ) {
    this.permissionGroup.forEach( ( item ) => {
      item.selected = selectGroup === item;
    } );
  }

  filterByGroup( term ) {
    const filtered = this.data.filter( ( item: PermissionDataConfig ) =>
      item[ this.keyGroup ].toLowerCase().includes( term.toLowerCase() ) );
    this.dataSource = JSON.parse( JSON.stringify( filtered ) );
    this.handleChangePermissions();
  }

  filterByRule( term ) {
    this.dataSourceSelected = this.selectedGroup.filter( ( item: Permission ) =>
      item[ this.keyPermissionDescription ].toLowerCase().includes( term.toLowerCase() ) );
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
      this.handleCheckPermission();
    }, 100 );
  }

  setUpDataSource() {
    this.dataSource = JSON.parse( JSON.stringify( this.data ) );
    this.setFirstGroupSelected();
    this.handleChangePermissions();
  }

  setRightListFocus() {
    this.keyManagerPermissionList.setFirstItemActive();
  }

  setLeftListFocus() {
    this.keyManagerPermissionGroup.setActiveItem( this.selectedGroupIndex );
  }

  onCheckGroup( checked: boolean | string ) {
    setTimeout( () => {
      this.selectedGroup.forEach( ( item: Permission ) => {
        item[ 'allow' ] = <boolean>checked;
      } );
      this.emitChange();
    } );
  }

  handleKeyManager( $event: KeyboardEvent, manager: FocusKeyManager<any> ) {
    manager.onKeydown( $event );
  }

  detectChanges() {
    this.changes.detectChanges();
  }

  handleSelectPermission( $event: Event, item: Permission ) {
    this.stopEvent( $event );
    item[ 'allow' ] = !item[ 'allow' ];
    this.handleCheckPermission();
    this.emitChange();
  }

  handleSpaceSelect( $event: Event, item: PermissionDataConfig ) {
    this.stopEvent( $event );
    if ( item.checked === 'indeterminate' ) {
      item.checked = true;
      return this.onCheckGroup( item.checked );
    }
    item.checked = !item.checked;
    this.onCheckGroup( item.checked );
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

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes[ 'permissions' ] ) {
      this.handleChangePermissions();
    }
    if (changes['data']) {
      this.setUpDataSource();
    }
  }


}
