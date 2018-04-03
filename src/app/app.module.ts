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
  MatToolbarModule
} from "@angular/material";
// import {MatCardModule} from '@angular/material/card';

import { AppComponent } from "./app.component";
import { DnaRnaConverterDisplayComponent } from "./dna-rna-converter-display/dna-rna-converter-display.component";

@NgModule({
  declarations: [AppComponent, DnaRnaConverterDisplayComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
