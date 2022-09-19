import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LoginModel } from '../model/login-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  creds: LoginModel = new LoginModel();
  errorMsg: string = '';
  isLoading: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.isLoading = true;
    this.userService.loginUser(this.creds).subscribe(
      (res) => {
        this.errorMsg = null;
        console.log(this.isLoading);
        this.userService.saveJwt(res);
        this.router.navigate(['/']);
        window.location.href = '/';
      },
      (error) => {
        this.errorMsg = 'Failed to Login';
        this.isLoading = false;
      }
    );
  }
}
