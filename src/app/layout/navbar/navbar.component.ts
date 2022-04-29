import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.clear();
  }

}
