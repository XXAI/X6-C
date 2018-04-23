import { TestBed, inject } from '@angular/core/testing';

import { RegistroDeterminacionService } from './registro-determinacion.service';

describe('RegistroDeterminacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroDeterminacionService]
    });
  });

  it('should be created', inject([RegistroDeterminacionService], (service: RegistroDeterminacionService) => {
    expect(service).toBeTruthy();
  }));
});
