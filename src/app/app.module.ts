import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { LibraryService } from './services/library.service';
import { SongSelectorComponent } from './components/song-selector/song-selector.component';
import { CreateMusicComponent } from './components/create-music/create-music.component';
import {  NgbdModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SongSelectorComponent,
    CreateMusicComponent,
    NgbdModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    CreateMusicComponent
  ],
  providers: [LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
