import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerdemoComponent } from './timepickerdemo.component';

describe('TimePickerdemoComponent', () => {
  let component: TimePickerdemoComponent;
  let fixture: ComponentFixture<TimePickerdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
