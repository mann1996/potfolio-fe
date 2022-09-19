import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { DataService } from '../service/data.service';
import { ProfileModel } from '../model/profile.model';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss'],
})
export class SearchPeopleComponent implements OnInit {
  profileList: ProfileModel[] = [];
  loggedIn: ProfileModel = new ProfileModel();
  constructor(private userService: UserService, private data: DataService) {}

  ngOnInit(): void {
    this.data.currentKey.subscribe((key) => {
      this.search(key);
    });
    if (this.userService.loggedIn())
      this.data.currentProfile.subscribe(
        (profile) => (this.loggedIn = profile)
      );
  }

  search(key: string) {
    if (key.length > 0)
      this.userService
        .searchUser(key)
        .subscribe((profiles) => (this.profileList = profiles));
  }

  toggleFollow(user: ProfileModel) {
    if (this.userService.loggedIn()) {
      this.userService.toggleFollow(user.publicId).subscribe((success) => {
        user.followingStatus = !user.followingStatus;
      });
    } else {
      alert('Please sign in to follow this user.');
    }
  }
}
