import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinEjecutivoComponent } from './boletin-ejecutivo.component';

describe('BoletinEjecutivoComponent', () => {
  let component: BoletinEjecutivoComponent;
  let fixture: ComponentFixture<BoletinEjecutivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinEjecutivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinEjecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
