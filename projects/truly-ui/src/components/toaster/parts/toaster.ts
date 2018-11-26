import { Input, Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component( {
  selector: 'tl-toaster',
  templateUrl: './toaster.html',
  styleUrls: [ './toaster.scss' ],
  animations: [
    trigger(
      'enterAnimation', [
        transition( ':enter', [
          style( { transform: 'translateY(-20%)', opacity: 0 } ),
          animate( '200ms', style( { transform: 'translateY(0)', opacity: 1 } ) )
        ] ),
      ]
    )
  ],
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

  public interval;

  public timeout;

  constructor( private toasterService: ToasterService ) {}

  ngOnInit() {
    this.interval = setInterval( () => {
      this.progressBar += 100;
    }, 100 );
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
    this.toasterService.close( this.toasterID );
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
