import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaRnaConverterComponent } from './dna-rna-converter.component';

describe('DnaRnaConverterComponent', () => {
  let component: DnaRnaConverterComponent;
  let fixture: ComponentFixture<DnaRnaConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnaRnaConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaRnaConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
