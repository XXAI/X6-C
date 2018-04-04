import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdiccionalComponent } from './jurisdiccional.component';

describe('JurisdiccionalComponent', () => {
  let component: JurisdiccionalComponent;
  let fixture: ComponentFixture<JurisdiccionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JurisdiccionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JurisdiccionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
