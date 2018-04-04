import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCapacitacionComponent } from './lista-capacitacion.component';

describe('ListaCapacitacionComponent', () => {
  let component: ListaCapacitacionComponent;
  let fixture: ComponentFixture<ListaCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
