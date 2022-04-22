import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  cities=[{name:'Cricket',code:'cricket',id:1}];
  dashboardForm = new FormGroup({
    'sportsType': new FormControl(null, [Validators.required]),
    'title': new FormControl(null, [Validators.required]),
    'description': new FormControl(null, [Validators.required]),
    'content': new FormControl(null, [Validators.required]),
    'startdate': new FormControl(null, [Validators.required]),
    'enddate': new FormControl(null, [Validators.required]),
    'location': new FormControl(null, [Validators.required]),
  });
  constructor(private postservice: PostsService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.dashboardForm.valid) {
      this.postservice.showWarn("Please Fill Details", "");
      return;
    }
    const descDetails = {
      sportsType:this.dashboardForm.value.sportsType,
      description: this.dashboardForm.value.description,
      Content: this.dashboardForm.value.content,
      Title: this.dashboardForm.value.title,
      Details: this.dashboardForm.value.description,
      Event_start: this.dashboardForm.value.startdate,
      Event_end: this.dashboardForm.value.enddate,
      Location: this.dashboardForm.value.location
    }

    this.postservice.createNewPost(descDetails).subscribe((res: any) => {
        if (res.success) {
          this.dashboardForm.reset();
          this.postservice.showSuccess("Post Created Successfully", "");
        }
        else
          this.postservice.showError("Please contact Admin", "Error");
      },
        (err) => {
          console.log("Some Thing wrong");
        }
      );
  }

  resetform() {
    this.dashboardForm.reset();
  }

}
