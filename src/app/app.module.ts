import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import { CellComponent } from './components/cell/cell.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    ResultDialogComponent,
  ],
  imports: [
    BrowserModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDialogModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
