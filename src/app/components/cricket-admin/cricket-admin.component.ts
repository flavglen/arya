import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cricket-admin',
  templateUrl: './cricket-admin.component.html',
  styleUrls: ['./cricket-admin.component.scss']
})
export class CricketAdminComponent implements OnInit {
  currentOver = 1;
  score:any = {};
  overModel:any=[] = [];
  bowlingTeam = [{
      "id": "6",
      "code": "Bowler1",
      "name": "Bowler1"
    },
    {
      "id": "7",
      "code": "Bowler2",
      "name": "Bowler2"
    },
    {
      "id": "8",
      "code": "Bowler3",
      "name": "Bowler3"
    },
    {
      "id": "9",
      "code": "Bowler4",
      "name": "Bowler4"
    },
    {
      "id": "10",
      "code": "Bowler5",
      "name": "Bowler5"
    }
];
  battingTeam: any[] = [{
      "id": "1",
      "code": "Player1",
      "name": "Player1"
    },
    {
      "id": "2",
      "code": "Player2",
      "name": "Player2"
    },
    {
      "id": "3",
      "code": "Player3",
      "name": "Player3"
    },
    {
      "id": "4",
      "code": "Player4",
      "name": "Player4"
    },
    {
      "id": "5",
      "code": "Player5",
      "name": "Player5"
    }
];
  battingTeamPlaying: any[] = [];
  justifyOptions = [
    {name: 'Wide', value: 1},
    {name: 'No Ball', value: 2},
    {name: 'Byes', value: 3},
    {name: 'LB', value: 4},
    {name: 'NORMAL', value: 5}
];
ballType = 5;
bowlingTeamActive:any[]=[];
  constructor() { }

  ngOnInit(): void {
    this.createOverModel();
  }

  createOverModel(){
    this.overModel = Array.from({length: 8 }, (_,i) => Math.round(1 + i) / 10);
  }

}
