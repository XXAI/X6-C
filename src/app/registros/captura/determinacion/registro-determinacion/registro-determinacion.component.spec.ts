import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeterminacionComponent } from './registro-determinacion.component';

describe('RegistroDeterminacionComponent', () => {
  let component: RegistroDeterminacionComponent;
  let fixture: ComponentFixture<RegistroDeterminacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDeterminacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeterminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
