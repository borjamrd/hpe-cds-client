import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = new FormControl('');
  password = new FormControl('');

  constructor(private _userService: UserService, private _router: Router) {}

  login() {
    this._userService
      .login(this.username.value, this.password.value)
      .subscribe({
        next: (resp: any) => {
          // alert('workd')
          console.log(resp);
          this._userService.setUser(resp.user);
          localStorage.setItem('user', JSON.stringify(resp.user));
          this._router.navigate(['/cities']);
        },
        error: (err: any) => {
          console.error(err);
          alert('usuario o contraseña incorrectos');
        },
      });
  }
}
