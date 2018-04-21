import { AbstractControl } from "@angular/forms";

export class SequenceValidator {
  static createValidator(nucleotideConvert: any) {
    return (originalSequenceControl: AbstractControl) => {
      const sequenceText = originalSequenceControl.value;
      const sequences = sequenceText
        .split("\n")
        .filter(sequence => sequence[0] !== ">");

      const sequenceErrors = [];
      sequences
        .join("")
        .split("")
        .forEach(char => {
          const complementChar = nucleotideConvert[char];
          if (!complementChar) {
            sequenceErrors.push(char);
          }
        });
      return sequenceErrors.length > 0 ? { sequenceErrors } : null;
    };
  }
}
