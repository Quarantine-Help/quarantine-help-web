import { TestBed } from '@angular/core/testing';

import { ParticipantService } from './participant.service';

describe('ParticipantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParticipantService = TestBed.inject(ParticipantService);
    expect(service).toBeTruthy();
  });
});
