import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from './service/user.service';
import { UserResponseModel } from './model/user-response.model';
import { Router } from '@angular/router';
import { ProfileModel } from './model/profile.model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedInUser: string;
  userDetails: ProfileModel;
  title = 'portfolio-frontend';
  menuActive = false;
  constructor(
    private userService: UserService,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.data.currentProfile.subscribe((profile) => {
      this.userDetails = profile;
      this.loggedInUser = profile.publicId;
    });
  }

  activateMenu() {
    if (this.menuActive) this.menuActive = false;
    else this.menuActive = true;
  }

  signOut() {
    this.userService.clearJwt();
    window.location.reload();
  }
}
