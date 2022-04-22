import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";



import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { DataService } from "./data.service";
import { PostsService } from "./posts.service";



@Injectable()
export class CustomHttpHandler implements HttpInterceptor {
  public pendingRequests: number = 0;
  public showLoading: boolean = false;
  public lastResponseCode: number = 0;

  constructor(private router: Router, private data: DataService, private postService: PostsService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let silentServerFetch: boolean = false;

    let par: any;
    if (request.params.has("silentServerFetch")) {
      silentServerFetch = true;
      par = request.params.delete("silentServerFetch");
    } else {
      par = request.params;
    }

    let reqheaders: any;

    if (request.params.has("multiPartData")) {
      par = request.params.delete("multiPartData");
      reqheaders = {
        "X-Frame-Options": "SAMEORIGIN",
        enctype: "multipart/form-data",
        "X-Timezone-Offset": this.getTimezoneOffset(),
      };
    } else {
      reqheaders = {
        "Content-Type": "application/json",
        "X-Timezone-Offset": this.getTimezoneOffset(),
        "X-Frame-Options": "SAMEORIGIN",
      };
    }

    request = request.clone({
      withCredentials: true,
      setHeaders: reqheaders,
      params: par,
    });

    if (!silentServerFetch) {
      this.turnOnLoading();
    }

    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    this.data.changeShowLoader(true);
    return next
      .handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            console.log(" all looks good");
            // http response status code
            console.log(event.status);
          }
        }, error => {
          console.error(error.status);
          if (error.status == 350) {
            //login
            this.router.navigate(["/login"]);
            this.lastResponseCode = error.status;
          } else if (error.status == 401) {
            this.router.navigate(["/login"]);
            this.postService.showWarn("You are unauthorized to view this page", "");
            this.lastResponseCode = error.status;
            return;
          } else if (error.status == 500) {
            this.postService.showWarn("Something went wrong at server.", "");
            this.lastResponseCode = error.status;
            return;
          } else if (error.status == 352) {
            this.router.navigate(["/login"]);
            //toastr.warning(response.statusText);
            this.lastResponseCode = error.status;
            return;
          }

        }),
        finalize(() => this.data.changeShowLoader(false)));

  }

  private getTimezoneOffset(): string {
    return String(new Date().getTimezoneOffset() * -1);
  }

  private turnOnLoading() {
    console.log("Loading Indicator Turn On Method Called");
    this.pendingRequests++;
    if (!this.showLoading) {
      this.showLoading = true;
      console.log("Turned On Loading Indicator");
    }
  }

  private turnOffLoading() {
    //console.log("Loading Indicator Turn off Method Called");
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        setTimeout(() => {
        }, 1000);
        console.log("Turned off Loading Indicator");
      }
      this.showLoading = false;
    }
  }
}
