import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { post, postComments, postLikes } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postId: number = 0;
  comment: string = '';
  comments: postComments[] = [];
  likes: postLikes[] = [];
  showComments: boolean = false;
  showLikes: boolean = false;
  enableScroling: boolean = true;
  pageNumber: number = 1;
  pageSize: number = 5;
  Showform: boolean = false;
  dashboardForm: FormGroup = new FormGroup({});

  //new 
  private postCollection: AngularFirestoreCollection<any> | undefined;
  posts: any[] = [];
  items = [
    {
      label: 'Interested',
      icon: 'pi pi-external-link',
    },
    {
      label: 'Edit',
      icon: 'pi pi-external-link',
    },
    {
      label: 'Start Match',
      icon: 'pi pi-external-link',
    }
  ];

  constructor(private activatedRoute: ActivatedRoute, private postService: PostsService, private readonly afs: AngularFirestore) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.getPosts();
  }

  getPosts() {
    this.postCollection = this.afs.collection<any>('posts');
    this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        // convert timestap to date
        data.startdate = data.startdate.toDate();
        data.enddate = data.enddate.toDate();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe(posts => {
        this.posts = posts;
        console.log(posts);
      });
  }

  editPost() {

  }

  // getComments() {

  // }
  // getLikes(){

  // }
  // saveComment() {

  // }

  // like(postID: any, status: any, liked: number) {

  // }
  // toggleComments() {

  // }
  // toggleLikes()
  // {

  // }
  // getPicture(id: number) {
  // }

  // onScroll() {

  // }
  // resetform() {

  // }
  // onSubmit(type:any) {


  // }
  // editPost() {

  // }
}
