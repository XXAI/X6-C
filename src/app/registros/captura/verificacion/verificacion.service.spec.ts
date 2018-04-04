import { TestBed, inject } from '@angular/core/testing';

import { VerificacionService } from './verificacion.service';

describe('VerificacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificacionService]
    });
  });

  it('should be created', inject([VerificacionService], (service: VerificacionService) => {
    expect(service).toBeTruthy();
  }));
});
