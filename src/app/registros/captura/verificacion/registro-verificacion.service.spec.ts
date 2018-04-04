import { TestBed, inject } from '@angular/core/testing';

import { RegistroVerificacionService } from './registro-verificacion.service';

describe('RegistroVerificacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroVerificacionService]
    });
  });

  it('should be created', inject([RegistroVerificacionService], (service: RegistroVerificacionService) => {
    expect(service).toBeTruthy();
  }));
});
