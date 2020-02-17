/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppSessionService } from './app-session.service';

describe('Service: AppSession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSessionService]
    });
  });

  it('should ...', inject([AppSessionService], (service: AppSessionService) => {
    expect(service).toBeTruthy();
  }));
});
