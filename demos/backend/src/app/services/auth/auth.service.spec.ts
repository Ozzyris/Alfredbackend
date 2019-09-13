import { TestBed, inject } from '@angular/core/testing';

import { auth_service } from './auth.service';

describe('auth_service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [auth_service]
    });
  });

  it('should be created', inject([auth_service], (service: auth_service) => {
    expect(service).toBeTruthy();
  }));
});
