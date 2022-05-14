import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OverSummary, Score } from './over.model';

@Component({
  selector: 'app-cricket-admin',
  templateUrl: './cricket-admin.component.html',
  styleUrls: ['./cricket-admin.component.scss']
})
export class CricketAdminComponent implements OnInit {
  currentOver = 0;
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
private itemsCollection: AngularFirestoreCollection<any>;
cricketForm:FormGroup;

  get overs() {
    return this.cricketForm.get('oversModel') as FormArray;
  }
  constructor(private fb: FormBuilder, private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('cricketOvers');
   }

  ngOnInit(): void {
    this.createOverModel();
    
    this.cricketForm = this.fb.group({
      currentOver: [0],
      ballType: [5],
      extraRuns:[0],
      oversModel: this.fb.array(this.createFormArray())
    });
  }

  createFormArray(){
    return this.overModel.map((x:any) => {
       return this.fb.control('');
    });
  }

  createOverModel(){
    this.overModel = Array.from({length: 9 }, (_,i) => (this.currentOver  + (i+1) / 10));
  }

  startNewOver(){
    this.createOverModel();
    //store score
    console.log( this.cricketForm.value)
    // saves score
    this.saveScore();
    //new over
    this.currentOver  +=1;
    this.cricketForm.controls['currentOver'].patchValue(this.currentOver);
  }

  createScoreModel(){
    const overSummary = new OverSummary();
  
    overSummary.postId = '111';
    overSummary.matchId = '4444';
    const obj:any = { };
   const overModel =  this.cricketForm.controls['oversModel'].value.map((sc:any, i:number)=>{
      const overKey  =  this.overModel[i].toString();
      // set
      const score = new Score();
      score.batsman = this.battingTeamPlaying[0] //0 is striker always
      score.bowler = this.bowlingTeamActive[0]
      score.score =  sc;
      score.extraType =  this.cricketForm.controls['ballType'].value === 5 ? null : this.cricketForm.controls['ballType'].value;
      score.extraRun = this.cricketForm.controls['extraRuns'].value
      // push
      obj[overKey] = score
      return {[overKey]: score};
    });

    overSummary.overs.push(obj);
    return overSummary;
  }

  saveScore(){
    const scoreModel = this.createScoreModel();
    console.log(scoreModel)
    // const id = this.afs.createId();
    // this.itemsCollection.doc(id).set( JSON.parse(JSON.stringify(scoreModel))).then(re=>{
    //   alert('success');
    // }).catch(er=> {
    //   alert('error');
    // });
  }

}
