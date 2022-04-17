import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user:string= '';
  pass:string='';
  constructor(public auth: AngularFireAuth) {
   }

  ngOnInit(): void {
  }

  register(e:any){
   this.auth.createUserWithEmailAndPassword(this.user,this.pass).then(d=>{
     console.log(d);
   })
  }

}
