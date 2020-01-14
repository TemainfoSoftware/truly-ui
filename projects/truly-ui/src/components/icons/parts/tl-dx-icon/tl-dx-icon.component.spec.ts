import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlDxIconComponent } from './tl-dx-icon.component';

describe('DxIconComponent', () => {
  let component: TlDxIconComponent;
  let fixture: ComponentFixture<TlDxIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlDxIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlDxIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
