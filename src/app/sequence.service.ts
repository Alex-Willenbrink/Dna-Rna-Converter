import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable()
export class SequenceService {
  nucleotideDnaConvert: any = {};
  nucleotideRnaConvert: any = {};
  nucleotideConvert: any = {};

  nucleotidesDna: any = [];
  nucleotidesRna: any = [];

  nucleotideType: BehaviorSubject<string> = new BehaviorSubject("DNA");

  loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    const dnaNucleotideRequest = this.http.get("./assets/nucleotides-dna.json");
    const rnaNucleotideRequest = this.http.get("./assets/nucleotides-rna.json");
    forkJoin(dnaNucleotideRequest, rnaNucleotideRequest).subscribe(data => {
      this.nucleotidesDna = data[0];
      this.nucleotideDnaConvert = (data[0] as any).reduce(
        (nucleotideConvert, nucleotideObj) => {
          nucleotideConvert[nucleotideObj["Base"]] =
            nucleotideObj["ComplementBase"];
          nucleotideConvert[
            nucleotideObj["Base"].toLowerCase()
          ] = nucleotideObj["ComplementBase"].toLowerCase();
          return nucleotideConvert;
        },
        {}
      );

      this.nucleotidesRna = data[1];
      this.nucleotideRnaConvert = (data[1] as any).reduce(
        (nucleotideConvert, nucleotideObj) => {
          nucleotideConvert[nucleotideObj["Base"]] =
            nucleotideObj["ComplementBase"];
          nucleotideConvert[
            nucleotideObj["Base"].toLowerCase()
          ] = nucleotideObj["ComplementBase"].toLowerCase();
          return nucleotideConvert;
        },
        {}
      );
      this.selectNucleotideType(this.nucleotideType.getValue());
      this.loaded.next(true);
    });
  }

  selectNucleotideType(nucleotideType: string): void {
    switch (nucleotideType) {
      case "DNA":
        this.nucleotideConvert = this.nucleotideDnaConvert;
        this.nucleotideType.next("DNA");
        break;
      case "RNA":
        this.nucleotideConvert = this.nucleotideRnaConvert;
        this.nucleotideType.next("RNA");
        break;
    }
  }

  getComplement(sequence: string): string {
    return sequence
      .split("")
      .map(char => this.nucleotideConvert[char])
      .join("");
  }

  getReverse(sequence: string): string {
    return sequence
      .split("")
      .reverse()
      .join("");
  }

  getReverseComplement(sequence: string): string {
    return sequence
      .split("")
      .map(char => this.nucleotideConvert[char])
      .reverse()
      .join("");
  }
}
