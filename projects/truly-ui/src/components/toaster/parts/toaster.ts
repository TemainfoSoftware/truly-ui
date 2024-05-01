import {
  Input, Component, OnInit, OnChanges, OnDestroy, Output, EventEmitter, ElementRef, ViewChild,
  Renderer2
} from '@angular/core';

@Component( {
  selector: 'tl-toaster',
  templateUrl: './toaster.html',
  styleUrls: [ './toaster.scss' ],
} )
export class TlToaster implements OnInit, OnChanges, OnDestroy {

  @Input() toasterID = '';

  @Input() title = 'Title !';

  @Input() icon;

  @Input() message = 'Message Description';

  @Input() position = '';

  @Input() time = 3000;

  @Input() progressBar = 0;

  @Input() color = 'primary';

  @Input() width = '400px';

  @Input() height = 'auto';

  @Input() progress = true;

  @Input() showIcon = true;

  @Output() afterClose = new EventEmitter();

  @Output() closeEvent = new EventEmitter();

  @ViewChild('container', {static: true}) container: ElementRef;

  public interval;

  public timeout;

  constructor(  private renderer: Renderer2 ) {}

  ngOnInit() {
    this.interval = setInterval( () => {
      this.progressBar += 100;
    }, 100 );
  }

  animationDone(event: AnimationEvent) {
    if (event.animationName === 'toasterOut') {
      this.closeEvent.emit(this.toasterID)
    }
  }

  handleClose() {
    this.timeout = setTimeout( () => {
      this.close();
    }, this.time );
  }

  getMessageKeys() {
    return Object.keys( this.message );
  }

  isMessageObject() {
    return typeof this.message === 'object';
  }

  close() {
    this.renderer.setStyle(this.container.nativeElement, 'animation', 'toasterOut 0.3s');
  }

  ngOnChanges(changes) {
    if (changes['time']) {
      this.handleClose();
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

}
