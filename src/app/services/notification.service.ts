import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable"
import { map } from "rxjs/operators";
// import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  querystring: string='';
  constructor(public http: HttpClient) { }

  public getNotification(pageno: number, pageSize: number, IsRead: string) {
    this.querystring = '';
    if (IsRead.length > 0) {
      this.querystring = "&isRead=";
      if (IsRead == 'read')
        this.querystring += 'true';
      else
      this.querystring += 'false';
    }
    return this.http
      .post(environment.URL + "Notification/GetNotifications?pageNumber=" + pageno + "&pageSize=" + pageSize + this.querystring, null)
      .pipe(map(res => res));
  }
  public readNotification(a: number[]) {
    return this.http
      .post(environment.URL + "Notification/MarkNotificationAsRead", a)
      .pipe(map(res => res));

  }

}
