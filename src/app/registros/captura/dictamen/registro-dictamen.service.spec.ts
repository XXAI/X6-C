import { TestBed, inject } from '@angular/core/testing';

import { RegistroDictamenService } from './registro-dictamen.service';

describe('RegistroDictamenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroDictamenService]
    });
  });

  it('should be created', inject([RegistroDictamenService], (service: RegistroDictamenService) => {
    expect(service).toBeTruthy();
  }));
});
