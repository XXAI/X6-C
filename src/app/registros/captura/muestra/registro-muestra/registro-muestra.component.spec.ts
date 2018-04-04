import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMuestraComponent } from './registro-muestra.component';

describe('RegistroMuestraComponent', () => {
  let component: RegistroMuestraComponent;
  let fixture: ComponentFixture<RegistroMuestraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroMuestraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
