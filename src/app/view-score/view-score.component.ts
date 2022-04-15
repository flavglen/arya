import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.scss']
})
export class ViewScoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const g = localStorage.getItem('score');
    if(g){
     let x =  this.generateScoreBoard(JSON.parse(g));
     console.log(x)
    }
  }


  generateScoreBoard(teams:any){
    return Object.keys(teams).map(team=>{
      if(team && team.length > 1){
        return teams[team].myFormArray;
      }
      return null;
    }).filter(x=> x);
  }

}
