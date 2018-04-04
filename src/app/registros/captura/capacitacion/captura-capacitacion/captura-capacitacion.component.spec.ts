import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaCapacitacionComponent } from './captura-capacitacion.component';

describe('CapturaCapacitacionComponent', () => {
  let component: CapturaCapacitacionComponent;
  let fixture: ComponentFixture<CapturaCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
