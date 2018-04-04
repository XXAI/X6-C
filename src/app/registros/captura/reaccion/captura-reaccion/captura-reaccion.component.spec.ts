import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaReaccionComponent } from './captura-reaccion.component';

describe('CapturaReaccionComponent', () => {
  let component: CapturaReaccionComponent;
  let fixture: ComponentFixture<CapturaReaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaReaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaReaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
