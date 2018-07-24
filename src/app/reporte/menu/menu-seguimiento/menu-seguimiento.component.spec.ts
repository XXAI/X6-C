import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSeguimientoComponent } from './menu-seguimiento.component';

describe('MenuSeguimientoComponent', () => {
  let component: MenuSeguimientoComponent;
  let fixture: ComponentFixture<MenuSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
