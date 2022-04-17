import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveMatchesComponent } from './active-matches/active-matches.component';
import { AuthComponent } from './auth/auth.component';
import { MatchComponent } from './match/match.component';
import { UpdateScoreComponent } from './update-score/update-score.component';
import { ViewScoreComponent } from './view-score/view-score.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
