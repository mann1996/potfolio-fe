import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import { FileUploadService } from '../service/file-upload.service';
import { PostRequestModel } from '../model/post-request.model';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostResponseModel } from '../model/post-response.model';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
})
export class PostEditorComponent implements OnInit {
  editorjs: EditorJS;
  postModel: PostRequestModel = new PostRequestModel();
  imgSrc: string = '';
  selectedImage: any = null;
  status: string;
  currentPost: PostResponseModel = new PostResponseModel();
  constructor(
    private fileUpload: FileUploadService,
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    var fu = this.fileUpload;
    let id = 0;
    this.route.queryParams.subscribe((params) => {
      if (params['id']) id = params['id'];
    });
    let data: any;
    if (id > 0) {
      this.postService.findPost(id).subscribe((post) => {
        this.currentPost = post;
        if (
          this.currentPost.createdBy.publicId != this.userService.getUserId()
        ) {
          this.router.navigate(['/']);
        }
        this.postModel.content = this.currentPost.content;
        this.postModel.isPublic = this.currentPost.isPublic;
        this.postModel.thumbnail = this.imgSrc = this.currentPost.thumbnail;
        this.postModel.title = this.currentPost.title;
        data = JSON.parse(this.postModel.content);
        this.editorjs = new EditorJS({
          holderId: 'editor-js',
          tools: {
            header: {
              class: Header,
              inlineToolbar: true,
            },
            list: {
              class: List,
              inlineToolbar: true,
            },
            image: {
              class: Image,
              config: {
                uploader: {
                  uploadByFile(file) {
                    var path = `${'post_img'}/${'img'}_${new Date().getTime()}`;
                    return fu.uploadFile(path, file).then((url) => {
                      return {
                        success: 1,
                        file: {
                          url: url,
                        },
                      };
                    });
                  },
                },
              },
            },
            embed: {
              class: Embed,
              inlineToolbar: true,
              config: {
                services: {
                  youtube: true,
                  twitter: true,
                  instagram: true,
                },
              },
            },
          },
          data: data,
        });
      });
    } else
      this.editorjs = new EditorJS({
        holderId: 'editor-js',
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile(file) {
                  var path = `${'post_img'}/${'img'}_${new Date().getTime()}`;
                  return fu.uploadFile(path, file).then((url) => {
                    return {
                      success: 1,
                      file: {
                        url: url,
                      },
                    };
                  });
                },
              },
            },
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                twitter: true,
                instagram: true,
              },
            },
          },
        },
      });
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      var filePath = `${'post_thumbs'}/${'img'}_${new Date().getTime()}`;
      this.fileUpload.uploadFile(filePath, this.selectedImage).then((url) => {
        this.imgSrc = this.postModel.thumbnail = url;
      });
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }

  submitPost() {
    this.status = null;
    if (this.postModel.title)
      this.editorjs.saver.save().then((data) => {
        if (data.blocks.length > 0) {
          this.postModel.content = JSON.stringify(data);

          this.postService
            .savePost(this.postModel, this.currentPost.id)
            .subscribe((id) =>
              this.router.navigate(['profile/' + this.userService.getUserId()])
            );
        } else {
          this.status = 'Please enter post description';
        }
      });
    else this.status = 'Please Enter post title';
  }
}
