import { TestBed, inject } from '@angular/core/testing';

import { DeterminacionService } from './determinacion.service';

describe('DeterminacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeterminacionService]
    });
  });

  it('should be created', inject([DeterminacionService], (service: DeterminacionService) => {
    expect(service).toBeTruthy();
  }));
});
