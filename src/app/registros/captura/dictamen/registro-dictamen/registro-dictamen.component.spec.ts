import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDictamenComponent } from './registro-dictamen.component';

describe('RegistroDictamenComponent', () => {
  let component: RegistroDictamenComponent;
  let fixture: ComponentFixture<RegistroDictamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDictamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
