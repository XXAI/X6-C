import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaMuestraComponent } from './captura-muestra.component';

describe('CapturaMuestraComponent', () => {
  let component: CapturaMuestraComponent;
  let fixture: ComponentFixture<CapturaMuestraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaMuestraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
