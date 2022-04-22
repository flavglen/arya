import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country, profile } from '../models/profile';
import { DataService } from '../services/data.service';
import { PostsService } from '../services/posts.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: profile|undefined;
  profileForm: FormGroup = new FormGroup({});
  profilepic: string='';
  Countries: Country[] = [];
  constructor(private postservice: PostsService, private profileService: ProfileService, private data: DataService) { }

  ngOnInit(): void {

    this.profileForm = new FormGroup({
      'firstname': new FormControl("", [Validators.required]),
      'lastname': new FormControl("", [Validators.required]),
      'address1': new FormControl("", [Validators.required]),
      'address2': new FormControl("", [Validators.required]),
      'city': new FormControl("", [Validators.required]),
      'state': new FormControl("", [Validators.required]),
      'country': new FormControl("", [Validators.required]),
      'zip': new FormControl("", [Validators.required]),
      'email': new FormControl("")
    });
    this.getCountries();
    this.getProfile();
    this.data.currentMessage.subscribe(message => this.profilepic = message)
  }
  getCountries() {
    this.profileService.getCountries().subscribe((res: any) => {
      if (res.success) {
        this.Countries = res.data;
        console.log(this.Countries);
      }
      else
        this.postservice.showWarn("Unable to Retrive Data", "");
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }
  getProfile() {
    this.profileService.getProfile().subscribe((res: any) => {
      if (res.success) {
        this.profile = res.data;
        if (res.data.UserDetail.length > 0) {
          this.profileForm.patchValue({
            firstname: res.data.FirstName,
            lastname: res.data.LastName,
            email: res.data.Email,
            address1: res.data.UserDetail[0].Address1,
            address2: res.data.UserDetail[0].Address2,
            city: res.data.UserDetail[0].City,
            country: res.data.UserDetail[0].Country,
            state: res.data.UserDetail[0].State,
            zip: res.data.UserDetail[0].Zip,

          });

        }
        else {
          this.profileForm.patchValue({
            firstname: res.data.FirstName,
            lastname: res.data.LastName,
            email: res.data.Email
          });
        }


      }
      else
        this.postservice.showWarn("Unable to Retrive Data", "");
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    if (event.rejectedFiles.length > 0) {
      var reason = "";
      switch (event.rejectedFiles[0].reason) {
        case "size":
          reason = "File Should be Less than 500 KB";
          break;
        case "type":
          reason = "File should be jpeg/jpg/png/gif type";
          break;
        case "no_multiple":
          reason = "Multiple files not allowed";
          break;
        default:
          reason = "Unable to upload";
          break
      }
      this.postservice.showWarn(reason, "");
    }
    if (this.files.length == 0) {
      this.files.push(...event.addedFiles);
    }
    else
      this.postservice.showWarn("Allows only single image", "");
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    var a = {
      Address1: this.profileForm.value.address1,
      Address2: this.profileForm.value.address2,
      City: this.profileForm.value.city,
      State: this.profileForm.value.state,
      Country: this.profileForm.value.country,
      Zip: this.profileForm.value.zip,
      FirstName: this.profileForm.value.firstname,
      LastName: this.profileForm.value.lastname,
    }
    if (this.files.length == 0) {
      this.updateProfile(a, null);
    }
    else {
      this.uploadImage(a);
    }
  }

  uploadImage(a: any) {
    const formData = new FormData();
    if (this.files.length >= 1) {
      for (const iterator of this.files) {
        formData.append("DeviceData", iterator);
      }
      this.profileService.UploadDevices(formData).subscribe(res => {
        if (res.success) {
          this.updateProfile(a, res.data);
        }
        else {
          this.postservice.showWarn(res.Message, "");
        }
      })
    }
    else {
      this.postservice.showWarn("Please upload Files", "");
    }
  }

  updateProfile(a: any, path: any) {
    if (path != null)
      a.Picture = path;
    this.profileService.updateProfile(a).subscribe((res: any) => {
      if (res.success == true) {

        this.postservice.showSuccess("Profile Updated Successfully", "");
        if (res.data.length > 0) {
          localStorage.setItem('picture', res.data);
          this.data.changeMessage(res.data);
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