import { Component, OnInit } from '@angular/core';
import { PostResponseModel } from '../model/post-response.model';
import { UserResponseModel } from '../model/user-response.model';
import { ProfileModel } from '../model/profile.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { CommentRequestModel } from '../model/comment-request.model';
import { CommentResponseModel } from '../model/comment-response.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: PostResponseModel = new PostResponseModel();
  postContents;
  content: string = '';
  postComments: CommentResponseModel[] = [];
  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id: number = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.postService.findPost(id).subscribe((post) => {
      this.post = post;
      this.postContents = JSON.parse(this.post.content).blocks;
      this.postService
        .addView(id)
        .subscribe((views) => (this.post.views = views));
      this.postService
        .getComments(post.id)
        .subscribe((response) => (this.postComments = response));
    });
  }

  toggleLike() {
    if (this.userService.loggedIn())
      this.postService.toggleLike(this.post.id).subscribe((likes) => {
        this.post.likes = likes;
        this.post.isLiked = !this.post.isLiked;
      });
    else alert('Sign in to Like this Post');
  }

  postComment() {
    if (this.userService.loggedIn()) {
      let comment: CommentRequestModel = new CommentRequestModel();
      comment.content = this.content;
      comment.postId = this.post.id;
      this.postService.postComment(comment).subscribe((response) => {
        this.postComments.unshift(response);
        this.content = '';
      });
    } else {
      alert('Please Sign in to comment on this post');
    }
  }
}
