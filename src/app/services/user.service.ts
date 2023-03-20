import { CitiesService } from 'src/app/services/cities.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private http: HttpClient,
     private _citiesService: CitiesService,
     private _router: Router) {
    this.userSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  login(username: any, password: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(
      'http://localhost:3000/login',
      { username, password },
      httpOptions
    );
  }

  setUser(user: any) {
    return this.userSubject.next(user);
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear()
    this.userSubject.next(null);
    this._citiesService.cities$.next([]);
    this._router.navigate(['/login']);
  }
}
