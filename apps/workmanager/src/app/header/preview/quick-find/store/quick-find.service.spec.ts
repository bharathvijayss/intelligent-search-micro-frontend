/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { QuickFindService } from './quick-find.service';

describe('Service: IntelligentSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickFindService]
    });
  });

  it('should ...', inject([QuickFindService], (service: QuickFindService) => {
    expect(service).toBeTruthy();
  }));
});
