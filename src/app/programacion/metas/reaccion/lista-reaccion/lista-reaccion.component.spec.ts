import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReaccionComponent } from './lista-reaccion.component';

describe('ListaReaccionComponent', () => {
  let component: ListaReaccionComponent;
  let fixture: ComponentFixture<ListaReaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
