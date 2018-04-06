import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class SequenceService {
  nucleotideConvert: any = {};
  loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.http.get("./assets/nucleotide-complements.json").subscribe(data => {
      this.nucleotideConvert = data;
      this.loaded.next(true);
    });
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
