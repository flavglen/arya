import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormModel, DynamicFormService, DynamicInputModel } from '@ng-dynamic-forms/core';


@Component({
  selector: 'app-update-score',
  templateUrl: './update-score.component.html',
  styleUrls: ['./update-score.component.scss']
})
export class UpdateScoreComponent implements OnInit {
  formModel: DynamicFormModel = [];
  formGroup: FormGroup;
  formArrayModel: any;
  formArrayControl: any;
  currentTeam = 'team1';
  teams:any[]=[] //must come from api;
  teamsData:any = {};
  constructor(private formService: DynamicFormService) {
    this.teams = this.generateScoreboard();
    
    this.formModel = this.formService.fromJSON(JSON.stringify(this.teams.find(x => x.team1).team1)); //default //ASSUME 0  for team1
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  ngOnInit(): void {
  }


  onChange(e: any) {
    if (e.model.id === 'SelectTeam') {
      this.currentTeam = e.control.value;
      this.formModel = this.formService.fromJSON(JSON.stringify(this.teams.find(x =>x[this.currentTeam])[this.currentTeam])); //default //ASSUME 0  for team1
      this.formGroup = this.formService.createFormGroup(this.formModel);
    }
  }

  generateScoreboard(){
      const model = JSON.parse(localStorage.getItem('forms') || '');
      const gg = Object.keys(model).map(key=>{
        const formArr = JSON.parse(model[key]);
        formArr.find((y: any) => y.id == 'myFormArray').groups.map((x: any, index: number) => x.group.push(
          new DynamicInputModel({
            id: "six",
            label: "6"
          }).toJSON(),
          new DynamicInputModel({
            id: "four",
            label: "4"
          }).toJSON(),
          new DynamicInputModel({
            id: "one",
            label: "1"
          }).toJSON(),
          new DynamicInputModel({
            id: "two",
            label: "2"
          }).toJSON(),
          new DynamicInputModel({
            id: "three",
            label: "3"
          }).toJSON(),
          new DynamicInputModel({
            id: "balls",
            label: "balls"
          }).toJSON()
        ));

        return {[key]:formArr}; 
      })
    return gg;
  }

  updateScore() {
    const scores = localStorage.getItem('score');
    if(scores){
      const parsed = JSON.parse(scores);
      parsed[this.currentTeam] = this.formGroup.value;
      localStorage.setItem('score', JSON.stringify(parsed));
    }

  }

}
