import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "dna-rna-converter-display",
  templateUrl: "./dna-rna-converter-display.component.html",
  styleUrls: ["./dna-rna-converter-display.component.css"]
})
export class DnaRnaConverterDisplayComponent {
  form: FormGroup;
  nucleotideConvert: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.http.get("./assets/nucleotide-complements.json").subscribe(data => {
      this.nucleotideConvert = data;
    });
    this.form = this.fb.group({
      original: [""],
      complement: { value: "", disabled: true },
      reverse: { value: "", disabled: true },
      reverseComplement: { value: "", disabled: true }
    });
    this.form.get("original").valueChanges.subscribe(sequence => {
      this.form.get("complement").setValue(this.getComplement(sequence));
      this.form.get("reverse").setValue(this.getReverse(sequence));
      this.form
        .get("reverseComplement")
        .setValue(this.getReverseComplement(sequence));
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
