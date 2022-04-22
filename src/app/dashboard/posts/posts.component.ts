import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  post: post = new post();
  comments: postComments[] = [];
  likes:postLikes[]  = [];
  showComments: boolean = false;
  showLikes: boolean = false;
  enableScroling: boolean = true;
  pageNumber: number = 1;
  pageSize: number = 5;
  Showform: boolean = false;
  dashboardForm: FormGroup = new FormGroup({});
  constructor(private activatedRoute: ActivatedRoute, private postService: PostsService) { }

  ngOnInit(): void {
    this.dashboardForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    });
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.getPost()
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe((res: any) => {
      if (res.success) {
        this.post = res.data;
        console.log(this.post);
      }
      else {
        this.postService.showWarn(res.message, "")
      }

    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }
  getComments() {
    this.postService.getPostComments(this.postId, this.pageNumber, this.pageSize).subscribe((res: any) => {
      if (res.success) {
        res.data.forEach((element: postComments) => {
          this.comments.push(element);
        });
        if (res.data < this.pageSize)
          this.enableScroling = false;
      }
      else {
        this.postService.showWarn(res.message, "")
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }
  getLikes(){
    this.postService.getPostLikes(this.postId).subscribe((res: any) => {
      if (res.success) {
        this.likes = res.data
        console.log(this.likes);  
      }
      else {
        this.postService.showWarn(res.message, "")
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }
  saveComment() {
    if (this.comment.trim().length == 0)
      return;
    this.postService.addComment(this.postId, this.comment).subscribe((res: any) => {
      if (res.success) {
        this.comment = "";
        this.comments = [];
        this.pageNumber = 1;
        this.enableScroling = true;
        this.getComments();
        this.post.CommentsCount = this.post.CommentsCount + 1;
      } else {
        this.postService.showWarn(res.message, "")
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }

  like(postID: any, status: any, liked: number) {
    if (status == liked)
      return;
    this.postService.likePost({ "postId": postID, "status": status }).subscribe((res: any) => {
      if (res.success) {
        this.post.Liked = status;
        if (status == 1) {
          this.post.LikesCount += 1;
          if (liked == 2)
            this.post.UnlikeCount -= 1;
        }
        else {
          if (liked == 1)
            this.post.LikesCount -= 1;
          this.post.UnlikeCount += 1;
        }
      }
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );
  }
  toggleComments() {
    if (!this.showComments && this.comments.length == 0 )
      this.getComments();
    this.showComments = !this.showComments;
  }
  toggleLikes()
  {
    if (!this.showLikes )
      this.getLikes();
    this.showLikes = !this.showLikes;
  }
  getPicture(id: number) {
    return '../assets/images/profilepic.png';
  }

  onScroll() {
    if (this.enableScroling) {
      this.pageNumber += 1;
      this.getComments();
    }
  }
  resetform() {
    this.Showform = false;
    this.dashboardForm.reset();
  }
  onSubmit(type:any) {
    console.log(type);
    if (!this.dashboardForm.valid) {
      this.postService.showWarn("Please Fill Details", "");
      return;
    }
    const descDetails = {
      Content: this.dashboardForm.value.description,
      Title: this.dashboardForm.value.title,
      Id: this.post.Id,
      Status:type
    }

    this.postService.createNewPost(descDetails).subscribe((res: any) => {
      if (res.success) {
        this.Showform = false
        this.getPost();
        this.postService.showSuccess("Post Updated Successfully", "");
      }
      else
        this.postService.showError("Please contact Admin", "Error");
    },
      (err) => {
        console.log("Some Thing wrong");
      }
    );

  }
  editPost() {
    this.Showform = true;
    this.dashboardForm.patchValue({
      title: this.post.Title,
      description: this.post.Content,
    });
  }
}
