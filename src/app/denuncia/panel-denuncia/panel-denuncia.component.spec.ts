import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDenunciaComponent } from './panel-denuncia.component';

describe('PanelDenunciaComponent', () => {
  let component: PanelDenunciaComponent;
  let fixture: ComponentFixture<PanelDenunciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelDenunciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
