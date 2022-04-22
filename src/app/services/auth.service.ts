import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable"
import { map } from "rxjs/operators"; 
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient,private router: Router) {}

  public checkLogin(): Observable<any> {
    return this.http
      .get(environment.URL + "Login/login")
      .pipe(map(res => res));
  }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
