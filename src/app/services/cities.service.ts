import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  url: string = 'http://localhost:3000/cities'
  private cities: string[] =
    JSON.parse(localStorage.getItem('cities') || '[]') || [];
  public cities$ = new BehaviorSubject<string[]>(this.cities);

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get('http://localhost:3000/cities');
  }
  getCityInfo(city: string) {
    return this.http.get(`http://localhost:3000/cities/${city}`);
  }

  get favoriteCities() {
    return this.cities$.asObservable();
  }
  addToFavorite(city: any) {
    this.cities.push(city);
    this.cities$.next(this.cities);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  deleteFromFavorites(city: any) {
    const index = this.cities.indexOf(city);
    if (index !== -1) {
      this.cities.splice(index, 1);
      this.cities$.next(this.cities);
      localStorage.setItem('cities', JSON.stringify(this.cities));
    }
  }
}
