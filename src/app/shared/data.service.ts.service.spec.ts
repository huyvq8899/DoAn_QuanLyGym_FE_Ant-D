/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Data.service.tsService } from './data.service.ts.service';

describe('Service: Data.service.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Data.service.tsService]
    });
  });

  it('should ...', inject([Data.service.tsService], (service: Data.service.tsService) => {
    expect(service).toBeTruthy();
  }));
});
