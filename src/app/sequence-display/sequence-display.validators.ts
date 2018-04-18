import { AbstractControl } from "@angular/forms";

export class SequenceValidator {
  static createValidator(nucleotideConvert: any) {
    console.log("nucleotideConvert: ", nucleotideConvert);
    return (originalSequenceControl: AbstractControl) => {
      const sequence = originalSequenceControl.value;
      const sequenceErrors = [];
      sequence.split("").forEach(char => {
        const complementChar = nucleotideConvert[char];
        if (!complementChar) {
          sequenceErrors.push(char);
        }
      });
      return sequenceErrors.length > 0 ? { sequenceErrors } : null;
    };
  }
}
