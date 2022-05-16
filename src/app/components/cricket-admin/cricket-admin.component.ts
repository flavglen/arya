import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { battingTeam, bowlingTeam } from 'src/assets/mockplayers';
import { OverSummary, Score } from './over.model';

@Component({
  selector: 'app-cricket-admin',
  templateUrl: './cricket-admin.component.html',
  styleUrls: ['./cricket-admin.component.scss']
})
export class CricketAdminComponent implements OnInit {
  matchCollectionId =  localStorage.getItem('matchId') || '';
  currentOver = 0;
  score:any = {};
  overModel:any=[] = [];
  bowlingTeam = bowlingTeam;
  battingTeam = battingTeam;

  battingTeamPlaying: any[] = [];
  justifyOptions = [
    {name: 'Wide', value: 1},
    {name: 'No Ball', value: 2},
    {name: 'Byes', value: 3},
    {name: 'LB', value: 4},
    {name: 'NORMAL', value: 5},
    {name: 'WICKET', value: 6}
];

bowlingTeamActive:any[]=[];
private itemsCollection: AngularFirestoreCollection<any>;
cricketForm:FormGroup;

  get overs() {
    return this.cricketForm.get('oversModel') as FormArray;
  }

  get ballType() {
    return this.cricketForm.get('ballType')?.value
  }
  

  constructor(private fb: FormBuilder, private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('cricketOvers');
   }

  ngOnInit(): void {
    this.createOverModel();
    
    this.cricketForm = this.fb.group({
      currentOver: [0],
      ballType: [5], // default normal=5
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

    if(this.matchCollectionId === '') {
      this.matchCollectionId = this.afs.createId();
      localStorage.setItem('matchId',this.matchCollectionId);
      this.itemsCollection.doc(this.matchCollectionId).set( JSON.parse(JSON.stringify(scoreModel))).then(re=>{
        alert('success');
      }).catch(er=> {
        alert('error');
      });
    } else {

      this.itemsCollection.doc(this.matchCollectionId).get().subscribe(cx=>{
        const overs = cx.data().overs;
        overs.push(JSON.parse(JSON.stringify(scoreModel.overs[0])));


        this.itemsCollection.doc(this.matchCollectionId).set({overs}).then(re=>{
          alert('success');
        }).catch(er=> {
          alert('error');
        });

      });
    }
  }

}
