import { TestBed, inject } from '@angular/core/testing';

import { DictamenService } from './dictamen.service';

describe('DictamenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DictamenService]
    });
  });

  it('should be created', inject([DictamenService], (service: DictamenService) => {
    expect(service).toBeTruthy();
  }));
});
