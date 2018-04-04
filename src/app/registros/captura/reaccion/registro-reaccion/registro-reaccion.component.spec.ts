import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroReaccionComponent } from './registro-reaccion.component';

describe('RegistroReaccionComponent', () => {
  let component: RegistroReaccionComponent;
  let fixture: ComponentFixture<RegistroReaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroReaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroReaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
