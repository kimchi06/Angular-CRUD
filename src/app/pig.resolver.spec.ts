import { TestBed } from '@angular/core/testing';

import { PigResolver } from './pig.resolver';

describe('PigResolver', () => {
  let resolver: PigResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PigResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
