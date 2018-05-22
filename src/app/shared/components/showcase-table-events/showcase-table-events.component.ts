import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase-table-events',
  templateUrl: './showcase-table-events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./showcase-table-events.component.scss'],
})
export class ShowcaseTableEventsComponent implements AfterViewInit, OnInit {

  @Input('data') data = [];

  public parameters;

  constructor(private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.data.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

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
