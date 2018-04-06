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
  MatTooltipModule
} from "@angular/material";
import { MatRadioModule } from "@angular/material/radio";
// import {MatCardModule} from '@angular/material/card';

import { FormService } from "./form.service";
import { SequenceService } from "./sequence.service";

import { AppComponent } from "./app.component";
import { DnaRnaConverterComponent } from "./dna-rna-converter/dna-rna-converter.component";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { SequenceDisplayComponent } from "./sequence-display/sequence-display.component";

@NgModule({
  declarations: [
    AppComponent,
    DnaRnaConverterComponent,
    ControlPanelComponent,
    SequenceDisplayComponent
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
    MatRadioModule
  ],
  providers: [FormService, SequenceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
