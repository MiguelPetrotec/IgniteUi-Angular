/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PropertiesServiceService } from './propertiesService.service';

describe('Service: PropertiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertiesServiceService]
    });
  });

  it('should ...', inject([PropertiesServiceService], (service: PropertiesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
