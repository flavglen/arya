import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../models/profile';
import { PostsService } from '../services/posts.service';
import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  settings: UserSettings = new UserSettings();
  settingsForm: FormGroup=  new FormGroup({});

  constructor(private profileservice: ProfileService, private postservice: PostsService) { }

  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      'about': new FormControl("", [Validators.required]),
      'language': new FormControl("", [Validators.required]),
      'timezone': new FormControl("", [Validators.required]),
      'notification_like': new FormControl("", [Validators.required]),
      'notification_comment': new FormControl("", [Validators.required])
    });
    this.getSettings();
  }

  getSettings() {
    this.profileservice.getSettings().subscribe((res: any) => {
      if (res.success) {
        this.settings = res.data;
        if (res.data != null) {
          this.settingsForm.patchValue({
            about: res.data.AboutPrivacy,
            language: res.data.Language,
            timezone: res.data.TimeZone,
            notification_like: res.data.Notification_like,
            notification_comment: res.data.Notification_comment,
          });
          console.log(this.settings);
        }
        else
          this.postservice.showWarn("Unable to Retrive Data", "");
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }
  onSubmit() {
    if (this.settingsForm.invalid) {
      return;
    }
    var a = {
      AboutPrivacy: this.settingsForm.value.about,
      Language: this.settingsForm.value.language,
      TimeZone: this.settingsForm.value.timezone,
      Notification_like: this.settingsForm.value.notification_like,
      Notification_comment: this.settingsForm.value.notification_comment,

    }
    this.updatesettings(a);

  }

  updatesettings(a: any) {

    this.profileservice.updateSettings(a).subscribe((res: any) => {
      if (res.success == true) {

        this.postservice.showSuccess("Settings Updated Successfully", "");
        if (res.data.length > 0) {
          localStorage.setItem('picture', res.data);
        }

      }
      else {
        this.postservice.showWarn(res.message, "");
      }
    },
      error => {
        this.postservice.showError("Please ReCheck", "Error");
      });
  }
}
