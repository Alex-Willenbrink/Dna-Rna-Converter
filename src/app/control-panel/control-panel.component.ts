import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { FormService } from "../form.service";
import { SequenceService } from "../sequence.service";

@Component({
  selector: "control-panel",
  templateUrl: "./control-panel.component.html",
  styleUrls: ["./control-panel.component.css"]
})
export class ControlPanelComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private sequenceService: SequenceService
  ) {
    this.form = this.fb.group({
      nucleotideType: "DNA",
      display: this.fb.group({
        complement: false,
        reverse: false,
        reverseComplement: true
      })
    });

    this.formService.addForm("controlPanel", this.form);
  }

  ngOnInit() {
    this.form.get("nucleotideType").valueChanges.subscribe(value => {
      this.sequenceService.selectNucleotideType(value);
    });

    this.form.get("display").valueChanges.subscribe(value => {
      // console.log("value: ", value);
    });
  }
}
