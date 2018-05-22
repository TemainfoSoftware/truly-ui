import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlMessageValidationComponent } from './messagevalidation.component';

describe('MessagevalidationComponent', () => {
  let component: TlMessageValidationComponent;
  let fixture: ComponentFixture<TlMessageValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlMessageValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlMessageValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
