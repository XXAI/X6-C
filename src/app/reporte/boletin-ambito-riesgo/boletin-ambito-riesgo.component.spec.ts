import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinAmbitoRiesgoComponent } from './boletin-ambito-riesgo.component';

describe('BoletinAmbitoRiesgoComponent', () => {
  let component: BoletinAmbitoRiesgoComponent;
  let fixture: ComponentFixture<BoletinAmbitoRiesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinAmbitoRiesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinAmbitoRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
