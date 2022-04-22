import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  constructor(
    private router: Router
  ) {
    console.log("hello - Auth Service");
  }

 isLoggedIn() {
    // return this.loggedIn.asObservable();
    //localStorage.setItem('token',"expmToken")
   //localStorage.clear();
    return localStorage.getItem('token')!=null; // Need to update
   }

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }
}