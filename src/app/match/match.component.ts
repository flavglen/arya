import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynamicCheckboxModel, DynamicFormArrayModel, DynamicFormModel, DynamicFormService, DynamicInputModel, DynamicRadioGroupModel, DynamicSelectModel } from '@ng-dynamic-forms/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
 MY_FORM_LAYOUT:any = {
  
};
  selected:any;
  ind = -1;
  noOfTeams =2;
  teams:any = {};
  teamsModel:any={};
  currentTeam = '';
   MY_FORM_MODEL: DynamicFormModel = [

    new DynamicSelectModel<string>({
        id: "SelectTeam",
        label: "Select Team",
        options: [
            {label: "Team1", value: "team1"},
            {label: "Team2", value: "team2"},
        ]
    }),
    new DynamicFormArrayModel({
      id: "myFormArray",
      initialCount: 5,
      groupFactory: () => {
        this.ind++;
          return [
              new DynamicInputModel({
                  id: "Player"+this.ind,
                  label: "Player"+this.ind
              }),
              new DynamicInputModel({
                id: "Age"+this.ind,
                label: "Age"+this.ind
            })
          ];
         
      }
  })

];
  formModel: DynamicFormModel = this.MY_FORM_MODEL;
  formGroup = this.formService.createFormGroup(this.formModel);
  formArrayModel:any;
  formArrayControl:any;
  constructor(private formService: DynamicFormService) { 

  }

  ngOnInit(): void {
    this.formArrayModel = this.formService.findModelById<DynamicFormArrayModel>("myFormArray", this.formModel);
    this.formArrayControl = this.formService.findControlByModel<FormArray>(this.formArrayModel, this.formGroup);
  }

  addItem() {
      this.formService.addFormArrayGroup(this.formArrayControl, this.formArrayModel);
      this.formService.detectChanges();
  }

  storeForm() {
    const json = JSON.stringify(this.formModel);
    this.teams[this.currentTeam] = this.formGroup.value;
    this.teamsModel[this.currentTeam] = json;
    localStorage.setItem('forms', JSON.stringify(this.teamsModel));
    this.formGroup.reset();
  }
  restoreForm() {
    let json: string;
    //this.formModel = this.formService.fromJSON(json);
 }

 onChange(e:any){
   if(e.model.id === 'SelectTeam'){
     this.currentTeam  = e.control.value;
     const formModel:any = JSON.parse(localStorage.getItem('forms')|| '');
     if(this.teams[e.control.value]!="" && formModel && formModel[this.currentTeam] ){
      this.formGroup.patchValue(this.teams[e.control.value]);
      this.formModel = this.formService.fromJSON(formModel[this.currentTeam]);
      
      //this.formArrayModel = this.formService.findModelById<DynamicFormArrayModel>("myFormArray", this.formModel);
      //this.formArrayControl = this.formService.findControlByModel<FormArray>(this.formArrayModel, this.formGroup);

      this.formService.detectChanges();
     }
      else{
      this.teams[e.control.value] = ''; 
      }
   }
 }

}
