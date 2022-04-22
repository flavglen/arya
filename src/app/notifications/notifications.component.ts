import { Component, OnInit } from '@angular/core';
import { notification } from '../models/post';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  pageNumber: number = 1;
  pageSize: number = 20;
  notifications: notification[] = [];
  readStatus: string = '';
  prevpageenable: boolean = false;
  nextpageenable: boolean = true;

  constructor(private notificationService: NotificationService, private postService: PostsService) {

  }

  ngOnInit(): void {
    this.getNotifications();
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

  getNotifications() {
    this.notificationService.getNotification(this.pageNumber, this.pageSize, this.readStatus).subscribe((res: any) => {
      if (res.success) {
        this.notifications = res.data;
        this.nextpageenable = res.data.length == this.pageSize ? true : false;
      } else {
        this.postService.showWarn(res.message, "")
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }
  setStatus(status: string) {
    this.readStatus = status;
    this.pageNumber = 1;
    this.getNotifications();
  }
  nextpage() {
    this.pageNumber += 1;
    this.getNotifications();
  }

  prevpage() {
    if (this.pageNumber > 1)
      this.pageNumber -= 1;
    this.getNotifications();
  }

}
