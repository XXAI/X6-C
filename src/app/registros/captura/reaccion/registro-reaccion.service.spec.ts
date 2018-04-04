import { TestBed, inject } from '@angular/core/testing';

import { RegistroReaccionService } from './registro-reaccion.service';

describe('RegistroReaccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroReaccionService]
    });
  });

  it('should be created', inject([RegistroReaccionService], (service: RegistroReaccionService) => {
    expect(service).toBeTruthy();
  }));
});
