import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-showcase-table-events',
  templateUrl: './showcase-table-events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./showcase-table-events.component.scss'],
})
export class ShowcaseTableEventsComponent implements AfterViewInit {

  @Input('data') data = [];

  public parameters;

  constructor(private change: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.hasParams();
  }

  hasParams() {
    this.parameters = this.data.filter((value, index, array) => {
      return value.parameters;
    });
    this.change.detectChanges();
  }

}
