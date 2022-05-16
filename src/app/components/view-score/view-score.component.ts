import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { battingTeam } from 'src/assets/mockplayers';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.scss']
})
export class ViewScoreComponent implements OnInit {
  teamsData = JSON.parse(JSON.stringify(battingTeam));
  scoreSummary:any = {};
  scoreSummaryBowler:any = {};
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(private readonly afs: AngularFirestore) { 
    this.itemsCollection = afs.collection<any>('cricketOvers');
  }

  ngOnInit(): void {
    this.generateScoreBoard();
  }


  generateScoreBoard(){
    const matchId = localStorage.getItem('matchId');
    if(!matchId){
      alert('invalid match');
      return;
    }

    this.itemsCollection.doc(matchId).valueChanges().subscribe(cx=>{

        console.log(cx)
    });

    this.itemsCollection.doc(matchId).valueChanges().subscribe(cx=>{
      cx.overs.map((obj:any) =>{
        Object.keys(obj).forEach(k=>{
          const scoreData = obj[k];
          const player = scoreData.batsman.name;
          const playerBowler = scoreData.bowler.name;
          // batsman
           if(!this.scoreSummary[player]){
            this.scoreSummary[player] = {
              name:player,
              six: +scoreData.score === 6 ? 1: 0,
              four: +scoreData.score === 6 ? 1: 0,
              two: +scoreData.score === 2 ? 1: 0,
              one : +scoreData.score === 1 ? 1: 0,
              three: +scoreData.score === 3 ? 1: 0,
              ballsFaced:1,
              sr:0,
              runs:+scoreData.score
            }
           } else {
             const getCurentPlayer = this.scoreSummary[player];
             const totalRun  = getCurentPlayer.runs + (+scoreData.score);
             const ballsFaced = getCurentPlayer.ballsFaced + 1;
              this.scoreSummary[player] = {
                name:player,
                six:+scoreData.score === 6 ? 1 + getCurentPlayer.six:  getCurentPlayer.six,
                four:+scoreData.score === 4 ? 1 + getCurentPlayer.four:  getCurentPlayer.four,
                two: +scoreData.score === 2 ? getCurentPlayer.two +1: getCurentPlayer.two,
                one : +scoreData.score === 1 ? getCurentPlayer.one + 1: getCurentPlayer.one,
                three: +scoreData.score === 3 ? getCurentPlayer.three + 1: getCurentPlayer.three,
                ballsFaced,
                sr: totalRun  / ballsFaced * 100,
                runs: totalRun,
              }
           }

           // bowler
           if(!this.scoreSummaryBowler[playerBowler]){
            this.scoreSummaryBowler[playerBowler] = {
              name:playerBowler,
              runs:+scoreData.score,
              wickets:0,
            }
           }else{
            const getCurentPlayerbolwer = this.scoreSummaryBowler[playerBowler];

            this.scoreSummaryBowler[playerBowler] = {
              name:playerBowler,
              runs: getCurentPlayerbolwer.runs + (+scoreData.score),
              wickets:0,
            }
           }

        });
      });

      console.log(Array.from(this.scoreSummaryBowler));
    });
  }

  objectKeys(obj:any) {
    return Object.keys(obj);
  }

}
