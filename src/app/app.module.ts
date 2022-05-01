import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchComponent } from './components/match/match.component';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { UpdateScoreComponent } from './components/update-score/update-score.component';
import { ViewScoreComponent } from './components/view-score/view-score.component';
import { ActiveMatchesComponent } from './components/active-matches/active-matches.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { PostsComponent } from './components/posts/posts.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AddScoreComponent } from './components/add-score/add-score.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpHandler } from './services/http.Interceptor';
import { AuthService } from './components/auth/auth.service';
import { AuthGuard } from './components/auth/auth.guard';
import { PostsService } from './services/posts.service';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthComponent } from './components/auth/auth.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {MenuModule} from 'primeng/menu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {BadgeModule} from 'primeng/badge';
import { NavbarComponent } from './layout/navbar/navbar.component';

const firebaseConfig = {
  apiKey: "AIzaSyB2aTvlHJSRSCcV-bcQlEiLGILauleVnm8",
  authDomain: "arya-e181e.firebaseapp.com",
  projectId: "arya-e181e",
  storageBucket: "arya-e181e.appspot.com",
  messagingSenderId: "784939880194",
  appId: "1:784939880194:web:efe204d56f1ae9c1d73c1b"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyBDe-9lZXrO4XcBEXInTaIlwjZESNkEOXI",
//   authDomain: "sportzmine-1363a.firebaseapp.com",
//   projectId: "sportzmine-1363a",
//   storageBucket: "sportzmine-1363a.appspot.com",
//   messagingSenderId: "157794750630",
//   appId: "1:157794750630:web:56e99be508a7d5b081a467"
// };

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    UpdateScoreComponent,
    ViewScoreComponent,
    ActiveMatchesComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    PostsComponent,
    NotificationsComponent,
    ProfileComponent,
    AccountSettingsComponent,
    AddScoreComponent,
    AuthComponent,
    AddPostComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DynamicFormsMaterialUIModule,
    DynamicFormsPrimeNGUIModule,
    MatGridListModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    EditorModule,
    MenuModule,
    OverlayPanelModule,
    BadgeModule
  ],
  providers: [AuthService, AuthGuard, PostsService,DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpHandler, multi: true },
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }