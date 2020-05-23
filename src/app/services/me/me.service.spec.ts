import { TestBed } from '@angular/core/testing';

import { MeService } from './me.service';

describe('MeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeService = TestBed.get(MeService);
    expect(service).toBeTruthy();
  });
});
