import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { FormService } from "../form.service";

@Component({
  selector: "control-panel",
  templateUrl: "./control-panel.component.html",
  styleUrls: ["./control-panel.component.css"]
})
export class ControlPanelComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormService) {}

  ngOnInit() {
    this.form = this.fb.group({
      nucleicAcid: "dna",
      sequenceFormat: "raw"
    });
  }
}
