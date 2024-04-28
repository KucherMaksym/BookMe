import { Component } from '@angular/core';
import {HotelService} from "../../../services/hotel.service";
import {ActivatedRoute} from "@angular/router";
import {Hotel} from "../../../../models/Hotel";
import {IMAGE_PATH} from "../../../constants";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-hotel-page',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './hotel-page.component.html',
  styleUrl: './hotel-page.component.scss'
})
export class HotelPageComponent {

  hotel!:Hotel;
  secondaryImages!:string[];

  constructor(hotelService:HotelService, activatedRoute: ActivatedRoute) {


    activatedRoute.params.subscribe(params => {
     const id = params['id'];

     hotelService.getHotelById(id).subscribe(hotel => {
       this.hotel = hotel;
       this.secondaryImages = hotel.images.slice(1, hotel.images.length);
     })
   })
  }

  protected readonly IMAGE_PATH = IMAGE_PATH;
}
