import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { CommonService } from '../../services/common.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false

  constructor(
    private authService: AuthService, 
    private frmBuilder: FormBuilder, 
    private router: Router,
    private pstService: PostsService, 
    private commonService: CommonService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore) { }

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

    this.auth.signInWithEmailAndPassword(loginDetails.userName,loginDetails.password).then(res => {
      if (res ) {
        const user = this.afs.doc<any>('users/'+res.user?.uid);
        user.valueChanges().subscribe(cUser=>{
          console.log(cUser);
          sessionStorage.setItem('customUser',JSON.stringify(cUser));
        });
        sessionStorage.setItem('user',JSON.stringify(res));
        this.router.navigateByUrl('/');
      }
    },
      error => {
        this.pstService.showError("Please ReCheck", "Error");
      });
  }

  getCustomUserData(){
    // this.postCollection = this.afs.collection<any>('users');
    // this.postCollection.snapshotChanges()
  }
  onClickSignUp() {
    this.router.navigate(['register']).then(() => {
      window.location.reload();
    });
  }

}
