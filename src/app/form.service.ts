import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";

@Injectable()
export class FormService {
  private formGroup: FormGroup = new FormGroup({});
  resetValue: any = {};

  get value(): any {
    return this.formGroup.value;
  }

  get dirty(): boolean {
    return this.formGroup.dirty;
  }

  get valid(): boolean {
    return this.formGroup.valid;
  }

  addForm(formName: string, formGroup: FormGroup) {
    this.formGroup.addControl(formName, formGroup);
    this.resetValue[formName] = formGroup.value;
  }

  markTreeAsDirty(formNode: AbstractControl) {
    formNode.markAsDirty();
    if (formNode instanceof FormGroup) {
      for (const formNodeChildName in formNode.controls) {
        this.markTreeAsDirty(formNode.controls[formNodeChildName]);
      }
    }
  }

  markAllAsDirty() {
    this.markTreeAsDirty(this.formGroup);
  }

  reset() {
    this.formGroup.reset(this.resetValue);
  }
}
