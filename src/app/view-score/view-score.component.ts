import { Component, OnInit } from '@angular/core';
import { Firestore,collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.scss']
})
export class ViewScoreComponent implements OnInit {
  teamsData:any[]= [];
  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    const collections = collection(this.firestore, 'posts');

     collectionData(collections).subscribe(d=>{
       console.log(d)
     })

    const g = localStorage.getItem('score');
    if(g){
     this.teamsData =  this.generateScoreBoard(JSON.parse(g));
    }
  }


  generateScoreBoard(teams:any){
    return Object.keys(teams).map(team=>{
      if(team && team.length > 1){
        return teams[team];
      }
      return null;
    }).filter(x=> x);
  }

}
