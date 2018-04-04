import { TestBed, inject } from '@angular/core/testing';

import { RegistroMuestraService } from './registro-muestra.service';

describe('RegistroMuestraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroMuestraService]
    });
  });

  it('should be created', inject([RegistroMuestraService], (service: RegistroMuestraService) => {
    expect(service).toBeTruthy();
  }));
});
