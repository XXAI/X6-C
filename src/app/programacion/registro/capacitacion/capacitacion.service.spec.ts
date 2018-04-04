import { TestBed, inject } from '@angular/core/testing';

import { CapacitacionService } from './capacitacion.service';

describe('CapacitacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CapacitacionService]
    });
  });

  it('should be created', inject([CapacitacionService], (service: CapacitacionService) => {
    expect(service).toBeTruthy();
  }));
});
