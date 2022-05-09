import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ActiveMatchesComponent } from './components/active-matches/active-matches.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AddScoreComponent } from './components/add-score/add-score.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatchComponent } from './components/match/match.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateScoreComponent } from './components/update-score/update-score.component';
import { ViewScoreComponent } from './components/view-score/view-score.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { CricketAdminComponent } from './components/cricket-admin/cricket-admin.component';


const routes: Routes = [

  {
    path: '', component: HomeLayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'posts/:id', component: PostsComponent, canActivate: [AuthGuard] },
      { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'accountsettings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
      { path:'add-score', component: AddScoreComponent, canActivate: [AuthGuard] },
      { path:'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
      { path:'update-cricket', component: CricketAdminComponent, canActivate: [AuthGuard] },
      
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
        {
          path:'auth',
          component:AuthComponent
        },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
