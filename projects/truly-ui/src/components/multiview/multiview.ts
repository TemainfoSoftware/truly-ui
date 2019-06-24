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
  Input, ContentChildren, Component, QueryList, forwardRef, AfterContentInit, Renderer2, ViewChild, AfterViewInit,
  Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';

import { TlView } from './view/view';

const globalListeners = [];

@Component( {
  selector: 'tl-multiview',
  templateUrl: './multiview.html',
  styleUrls: [ './multiview.scss' ],
} )
export class TlMultiView implements AfterViewInit, AfterContentInit, OnDestroy, OnChanges {

  @Input() modelValue: string;

  @Input() transitionTime = '300ms';

  @Input() height = '100%';

  @Input() backdroungColor = 'transparent';

  @ContentChildren( forwardRef( () => TlView ) ) views: QueryList<TlView>;

  @ViewChild( 'multiViewContainer', {static: true} ) multiViewContainer;

  @ViewChild( 'multiViewTranslate', {static: true} ) multiViewTranslate;

  @Output() private selectedChange: EventEmitter<any> = new EventEmitter();

  private moving = false;

  private viewBounding = [];

  private mouseClickPositionX;

  private selectedView;

  private currentTranslatePosition = 0;

  private translateAreaWidth;

  private movement = '';

  private movementPosition;

  constructor( private renderer: Renderer2 ) {}


  ngOnChanges( changes: SimpleChanges ) {
    if (  !( changes['modelValue'].firstChange)) {
      this.changeModelValue( changes['modelValue'].currentValue );
    }
  }

  changeModelValue( value ) {
    this.modelValue = value;
    this.selectedChange.emit( value );
    this.changeViewSelected( value );
  }


  ngAfterContentInit() {
    this.handleViewBounding();
    this.listenMouseDown();
    this.listenMouseUp();
    this.listenMouseMove();
    this.listenMouseLeave();
    const selectedView = this.views.find( view => view.selected );
    if ( !selectedView && this.views.first ) {
      this.views.first.selected = true;
    }
  }

  ngAfterViewInit() {
    this.setWidthMultiView();
    this.setWidthEachView();
    this.handleSelectedView();
  }

  setWidthEachView() {
    this.views.forEach( ( item, index ) => {
      item.viewComponents.nativeElement.style.width = this.multiViewContainer.nativeElement.offsetWidth + 'px';
      if ( index > 0 ) {
        item.viewComponents.nativeElement.style.left = this.multiViewContainer.nativeElement.offsetWidth + 'px';
      }
    } );
  }

  handleSelectedView() {
    if (!this.selectedView) {
      this.selectedView = this.viewBounding[ 0 ];
    }
  }

  handleViewBounding() {
    this.views.forEach( ( item, index ) => {
      if ( !item.value ) {
        item.value = index + 1;
      }
      this.viewBounding.push( {
        viewItem: item,
        viewPosition: Math.round( this.multiViewContainer.nativeElement.offsetWidth * (index) )
      } );
    } );
    this.changeViewSelected(this.modelValue);
  }

  setWidthMultiView() {
    this.renderer.setStyle( this.multiViewTranslate.nativeElement, 'width',
      this.multiViewContainer.nativeElement.offsetWidth * this.views.toArray().length + 'px' );
  }

  listenMouseDown() {
    globalListeners.push( this.renderer.listen( this.multiViewContainer.nativeElement, 'mousedown', ( $event ) => {
      this.mouseClickPositionX = $event.clientX;
      this.moving = true;
    } ) );
  }

  listenMouseLeave() {
    this.renderer.listen( this.multiViewContainer.nativeElement, 'mouseleave', () => {
      this.moving = false;
      this.snapViewPosition();
    } );
  }

  listenMouseUp() {
    globalListeners.push( this.renderer.listen( document, 'mouseup', () => {
      this.moving = false;
      this.snapViewPosition();
    } ) );
  }

  snapViewPosition() {
    const translateSnap = this.multiViewTranslate.nativeElement.offsetWidth / this.views.length;
    this.translateAreaWidth = translateSnap * (this.views.length - 1);
    if ( this.isDistanceMovedEnoughToSnap(this.getDistanceMoved(), translateSnap) ) {
      this.isForwardMove() ? this.handleDragForward() : this.handleDragBackward();
    } else {
      this.translateSection( '-' + this.selectedView.viewPosition, this.transitionTime );
    }
  }

  getDistanceMoved() {
    let distanceMoved = parseInt( String( this.movementPosition ).replace( '-', '' ), 10 );
    if ( !this.isSelectedViewIndexGreaterThanZero() ) {
      return distanceMoved;
    }
    distanceMoved = this.isForwardMove() ? (distanceMoved - this.selectedView.viewPosition) :
      (this.selectedView.viewPosition - distanceMoved);
    return distanceMoved;
  }

  isSelectedViewIndexGreaterThanZero() {
    return this.viewBounding.indexOf( this.selectedView ) > 0;
  }

  isDistanceMovedEnoughToSnap(distanceMoved, translateSnap) {
    return distanceMoved > (translateSnap / 3);
  }

  isForwardMove() {
    return this.movement === 'forward';
  }

  handleDragForward() {
    const translatePos = parseInt( String( this.currentTranslatePosition ).replace( '-', '' ), 10 );
    if ( (translatePos > this.selectedView.viewPosition) ) {
      const index = this.viewBounding.indexOf( this.selectedView ) + 1;
      if ( this.viewBounding[ index ] ) {
        this.changeModelValue(this.viewBounding[ index ].viewItem.value);
      }
    }
  }

  handleDragBackward() {
    const translatePos = parseInt( String( this.currentTranslatePosition ).replace( '-', '' ), 10 );
    if ( translatePos < this.selectedView.viewPosition ) {
      const index = this.viewBounding.indexOf( this.selectedView ) - 1;
      if ( this.viewBounding[ index ] ) {
        this.changeModelValue( this.viewBounding[ index ].viewItem.value );
      }
    }
  }

  listenMouseMove() {
    globalListeners.push( this.renderer.listen( window, 'mousemove', ( $event ) => {
      if ( this.moving ) {
        this.translateMove( $event );
      }
    } ) );
  }

  translateSection( translate: any, time: string ) {
    this.currentTranslatePosition = translate;
    this.handleDuration( time );
    this.setTranslate( this.currentTranslatePosition );
  }

  translateMove( $event, time? ) {
    this.movementPosition = this.getMousePosition( $event );
    const translatePos = this.getTranslateCurrentPosition();
    this.setMoveDirection( $event );

    if ( this.isMoving( translatePos ) ) {
      this.movementPosition = $event.movementX - translatePos;
    }
    if ( this.isFirstAndFinished( $event, translatePos ) ) {
      this.setTranslate( '-' + this.viewBounding[ 0 ].viewPosition );
      return;
    }
    if ( this.isLastAndFinished( $event, translatePos ) ) {
      this.setTranslate( '-' + this.viewBounding[ this.viewBounding.length - 1 ].viewPosition );
      return;
    }
    this.handleMovingSlow( time );
  }

  getTranslateCurrentPosition() {
    return parseInt( String( this.currentTranslatePosition ).replace( '-', '' ), 10 );
  }

  handleMovingSlow( time ) {
    this.handleDuration( time );
    this.setTranslate( this.movementPosition );
    this.currentTranslatePosition = this.movementPosition;
  }

  getMousePosition( $event ) {
    return this.multiViewTranslate.nativeElement.offsetLeft + $event.clientX - this.mouseClickPositionX;
  }

  setTranslate( value: any ) {
    this.renderer.setStyle( this.multiViewTranslate.nativeElement, 'transform', 'translateX(' + value + 'px)' );
  }

  isLastAndFinished( $event: MouseEvent, translatePos: number ) {
    return ($event.movementX <= 0) && (translatePos >= this.translateAreaWidth);
  }

  isMoving( translatePos: number ) {
    return translatePos > 0;
  }

  isFirstAndFinished( $event: MouseEvent, translatePos: number ) {
    return (translatePos === 0) && ( $event.movementX >= 0 );
  }

  setMoveDirection( $event: MouseEvent ) {
    $event.movementX < 0 ? this.movement = 'forward' : this.movement = 'backward';
  }

  handleDuration( time: string ) {
    time ? this.setTransitionStyle( time ) : this.removeTransitionStyle();
  }

  setTransitionStyle( time: string ) {
    this.renderer.setStyle( this.multiViewTranslate.nativeElement, 'transition', 'all ' + time );
  }

  removeTransitionStyle() {
    this.renderer.removeStyle( this.multiViewTranslate.nativeElement, 'transition' );
  }

  selectView( view: TlView ) {
    if ( !view ) {
      return console.warn( 'TlView with value [' + this.modelValue + '] not found.' );
    }
    this.viewBounding.forEach( item => item.viewItem.selected = false );
    this.selectedView = view;
    view.selected = true;
  }

  changeViewSelected( value: string ) {
    if ( (this.viewBounding.length > 0) && (value) ) {
      const view = this.viewBounding.filter( ( item ) => item.viewItem.value === value );
      this.selectView( view[ 0 ] );
      this.translateSection( '-' + view[ 0 ].viewPosition, this.transitionTime );
    }
  }

  ngOnDestroy() {
    globalListeners.forEach( ( value ) => {
      value();
    } );
  }

}

