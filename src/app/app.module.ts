import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatRadioModule,
  MatDividerModule
} from "@angular/material";
import { AgGridModule } from "ag-grid-angular";
import { ClipboardModule } from "ngx-clipboard";

import { FormService } from "./form.service";
import { SequenceService } from "./sequence.service";

import { AppComponent } from "./app.component";
import { DnaRnaConverterComponent } from "./dna-rna-converter/dna-rna-converter.component";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { SequenceDisplayComponent } from "./sequence-display/sequence-display.component";
import { NucleotideTableComponent } from "./nucleotide-table/nucleotide-table.component";

@NgModule({
  declarations: [
    AppComponent,
    DnaRnaConverterComponent,
    ControlPanelComponent,
    SequenceDisplayComponent,
    NucleotideTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    AgGridModule.withComponents([]),
    ClipboardModule
  ],
  providers: [FormService, SequenceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
