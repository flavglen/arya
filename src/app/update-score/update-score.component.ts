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
  formGroup:FormGroup;
  formArrayModel:any;
  formArrayControl:any;

  constructor(private formService: DynamicFormService) {
    const model = JSON.parse(localStorage.getItem('forms')|| '');
    const formArr = JSON.parse(model['team1']);

    formArr.find((y:any) => y.id =='myFormArray').groups.map((x:any,index:number)  => x.group.push(
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

  
  ))

    this.formModel = this.formService.fromJSON(JSON.stringify(formArr)); //default //ASSUME
    this.formService.insertFormGroupControl
    this.formGroup = this.formService.createFormGroup(this.formModel);
   }

  ngOnInit(): void {
  }

}
