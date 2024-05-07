import {Component, contentChild, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyPipe, DOCUMENT, isPlatformBrowser, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Hotel} from "../../../../models/Hotel";
import {HotelService} from "../../../services/hotel.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    CurrencyPipe,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnDestroy, OnInit{
  formGroup!: FormGroup;
  hotels!:Hotel[];
  isSaveSearchParams:boolean = false;

  constructor(private formBuilder:FormBuilder, private hotelService:HotelService, @Inject(PLATFORM_ID) private platformId: any) {

  }

  ngOnInit(): void {

    const searchParamsFromLocalStorage = this.getFromLocalStorage();
    console.log("searchParamsFromLocalStorage:" + searchParamsFromLocalStorage)

    this.formGroup = this.formBuilder.group({
      name: searchParamsFromLocalStorage ? searchParamsFromLocalStorage.name : [""],
      minPrice: searchParamsFromLocalStorage ? searchParamsFromLocalStorage.minPrice : [0],
      maxPrice: searchParamsFromLocalStorage ? searchParamsFromLocalStorage.maxPrice : [1000],
      location: searchParamsFromLocalStorage ? searchParamsFromLocalStorage.location : [""],
      rating: searchParamsFromLocalStorage ? searchParamsFromLocalStorage.rating : [""],
    });



    this.getHotels();
  }

  selectAll(event: any): void {
    event.target.select();
  }

  submit() {
    this.getHotels()
  }



  getHotels() {
    const filters = {
      name: this.formGroup.value.name,
      minPrice: this.formGroup.value.minPrice,
      maxPrice: this.formGroup.value.maxPrice,
      location: this.formGroup.value.location,
      rating: this.formGroup.value.rating
    };

    this.hotelService.getHotels(filters).subscribe(hotels => {
      this.hotels = hotels;
    })
  }


  private setSearchToLocaleStorage(formGroup:FormGroup): void {
    if (isPlatformBrowser(this.platformId)) {
    const searchParams = JSON.stringify(formGroup.value);
    console.log(searchParams);
      localStorage.setItem("SearchParams", searchParams);
    }
  }

  private getFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const searchParamsJson = localStorage.getItem("SearchParams");
      if (searchParamsJson) return JSON.parse(searchParamsJson);
      return null;
    }
  }

  ngOnDestroy(): void {
    if (!this.isSaveSearchParams) {
      if (isPlatformBrowser(this.platformId)) localStorage.removeItem("SearchParams");
      return;
    }
    this.setSearchToLocaleStorage(this.formGroup);
  }


  saveSearchParams() {
    this.isSaveSearchParams = !this.isSaveSearchParams;
    console.log(this.isSaveSearchParams);
  }

  inputNotEmpty(event:any) {
    if(event.target.value !== "") event.target.classList.add("touched")
    else event.target.classList.remove("touched")

  }


}
