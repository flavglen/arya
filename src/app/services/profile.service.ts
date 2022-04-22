import { Injectable } from "@angular/core";

import { HttpClient, HttpEventType, HttpParams, HttpRequest } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable"
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  querystring: string;
  constructor(public http: HttpClient) { }

  public getProfile() {
    return this.http.get(environment.URL + "Login/GetUserInfo")
      .pipe(map(res => res));
  }

  public getCountries(){
    return this.http.get(environment.URL + "Common/GetCountries")
      .pipe(map(res => res));
  }

  public updateProfile(userDetails: any) {
    return this.http.post(environment.URL + "Login/UpdateUserProfile", userDetails)
      .pipe(map(res => res));
  }

  public getSettings() {
    return this.http.get(environment.URL + "Login/GetUserSettings")
      .pipe(map(res => res));
  }

  public updateSettings(userDetails: any) {
    return this.http.post(environment.URL + "Login/UpdateUserSettings", userDetails)
      .pipe(map(res => res));
  }


  public UploadDevices(data: any): Observable<any> {
    let par: HttpParams = new HttpParams().set("multiPartData", "1");

    return this.http.post(
      environment.URL + "Login/UploadImage",
      data,
      { params: par }
    );

  }
}
