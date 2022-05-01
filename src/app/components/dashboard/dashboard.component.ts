import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { map } from 'rxjs/operators';
import { post, sports } from '../../models/post';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Showform: boolean = false;
  posts: post[] = [];
  p: post=  new post();
  dashboardForm: FormGroup = new FormGroup({});
  description: any;
  postData: any;
  feedtype: number = 1;
  searchstring: string = "";
  pageNumber: number = 1;
  pageSize: number = 5;
  from: any;
  to: Date | undefined;
  enableScroling: boolean = true;
  showEnd = false;
  showpopup = false;
  options: any =
    [{ title: "All Posts", value: 1 },
    { title: "My Posts", value: 2 }]
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings | undefined;
  sportsList: sports[] = [];
  isFiltered:boolean = false;  
  Sportslist = [
    { "name": "cricket", "logo": "cricket.png" },
    { "name": "football", "logo": "football.png" },
    { "name": "table tennis", "logo": "tt.png" },
    { "name": "tennis", "logo": "tennis.png" },
    { "name": "golf", "logo": "golf.png" },
    { "name": "basketball", "logo": "basketball.png" },
    { "name": "volleyball", "logo": "volleyball.png" },
    { "name": "bowling", "logo": "bowling.png" },
    { "name": "baseball", "logo": "baseball.png" },
  ];
  constructor(private postservice: PostsService, private data: DataService) { }

  ngOnInit(): void {
    this.getPosts();
    this.dashboardForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'content': new FormControl(null, []),
      'startdate': new FormControl(null, [Validators.required]),
      'enddate': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
    });
    this.data.sportChangeSource.subscribe(message => {
      if (message.length > 0) {
        this.searchstring = message;
        this.posts = [];
        this.pageNumber = 1;
        this.getPosts();
      }
    });

    // this.dropdownSettings.singleSelection = false;
    // this.dropdownSettings.idField = 'ID';
    // this.dropdownSettings.textField = 'Name';
    // this.dropdownSettings.selectAllText = 'Select All';
    // this.dropdownSettings.unSelectAllText = 'UnSelect All';
    // this.dropdownSettings.itemsShowLimit = 3;
    // this.dropdownSettings.allowSearchFilter = true;
    // this.getSportsList();
  }

  openForm() {
    this.Showform = true;
  }

  feedchange() {
    this.posts = [];
    this.pageNumber = 1;
    this.showpopup = false;
    this.getPosts();
    this.isFiltered = true;
    
  }
  like(postID: any, status: any, liked: number) {
    if (status == liked)
      return;
    this.postservice.likePost({ "postId": postID, "status": status }).subscribe((res) => {
      if (res.success) {
        this.p = this.posts.filter(a => a.Id == postID)[0];
        this.p.Liked = status;
        if (status == 1) {
          this.p.LikesCount += 1;
          if (liked == 2)
            this.p.UnlikeCount -= 1;
        }
        else {
          if (liked == 1)
            this.p.LikesCount -= 1;
          this.p.UnlikeCount += 1;
        }
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }

  // getmyPosts() {
  //   this.postservice.getMyData(this.searchstring).subscribe((res) => {
  //     this.posts = res.data;
  //   },
  //     (err) => {
  //       console.log("Some Thing wrong");
  //     }
  //   );
  // }

  getSportsList() {
    this.postservice.getSportsList().subscribe((res: any) => {
      this.sportsList = res.data;
      alert("sportslist");
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }

  showScoreBoard() {
    alert('working!!!')
  }

  getPosts() {
    this.postservice.getPostData(this.searchstring, this.pageSize, this.pageNumber, this.from, this.feedtype).subscribe((res) => {
      this.enableScroling = true;
      this.showEnd = false;
      res.data.forEach((element: post) => {
        this.posts.push(element);
      });
      console.log(res.data)
      console.log(this.posts);
      if (res.data.length < this.pageSize) {
        this.enableScroling = false;
        this.showEnd = true;
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
    console.log(this.posts);
  }

  onScroll() {
    if (this.enableScroling) {
      this.pageNumber += 1;
      this.getPosts();
    }
  }
  togglePopUp() {
    this.showpopup = !this.showpopup;
  }
  resetfilter() {
    this.searchstring = '';
    this.feedtype = 1;
    this.from = [];
    this.posts = [];
    this.getPosts();
    this.showpopup = false;
    this.isFiltered = false;
  }

}
