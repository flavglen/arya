import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common'
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/internal/Observable"
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class PostsService {
  querystring: string='';
  constructor(public http: HttpClient, public datepipe: DatePipe) { }

  public getPost(id: number) {
    return this.http.get(environment.URL + "Posts/GetPostById?ID=" + id)
      .pipe(map(res => res));
  }
  public getPostComments(id: number, pagenumber: number, pagesize: number) {
    this.querystring = "pageNumber=" + pagenumber;
    this.querystring += "&pageCount=" + pagesize;
    return this.http
      .get(environment.URL + "Posts/GetPostComments?postId=" + id + "&" + this.querystring)
      .pipe(map(res => res));
  }

  public getPostLikes(id: number) {
    return this.http
      .get(environment.URL + "Posts/GetPostLikes?postId=" + id)
      .pipe(map(res => res));
  }

  public addComment(id: number, comment: string) {
    return this.http
      .post(environment.URL + "Posts/PostComments?postId=" + id + "&comments=" + comment, null)
      .pipe(map(res => res));
  }

  public getPostData(searchstring: string, pagesize: number, pagenumber: number, from: any, feedtype: number): Observable<any> {
    //pageNumber=1&pageSize=2&search=ssss&from=01%2F01%2F2022&to=03%2F03%2F2022'
    debugger;
    this.querystring = "pageNumber=" + pagenumber;
    this.querystring += "&pageSize=" + pagesize;
    this.querystring += searchstring.length > 0 ? "&search=" + searchstring : "";
    this.querystring += from != null && from[0] !=null ? "&from=" + this.datepipe.transform(from[0], 'MM/dd/yyyy') : "";
    this.querystring += from != null && from[1] !=null? "&to=" + this.datepipe.transform(from[1].setDate(from[1].getDate() + 1), 'MM/dd/yyyy') : "";
    this.querystring += "&feedtype=" + feedtype;
    return this.http
      .get(environment.URL + "Posts/GetPosts?" + this.querystring)
      .pipe(map(res => res));
  }
  public getMyData(searchstring: string): Observable<any> {
    this.querystring = searchstring.length > 0 ? "search=" + searchstring : "";
    return this.http
      .get(environment.URL + "Posts/GetUserPosts?" + this.querystring)
      .pipe(map(res => res));
  }
  public createNewPost(data: any): Observable<any> {
    return this.http.post(environment.URL + "Posts/SavePosts", data);
  }

  public likePost(data: any): Observable<any> {
    return this.http.post(environment.URL + "Posts/LikePost", data);
  }
  /* User Login */

  usrLogin(usrData: any): Observable<any> {
    return this.http.post(environment.URL + "Login/login", usrData);
  }

  /* User Registration */
  usrRegister(regDetails: any): Observable<any> {
    return this.http.post(environment.URL + "Login/register", regDetails);
  }

  public getUserPicture(id: number) {
    return this.http
      .get(environment.URL + "Login/GetPicture?ID=" + id)
      .pipe(map(res => res));
  }
  public getSportsList() {
    return this.http
      .get(environment.URL + "Posts/GetSportsList")
      .pipe(map(res => res));
  }

  showSuccess(message: any, title: any) {
    //this.toastr.success(message, title);
  }
  showError(message: any, title: any) {
    alert('login  failed');
   // this.toastr.error(message, title);
  }
  showWarn(message: any, title: any) {
    //this.toastr.warning(message, title);
  }
}
