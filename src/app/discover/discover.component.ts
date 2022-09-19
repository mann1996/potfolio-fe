import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { PostResponseModel } from '../model/post-response.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  posts: PostResponseModel[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .findPublicPosts()
      .subscribe((posts) => (this.posts = posts));
  }
}
