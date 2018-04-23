import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaDeterminacionComponent } from './captura-determinacion.component';

describe('CapturaDeterminacionComponent', () => {
  let component: CapturaDeterminacionComponent;
  let fixture: ComponentFixture<CapturaDeterminacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaDeterminacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaDeterminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
