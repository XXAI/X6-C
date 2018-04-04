import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDictamenComponent } from './lista-dictamen.component';

describe('ListaDictamenComponent', () => {
  let component: ListaDictamenComponent;
  let fixture: ComponentFixture<ListaDictamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDictamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
