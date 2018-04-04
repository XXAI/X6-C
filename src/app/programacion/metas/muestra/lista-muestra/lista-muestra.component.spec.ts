import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMuestraComponent } from './lista-muestra.component';

describe('ListaMuestraComponent', () => {
  let component: ListaMuestraComponent;
  let fixture: ComponentFixture<ListaMuestraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMuestraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
