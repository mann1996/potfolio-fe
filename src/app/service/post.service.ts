import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostRequestModel } from '../model/post-request.model';
import { Observable } from 'rxjs';
import { PostResponseModel } from '../model/post-response.model';
import { CommentRequestModel } from '../model/comment-request.model';
import { CommentResponseModel } from '../model/comment-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private hostUrl: string = environment.apiUrl + '/posts/';
  constructor(private http: HttpClient) {}

  savePost(post: PostRequestModel, id: number) {
    return this.http.post(this.hostUrl + 'save?id=' + id, post);
  }

  findPost(id: number): Observable<PostResponseModel> {
    return this.http.get<PostResponseModel>(this.hostUrl + 'view/' + id);
  }

  findPublicPostsByUser(userId: String): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>(
      this.hostUrl + 'user/' + userId + '/public'
    );
  }

  deletePost(id: number) {
    return this.http.delete(this.hostUrl + 'delete/' + id);
  }

  findPublicPosts(): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>(this.hostUrl);
  }

  toggleLike(id: number): Observable<number> {
    return this.http.get<number>(this.hostUrl + 'toggle/like/' + id);
  }

  addView(id: number): Observable<number> {
    return this.http.get<number>(this.hostUrl + 'add/view/' + id);
  }

  searchPost(key: string): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>(
      this.hostUrl + 'search?key=' + key
    );
  }

  findBySubscription(): Observable<PostResponseModel[]> {
    return this.http.get<PostResponseModel[]>(this.hostUrl + 'subscription');
  }

  postComment(comment: CommentRequestModel): Observable<CommentResponseModel> {
    return this.http.post<CommentResponseModel>(
      this.hostUrl + 'post/comment',
      comment
    );
  }

  getComments(postId: number): Observable<CommentResponseModel[]> {
    return this.http.get<CommentResponseModel[]>(
      this.hostUrl + 'comments/' + postId
    );
  }
}
