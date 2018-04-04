import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaVerificacionComponent } from './captura-verificacion.component';

describe('CapturaVerificacionComponent', () => {
  let component: CapturaVerificacionComponent;
  let fixture: ComponentFixture<CapturaVerificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaVerificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
