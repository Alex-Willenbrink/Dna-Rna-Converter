import { TestBed, inject } from '@angular/core/testing';

import { ConvertNucleotideStringService } from './convert-nucleotide-string.service';

describe('ConvertNucleotideStringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvertNucleotideStringService]
    });
  });

  it('should be created', inject([ConvertNucleotideStringService], (service: ConvertNucleotideStringService) => {
    expect(service).toBeTruthy();
  }));
});
