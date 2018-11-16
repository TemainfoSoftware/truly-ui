import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonIconComponent } from './ion-icon.component';

describe('IonIconComponent', () => {
  let component: IonIconComponent;
  let fixture: ComponentFixture<IonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
