import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false

  constructor(private authService: AuthService, private frmBuilder: FormBuilder, private router: Router,
    private pstService: PostsService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginForm.patchValue({
      userName:"swarna",
      password:"123456",
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginDetails = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    }
    /* Start -- get Logged In User Name */
    // this.commonService.editUserName(this.loginForm.value.userName); -- Beh Sub
    //  localStorage.setItem('userName',this.loginForm.value.userName)
    /* End -- get Logged In User Name */

    this.pstService.usrLogin(loginDetails).subscribe(res => {
      
      if (res.success == true) {
        window.localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.userInfo.UserName);
        if (res.data.userInfo.UserDetail.length > 0)
          localStorage.setItem('picture', res.data.userInfo.UserDetail[0].Picture);
        else
          localStorage.setItem('picture', "");
        this.pstService.showSuccess(res.message, "Success")
        this.router.navigate(['dashboard']).then(() => {
          window.location.reload();
        });
      }
      else {
        this.invalidLogin = true;
        this.pstService.showWarn(res.message, "Error")
      }
    },
      error => {
        this.pstService.showError("Please ReCheck", "Error");
      });
  }

  onClickSignUp() {
    this.router.navigate(['register']).then(() => {
      window.location.reload();
    });
  }

}
