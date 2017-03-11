/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlossaryService } from './glossary.service';

describe('GlossaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
  });

  it('should ...', inject([GlossaryService], (service: GlossaryService) => {
    expect(service).toBeTruthy();
  }));
});
