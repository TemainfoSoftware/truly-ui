'use strict';
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
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from '../../../i18n/i18n.service';
import { TlDatatable } from '../../datatable';
import { DatatableHelpersService } from '../../services/datatable-helpers.service';
import { TlDatatableRow } from '../../parts/column/datatable-row';
import { TlDatatableCell } from '../../parts/datatable-cell';
import { FocusKeyManager } from '@angular/cdk/a11y';


@Component( {
  selector: 'tl-datatable-scrollable-mode',
  templateUrl: './datatable-scrollable-mode.html',
  styleUrls: [ './datatable-scrollable-mode.scss', '../../datatable.scss' ],
  providers: [ DatatableHelpersService ],
  entryComponents: [ TlDatatableRow, TlDatatableCell ]
} )
export class TlDatatableScrollableMode implements OnChanges {

  @Input( 'data' ) data;

  public loading = false;

  get notFountText() {
    return this.i18n.getLocale().Datatable.notFoundText;
  }

  private keyManager: FocusKeyManager<TlDatatableRow>;

  @ViewChildren( TlDatatableRow ) items: QueryList<TlDatatableRow>;

  constructor( @Inject( forwardRef( () => TlDatatable ) ) public dt: TlDatatable,
               private renderer: Renderer2,
               private cd: ChangeDetectorRef,
               private helperService: DatatableHelpersService,
               private i18n: I18nService,
  ) {
  }

  ngOnChanges( changes: SimpleChanges ): void {
    if ( changes[ 'data' ].currentValue ) {
      setTimeout( () => {
        this.keyManager = new FocusKeyManager( this.items );
      } );
    }
  }

  onKeydown( event ) {
    this.keyManager.onKeydown( event );
  }
}
