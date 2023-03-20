import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any = {};

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.user = this._userService.userValue;
  }

  logout() {
    this._userService.logout();
  }
}
