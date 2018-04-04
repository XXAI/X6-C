import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaDictamenComponent } from './captura-dictamen.component';

describe('CapturaDictamenComponent', () => {
  let component: CapturaDictamenComponent;
  let fixture: ComponentFixture<CapturaDictamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaDictamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
