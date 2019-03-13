import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSeguimientoComponent } from './registro-seguimiento.component';

describe('RegistroSeguimientoComponent', () => {
  let component: RegistroSeguimientoComponent;
  let fixture: ComponentFixture<RegistroSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
