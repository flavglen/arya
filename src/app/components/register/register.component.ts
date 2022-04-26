import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
  registerForm: FormGroup =new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required])
  });

  submitted = false;
  errPwdStatus:boolean = false;
  errPwdMessage:string='';
  private userCollection: AngularFirestoreCollection<any>;
  
  constructor(
    private authService: AuthService, 
    private frmBuilder: FormBuilder, 
    private router: Router,
    private pstService: PostsService,
    private auth: AngularFireAuth,
    private readonly afs: AngularFirestore
    ) { 
      this.userCollection = afs.collection<any>('users');
    }


  ngOnInit(): void {
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
    const userDetails = this.registerForm.value;

    //firebase register
    this.auth.createUserWithEmailAndPassword(userDetails.email,userDetails.password).then(userData=>{
      //registered in firebase store data in custom collection
      this.addUserToCustomCollection(userData.user?.uid);
    }).catch((e)=>{
      alert('unable to register user- firebase')
    });
  }

  onClickSignIn(){
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

  addUserToCustomCollection(uId?:string){
    const id = this.afs.createId();
    const {email,userName} = this.registerForm.value;
    const user: any = { id, email, userName, uId };
    this.userCollection.doc(id).set(user).then(re=>{
      this.registerForm.reset();
      alert('user has been added');
    }).catch(er=> {
      alert('failed to save user data');
    });
  }

}
