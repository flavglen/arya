import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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
  profilepic: any;
  loggedInUser:any;
  unreadNotifications= 0;
  notificationCollection = this.afs.collection<any>('notifications', ref => ref.where('isViewed', '==', false));
  constructor(private auth: AngularFireAuth,private readonly afs: AngularFirestore) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem('customUser');
    this.loggedInUser  = user ? JSON.parse(user) : null;

    this.notificationCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe((data)=>{
        this.unreadNotifications = data.length;
      })
  }

  onLogOut() {
    this.auth.signOut();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('customUser');

  }

}
