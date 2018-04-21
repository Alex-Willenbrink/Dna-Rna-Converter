import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable()
export class SequenceService {
  nucleotideDnaConvert: any = {};
  nucleotideRnaConvert: any = {};
  nucleotideConvert: any = {};

  nucleotidesRawDataDna: any = [];
  nucleotidesRawDataRna: any = [];
  nucleotidesRawData: any = [];

  nucleotideType: BehaviorSubject<string> = new BehaviorSubject("DNA");

  loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    const dnaNucleotideRequest = this.http.get("./assets/nucleotides-dna.json");
    const rnaNucleotideRequest = this.http.get("./assets/nucleotides-rna.json");
    forkJoin(dnaNucleotideRequest, rnaNucleotideRequest).subscribe(data => {
      this.nucleotidesRawDataDna = data[0];

      this.nucleotidesRawData = data[0];
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

      this.nucleotidesRawDataRna = data[1];
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
        this.nucleotidesRawData = this.nucleotidesRawDataDna;
        this.nucleotideType.next("DNA");
        break;
      case "RNA":
        this.nucleotideConvert = this.nucleotideRnaConvert;
        this.nucleotidesRawData = this.nucleotidesRawDataRna;
        this.nucleotideType.next("RNA");
        break;
    }
  }

  getComplement(sequenceText: string): string {
    return sequenceText
      .split("\n")
      .map(sequence => {
        return sequence[0] !== ">"
          ? sequence
              .trim()
              .split("")
              .map(char => this.nucleotideConvert[char])
              .join("")
          : sequence;
      })
      .join("\n");
  }

  getReverse(sequenceText: string): string {
    return sequenceText
      .split("\n")
      .map(sequence => {
        return sequence[0] !== ">"
          ? sequence
              .trim()
              .split("")
              .reverse()
              .join("")
          : sequence;
      })
      .join("\n");
  }

  getReverseComplement(sequenceText: string): string {
    return sequenceText
      .split("\n")
      .map(sequence => {
        return sequence[0] !== ">"
          ? sequence
              .trim()
              .split("")
              .map(char => this.nucleotideConvert[char])
              .reverse()
              .join("")
          : sequence;
      })
      .join("\n");
  }
}
