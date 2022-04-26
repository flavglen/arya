import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  cities = [{ name: 'Select', code: 'select', id: 0 },{ name: 'Cricket', code: 'cricket', id: 1 }];
  dashboardForm = new FormGroup({
    'sportsType': new FormControl(null, [Validators.required]),
    'title': new FormControl(null, [Validators.required]),
    'description': new FormControl(null, [Validators.required]),
    'content': new FormControl(null, []),
    'startdate': new FormControl(null, [Validators.required]),
    'enddate': new FormControl(null, [Validators.required]),
    'location': new FormControl(null, [Validators.required]),
  });
  constructor(private postservice: PostsService,private readonly afs: AngularFirestore) { 
    this.itemsCollection = afs.collection<any>('posts');
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.dashboardForm.valid) {
      this.postservice.showWarn("Please Fill Details", "");
      return;
    }
    // move to service
    const user  = sessionStorage.getItem('user') || '';
    const userdata = JSON.parse(user);
    console.log(userdata);
    const id = this.afs.createId();
    const item: any = { id, ...this.dashboardForm.value };
    this.itemsCollection.doc(id).set(item).then(re=>{
      this.dashboardForm.reset();
      alert('success');
    }).catch(er=> {
      alert('error');
    });
  }
  resetform() {
    this.dashboardForm.reset();
  }
}
