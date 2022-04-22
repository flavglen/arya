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
import { CommonModule, DatePipe } from '@angular/common';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './login/register/register.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AddScoreComponent } from './dashboard/add-score/add-score.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpHandler } from './http.Interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { PostsService } from './services/posts.service';

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
    AddScoreComponent
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
    HttpClientModule
    
  ],
  providers: [AuthService, AuthGuard, PostsService,DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpHandler, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
