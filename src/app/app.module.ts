import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchComponent } from './match/match.component';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { UpdateScoreComponent } from './update-score/update-score.component';
import { ViewScoreComponent } from './view-score/view-score.component';
import { ActiveMatchesComponent } from './active-matches/active-matches.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

const firebaseConfig = {
  apiKey: "AIzaSyB2aTvlHJSRSCcV-bcQlEiLGILauleVnm8",
  authDomain: "arya-e181e.firebaseapp.com",
  projectId: "arya-e181e",
  storageBucket: "arya-e181e.appspot.com",
  messagingSenderId: "784939880194",
  appId: "1:784939880194:web:efe204d56f1ae9c1d73c1b"
};

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    UpdateScoreComponent,
    ViewScoreComponent,
    ActiveMatchesComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DynamicFormsMaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsPrimeNGUIModule,
    MatGridListModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
