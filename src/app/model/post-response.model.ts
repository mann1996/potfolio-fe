import { UserResponseModel } from './user-response.model';
import { ProfileModel } from './profile.model';

export class PostResponseModel {
  id: number = 0;
  title: string;
  thumbnail: string;
  isPublic: boolean = true;
  content: string;
  createdBy: ProfileModel;
  likes: number = 0;
  views: number = 0;
  createdAt: any;
  updatedAt: any;
  isLiked: boolean;
}
