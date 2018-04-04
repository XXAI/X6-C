import { TestBed, inject } from '@angular/core/testing';

import { RegistroCapacitacionService } from './registro-capacitacion.service';

describe('RegistroCapacitacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroCapacitacionService]
    });
  });

  it('should be created', inject([RegistroCapacitacionService], (service: RegistroCapacitacionService) => {
    expect(service).toBeTruthy();
  }));
});
