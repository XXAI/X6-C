import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinProyectosComponent } from './boletin-proyectos.component';

describe('BoletinProyectosComponent', () => {
  let component: BoletinProyectosComponent;
  let fixture: ComponentFixture<BoletinProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
