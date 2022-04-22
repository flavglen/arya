import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  showLoaderSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private messageSource = new BehaviorSubject("");
  sportChangeSource: BehaviorSubject<string> = new BehaviorSubject<string>("");

  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  currentMessage = this.messageSource.asObservable();
  showLoader = this.showLoaderSource.asObservable();
  searchSport = this.sportChangeSource.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  changeShowLoader(show: boolean) {
    this.showLoaderSource.next(show);
  }
  changeSport(message: string) {
    console.log("Dataservice"+message);
    this.sportChangeSource.next(message);
  }

}
