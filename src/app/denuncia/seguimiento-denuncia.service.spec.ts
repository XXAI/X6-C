import { TestBed, inject } from '@angular/core/testing';

import { SeguimientoDenunciaService } from './seguimiento-denuncia.service';

describe('SeguimientoDenunciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeguimientoDenunciaService]
    });
  });

  it('should be created', inject([SeguimientoDenunciaService], (service: SeguimientoDenunciaService) => {
    expect(service).toBeTruthy();
  }));
});
