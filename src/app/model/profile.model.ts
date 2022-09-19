import { UserResponseModel } from './user-response.model';
import { NumberSymbol } from '@angular/common';

export class ProfileModel {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  website: string;
  customSectionTitle: string;
  customSectionContent: string;
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  soundcloud: string;
  github: string;
  linkedin: string;
  publicId: string;
  valid: boolean;
  joinedOn: any;
  followingStatus: boolean;
  followers: number;
  following: number;
  thumbnail: string = '';
  user: UserResponseModel;
}
