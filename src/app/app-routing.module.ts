import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ActiveMatchesComponent } from './active-matches/active-matches.component';
import { AuthGuard } from './auth/auth.guard';
import { AddScoreComponent } from './dashboard/add-score/add-score.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { MatchComponent } from './match/match.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateScoreComponent } from './update-score/update-score.component';
import { ViewScoreComponent } from './view-score/view-score.component';


const routes: Routes = [

  {
    path: '', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [   // canActivate: [AuthGuard],
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'posts/:id', component: PostsComponent, canActivate: [AuthGuard] },
      { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'accountsettings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
      { path:'add-score', component: AddScoreComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
        // new 
        {
          path:'match',
          component:MatchComponent
        },
        {
          path:'update-score',
          component:UpdateScoreComponent
        },
        {
          path:'view-score',
          component:ViewScoreComponent
        },
        {
          path:'active-match',
          component:ActiveMatchesComponent
        },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
