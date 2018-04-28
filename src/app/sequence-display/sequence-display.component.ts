import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  AbstractControl
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { saveAs } from "file-saver";
import { MatSnackBar } from "@angular/material";

import { SequenceValidator } from "./sequence-display.validators";
import { FormService } from "../form.service";
import { SequenceService } from "../sequence.service";

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "sequence-display",
  templateUrl: "./sequence-display.component.html",
  styleUrls: ["./sequence-display.component.css"]
})
export class SequenceDisplayComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  display: any = { complement: false, reverse: false, reverseComplement: true };

  get originalSequence(): AbstractControl {
    return this.form.get("original");
  }

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private sequenceService: SequenceService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      original: ["", SequenceValidator.createValidator({})],
      complement: { value: "", disabled: true },
      reverse: { value: "", disabled: true },
      reverseComplement: { value: "", disabled: true }
    });

    this.formService.addForm("sequences", this.form);
  }

  ngOnInit() {
    this.form.get("original").valueChanges.subscribe(sequence => {
      if (this.form.get("original").valid) {
        this.form
          .get("complement")
          .setValue(this.sequenceService.getComplement(sequence));
        this.form
          .get("reverse")
          .setValue(this.sequenceService.getReverse(sequence));
        this.form
          .get("reverseComplement")
          .setValue(this.sequenceService.getReverseComplement(sequence));
      } else {
        this.form.get("complement").setValue("");
        this.form.get("reverse").setValue("");
        this.form.get("reverseComplement").setValue("");
      }
    });

    const subscription = this.sequenceService.loaded.subscribe(loaded => {
      if (loaded) {
        this.revalidateOriginalSequence();
      }
    });

    // subscribe to nucleotide type changes
    this.sequenceService.nucleotideType.subscribe(value => {
      this.revalidateOriginalSequence();
    });

    // subscribe to display option changes
    this.formService.form
      .get("controlPanel")
      .get("display")
      .valueChanges.subscribe(value => {
        this.display = value;
      });
  }

  displaySnackBar(sequenceType: string): void {
    this.snackBar.open(`${sequenceType} Sequence`, "Copied", {
      duration: 1500
    });
  }

  copyToClipboard(str: string) {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  revalidateOriginalSequence(): void {
    this.originalSequence.setValidators(
      SequenceValidator.createValidator(this.sequenceService.nucleotideConvert)
    );
    this.originalSequence.updateValueAndValidity();
  }

  resetOriginalSequence(): void {
    this.form.get("original").setValue("");
  }

  download(controlName: string): void {
    const sequence = this.form.get(controlName).value;
    const blob = new Blob([sequence], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, `${controlName}.txt`);
  }

  async upload(files: FileList): Promise<void> {
    const fileContents = await this.readFile(files[0]);
    this.form.get("original").setValue(fileContents);
    (document.getElementById("file-upload") as any).value = "";
  }

  triggerClickUpload() {
    document.getElementById("file-upload").click();
  }

  readFile(file: File) {
    const reader = new FileReader();
    const fileContents = new Promise(resolve => {
      reader.onload = () => {
        resolve(reader.result);
      };
    });

    reader.readAsText(file);
    return fileContents;
  }
}
