import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVerificacionComponent } from './registro-verificacion.component';

describe('RegistroVerificacionComponent', () => {
  let component: RegistroVerificacionComponent;
  let fixture: ComponentFixture<RegistroVerificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroVerificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
