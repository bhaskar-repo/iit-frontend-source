import { TestBed } from '@angular/core/testing';

import { IssuesrouteguardService } from './issuesrouteguard.service';

describe('IssuesrouteguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssuesrouteguardService = TestBed.get(IssuesrouteguardService);
    expect(service).toBeTruthy();
  });
});
