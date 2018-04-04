import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCapacitacionComponent } from './registro-capacitacion.component';

describe('RegistroCapacitacionComponent', () => {
  let component: RegistroCapacitacionComponent;
  let fixture: ComponentFixture<RegistroCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
