import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityinfoComponent } from './cityinfo.component';

describe('CityinfoComponent', () => {
  let component: CityinfoComponent;
  let fixture: ComponentFixture<CityinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
