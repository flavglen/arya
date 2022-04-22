import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errPwdStatus:boolean = false;
  errPwdMessage:string;
  constructor(private authService: AuthService, private frmBuilder: FormBuilder, private router: Router,
    private pstService: PostsService) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required])
    });
    
  }
    get email() { 
    return this.registerForm.get('email');   
  }

 
 conformPwdValidation() {
   if(this.registerForm.value.password !== this.registerForm.value.confirmPassword){
     this.errPwdStatus = true;
     this.errPwdMessage = "Password and Confirm Password Not match";     
   }
   else {
    this.errPwdStatus = false;
    this.errPwdMessage = '';
   }

 }
 
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if(this.errPwdStatus){
      return;
    }
    const userDetails = {
      Username: this.registerForm.value.userName,
      Email: this.registerForm.value.email,
      Password: this.registerForm.value.password
    }
    this.pstService.usrRegister(userDetails).subscribe(res => {
      if (res.success == true) {
        this.pstService.showSuccess(res.message, "Success");
        this.pstService.showSuccess("Please login with your Credentials", "Success");
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
      else {
        this.pstService.showWarn(res.message, "Error");
      }
    },
      error => {
        this.pstService.showError("Please ReCheck", "Error")
      });
  }

  onClickSignIn(){
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

}
