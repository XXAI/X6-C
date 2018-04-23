import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeterminacionComponent } from './lista-determinacion.component';

describe('ListaDeterminacionComponent', () => {
  let component: ListaDeterminacionComponent;
  let fixture: ComponentFixture<ListaDeterminacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeterminacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeterminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
