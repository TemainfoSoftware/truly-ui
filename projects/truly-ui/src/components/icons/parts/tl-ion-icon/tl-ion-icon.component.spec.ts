import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlIonIconComponent } from './tl-ion-icon.component';

describe('IonIconComponent', () => {
  let component: TlIonIconComponent;
  let fixture: ComponentFixture<TlIonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlIonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlIonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
