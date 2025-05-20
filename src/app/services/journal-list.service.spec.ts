import { TestBed } from '@angular/core/testing';

import { JournalListService } from './journal-list.service';

describe('JournalListService', () => {
  let service: JournalListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
