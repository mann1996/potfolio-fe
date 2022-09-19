import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { DataService } from '../service/data.service';
import { PostResponseModel } from '../model/post-response.model';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss'],
})
export class SearchPostComponent implements OnInit {
  postList: PostResponseModel[];
  constructor(private postService: PostService, private data: DataService) {}

  ngOnInit(): void {
    this.data.currentKey.subscribe((key) => {
      this.search(key);
    });
  }

  search(key: string) {
    if (key.length > 0)
      this.postService
        .searchPost(key)
        .subscribe((posts) => (this.postList = posts));
  }
}
