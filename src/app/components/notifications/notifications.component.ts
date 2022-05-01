import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { notification } from '../../models/post';
import { NotificationService } from '../../services/notification.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() isNavbar = true;

  pageNumber: number = 1;
  pageSize: number = 20;
  notifications: any[] = [];
  readStatus: string = '';
  prevpageenable: boolean = false;
  nextpageenable: boolean = true;
  private notificationCollection: AngularFirestoreCollection<any>;

  constructor(private notificationService: NotificationService, private postService: PostsService, private readonly afs: AngularFirestore) {
    this.notificationCollection = this.afs.collection<any>('notifications', ref => ref.where('isViewed', '==', false));
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
    console.log('aga');
    this.notificationCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe((notifications)=>{
          const values = notifications.map(notification =>{
             const notificationText = `${notification.user.userName} is interested in ${notification.post.title}` ;
             return notificationText;
          })
         this.notifications = values;
      });
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
