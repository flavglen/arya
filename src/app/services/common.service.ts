import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public uName: any;
  public UserName = '';
  constructor() { }

  public msgSource = new BehaviorSubject<string>('');
  telecast = this.msgSource.asObservable();

  editUserName(newUsr: string) {
    this.msgSource.next(newUsr);
  }
}
