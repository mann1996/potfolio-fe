import { Component, OnInit } from '@angular/core';
import { PostResponseModel } from '../model/post-response.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  posts: PostResponseModel[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .findBySubscription()
      .subscribe((response) => (this.posts = response));
  }
}
