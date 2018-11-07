import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DxIconComponent } from './dx-icon.component';

describe('DxIconComponent', () => {
  let component: DxIconComponent;
  let fixture: ComponentFixture<DxIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
