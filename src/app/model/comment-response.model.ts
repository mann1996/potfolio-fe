import { UserResponseModel } from './user-response.model';
import { SimpleUserModel } from './simple-user.model';

export class CommentResponseModel {
  createdAt: Date;
  createdBy: SimpleUserModel;
  content: string;
}
