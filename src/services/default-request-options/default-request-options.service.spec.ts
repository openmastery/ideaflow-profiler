/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefaultRequestOptions } from './default-request-options.service';

describe('DefaultRequestOptions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultRequestOptions]
    });
  });

  it('should ...', inject([DefaultRequestOptions], (service: DefaultRequestOptions) => {
    expect(service).toBeTruthy();
  }));
});
