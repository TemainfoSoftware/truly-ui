import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseCardComponent } from './showcase-card.component';

describe('ShowcaseCardComponent', () => {
  let component: ShowcaseCardComponent;
  let fixture: ComponentFixture<ShowcaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
