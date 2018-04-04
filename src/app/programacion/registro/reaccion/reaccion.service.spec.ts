import { TestBed, inject } from '@angular/core/testing';

import { ReaccionService } from './reaccion.service';

describe('ReaccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReaccionService]
    });
  });

  it('should be created', inject([ReaccionService], (service: ReaccionService) => {
    expect(service).toBeTruthy();
  }));
});
