import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { nucleotidesDna, nucleotidesRna } from "../assets/nucleotides";

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

  constructor() {
    this.nucleotidesRawDataDna = nucleotidesDna;
    this.nucleotidesRawData = nucleotidesDna;
    this.nucleotideDnaConvert = (nucleotidesDna as any).reduce(
      (nucleotideConvert, nucleotideObj) => {
        nucleotideConvert[nucleotideObj["Base"]] =
          nucleotideObj["ComplementBase"];
        nucleotideConvert[nucleotideObj["Base"].toLowerCase()] = nucleotideObj[
          "ComplementBase"
        ].toLowerCase();
        return nucleotideConvert;
      },
      {}
    );

    this.nucleotidesRawDataRna = nucleotidesRna;
    this.nucleotideRnaConvert = (nucleotidesRna as any).reduce(
      (nucleotideConvert, nucleotideObj) => {
        nucleotideConvert[nucleotideObj["Base"]] =
          nucleotideObj["ComplementBase"];
        nucleotideConvert[nucleotideObj["Base"].toLowerCase()] = nucleotideObj[
          "ComplementBase"
        ].toLowerCase();
        return nucleotideConvert;
      },
      {}
    );
    this.selectNucleotideType(this.nucleotideType.getValue());
    this.loaded.next(true);
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
