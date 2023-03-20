import { UserService } from 'src/app/services/user.service';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'city-info',
  templateUrl: './cityinfo.component.html',
  styleUrls: ['./cityinfo.component.css'],
})
export class CityinfoComponent implements OnInit, OnChanges {
  @Input() cityInfo: any = {};
  user: any = {};
  maps: any = '';
  isFavorite: boolean = true;
  mapOptions: any = {
    center: null,
  };
  weatherImg: any = '';
  constructor(
    private _userService: UserService,
    private _citiesService: CitiesService
  ) {}

  ngOnInit() {
    this.user = this._userService.userValue;
    this._citiesService.favoriteCities.subscribe((resp: any) => {
      console.log(resp);
      let cities = resp;
      if (cities.includes(this.cityInfo.name)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.cityInfo = changes['cityInfo']['currentValue'];
      this.mapOptions = {
        center: {
          lat: this.cityInfo.coord['lat'],
          lng: this.cityInfo.coord['lon'],
        },
      };
      this.weatherImg = `https://openweathermap.org/img/wn/${this.cityInfo.weather[0].icon}.png`;
    }
  }

  checkFavAndUser() {
    console.log(this.user)
    if (this.user.rol === 'regular') {
      return true;
    } else if (this.isFavorite) {
      return true;
    } else {
      return false
    }
  }
  toCelsius(temp: any) {
    let t = Math.round((temp - 32) * (5 / 9));
    return t;
  }

  addToFavorites(cityInfo: any) {
    this._citiesService.addToFavorite(cityInfo.name);
  }
}
