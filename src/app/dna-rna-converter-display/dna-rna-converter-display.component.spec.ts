import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaRnaConverterDisplayComponent } from './dna-rna-converter-display.component';

describe('DnaRnaConverterDisplayComponent', () => {
  let component: DnaRnaConverterDisplayComponent;
  let fixture: ComponentFixture<DnaRnaConverterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnaRnaConverterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaRnaConverterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
