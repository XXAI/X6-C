import { TestBed, inject } from '@angular/core/testing';

import { DenunciaService } from './denuncia.service';

describe('DenunciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DenunciaService]
    });
  });

  it('should be created', inject([DenunciaService], (service: DenunciaService) => {
    expect(service).toBeTruthy();
  }));
});
