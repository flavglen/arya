import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { notification } from 'src/app/models/post';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostsService } from 'src/app/services/posts.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  loggedInUser: any;
  profilepic: any;
  showLoader: any = false;
  notifications: notification[] = [];
  sport: string='';
  showhome: boolean = true;
  currentRoute: string='';
  searchstring:string='';
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
  constructor(private router: Router, private commonService: CommonService,
    private notificationService: NotificationService, private postService: PostsService, private data: DataService) {
    this.data.currentMessage.subscribe(message => {
      if (message.length > 0) {
        this.profilepic = message
        this.loadProfileimage(this.profilepic);
      }
    });
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.showhome = this.router.url.startsWith("/dashboard") || this.router.url == "/";
        }
      }
    );
  }



  ngOnInit(): void {
    //this.commonService.msgSource.subscribe(uName => this.loggedInUser = uName);
    this.loggedInUser = localStorage.getItem('userName');
    this.profilepic = localStorage.getItem('picture');
    this.data.currentMessage.subscribe(message => {
      if (message.length > 0)
        this.profilepic = localStorage.getItem('picture');
      this.loadProfileimage(this.profilepic);
    });
    this.listenToLoading();
    this.data.changeSport(this.sport);
    this.data.sportChangeSource.subscribe(message => {
      if (message.length > 0) {
        this.searchstring = message;
      }
    });
  }

  searchSport(sport: string) {
    this.sport = sport;
    this.data.changeSport(this.sport);
    
  }

  listenToLoading(): void {
    this.data.showLoader
      .subscribe((loading) => {
        this.showLoader = loading;
      });
  }

  loadProfileimage(profilepic: string) {
    
    if (this.profilepic == "" || this.profilepic == null || this.profilepic.trim().length == 0) {
      this.profilepic = "../assets/images/profilepic.png";
    }
    else {
      if (this.profilepic.startsWith("data")) {
        this.profilepic = this.profilepic;
      }
      else {
        this.profilepic = "data:image/gif;base64," + this.profilepic;
      }
    }
    this.getNotifications();
  }
  getNotifications() {
    this.notificationService.getNotification(1, 4, "").subscribe((res: any) => {
      if (res.success) {
        this.notifications = res.data;
      } else {
        this.postService.showWarn(res.message, "")
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });

  }
  readNotification(n: notification) {
    if (!n.IsRead) {
      this.notificationService.readNotification([n.Id]).subscribe((res: any) => {
        if (res.success) {
          n.IsRead = true;
        } else {
          this.postService.showWarn(res.message, "")
        }
      },
        (err) => {
          console.log("Some Thing wrong");
        }
      );
    }
  }

}
