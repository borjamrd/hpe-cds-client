import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  cities: { code: string; label: string; parent_code: string }[] = [];
  favCities: any = []
  selectedCity: any = {};
  loadspinner: boolean = false;

  public model: any;
  constructor(private _citiesService: CitiesService) {}

  ngOnInit(): void {
    this.getCities();
    this._citiesService.favoriteCities.subscribe((resp: any) => {
      console.log(resp);
      this.favCities = resp
    });
  }

  getCities() {
    this._citiesService.getCities().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.cities = resp.cities;
      },
      error: (err: any) => console.error(err),
    });
  }

  deleteFav(city: any){
    this._citiesService.deleteFromFavorites(city)
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(100),
      map((term) => {
        return term === ''
          ? []
          : this.cities
              .filter(
                (v: any) =>
                  v.label.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10);
      })
    );
  };
  formatter = (x: { label: string }) => x.label;

  viewInfo() {
    if (this.model.label) {
      this.loadspinner = true;
      this._citiesService.getCityInfo(this.model.label).subscribe({
        next: (resp: any) => {
          // console.log(resp);
          this.selectedCity = resp.cityInfo;
          this.loadspinner = false;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
  }
}
