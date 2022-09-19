import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ProfileModel } from '../model/profile.model';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostResponseModel } from '../model/post-response.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: ProfileModel = new ProfileModel();
  following: boolean = false;
  publicPosts: PostResponseModel[] = [];
  likes: number = 0;
  views: number = 0;
  loggedIn: string = '';
  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedIn()) {
      this.loggedIn = this.userService.getUserId();
    }
    let userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getUserProfile(userId).subscribe((response) => {
      this.userProfile = response;
      this.postService.findPublicPostsByUser(userId).subscribe((posts) => {
        this.publicPosts = posts;
        this.likes = this.calculateLikes();
        this.views = this.calculateViews();
      });
    });
  }

  deletePost(post: PostResponseModel) {
    if (confirm('Are you sure?'))
      this.postService.deletePost(post.id).subscribe((success) => {
        let index = this.publicPosts.indexOf(post);
        this.publicPosts.splice(index, 1);
      });
  }

  toggleFollow(event) {
    event.preventDefault();
    if (this.userService.loggedIn()) {
      let userid = this.route.snapshot.paramMap.get('userId');
      this.userService.toggleFollow(userid).subscribe((success) => {
        this.userProfile.followingStatus = !this.userProfile.followingStatus;
        if (this.userProfile.followingStatus) this.userProfile.followers += 1;
        else this.userProfile.followers -= 1;
      });
    } else alert('Please sign in to follow this user.');
  }

  calculateLikes() {
    let likes: number = 0;
    this.publicPosts.forEach((post) => {
      likes += post.likes;
    });
    return likes;
  }

  calculateViews() {
    let views: number = 0;
    this.publicPosts.forEach((post) => {
      views += post.views;
    });
    return views;
  }
}
