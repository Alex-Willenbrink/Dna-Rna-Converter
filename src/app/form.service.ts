import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";

@Injectable()
export class FormService {
  form: FormGroup = new FormGroup({});
  resetValue: any = {};

  get value(): any {
    return this.form.value;
  }

  get dirty(): boolean {
    return this.form.dirty;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  addForm(formName: string, form: AbstractControl) {
    this.form.addControl(formName, form);
    this.resetValue[formName] = form.value;
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
    this.markTreeAsDirty(this.form);
  }

  reset() {
    this.form.reset(this.resetValue);
  }
}
