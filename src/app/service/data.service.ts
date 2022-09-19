import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfileModel } from '../model/profile.model';
import { UserService } from './user.service';

@Injectable()
export class DataService {
  private profileSource = new BehaviorSubject<ProfileModel>(new ProfileModel());
  currentProfile = this.profileSource.asObservable();
  private searchKey = new BehaviorSubject<string>('');
  currentKey = this.searchKey.asObservable();

  constructor(private userService: UserService) {
    if (userService.loggedIn()) {
      let loggedInUser = userService.getUserId();
      userService
        .getUserProfile(loggedInUser)
        .subscribe((response) => this.updateProfile(response));
    }
  }

  updateProfile(profile: ProfileModel) {
    this.profileSource.next(profile);
  }

  setSearchKey(key: string) {
    this.searchKey.next(key);
  }
}
