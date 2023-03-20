import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CitiesService } from './cities.service';


describe('DataService', () => {
  let service: CitiesService;

  beforeEach(() => {
    // TestBed.configureTestingModule({}
    //   imports: [HttpClientTestingModule],
    //   providers: [CitiesService]
    // );
    service = TestBed.inject(CitiesService);
  });

  it(
    'should get cities',
    inject(
      [HttpTestingController, CitiesService],
      (httpMock: HttpTestingController, citiesService: CitiesService) => {
        const cities = [
          { parent_code: '01', code: '14', label: 'Córdoba' },
          { parent_code: '01', code: '11', label: 'Cádiz' }
        ];

        citiesService.getCities().subscribe((event: any) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(cities);
          }
        });

        const mockReq = httpMock.expectOne(citiesService.url);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(cities);

        httpMock.verify();
      }
    )
  );
});