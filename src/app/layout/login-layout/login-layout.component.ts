import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  showLoader: any = false;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.listenToLoading();
  }
  listenToLoading(): void {
    this.data.showLoader
      .subscribe((loading) => {
        this.showLoader = loading;
      });
  }
}
