import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HotelService} from "../../../services/hotel.service";
import {Hotel} from "../../../../models/Hotel";
import {CurrencyPipe, formatCurrency, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {IMAGE_PATH} from "../../../constants";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  file:string = "https://firebasestorage.googleapis.com/v0/b/booking-e5728.appspot.com/o/uploads%2 F1714321000388-MBH-Architectural-Gardens-Exterior-300DPI-1200x800.jpg    ?alt=media&token=eff1add2-19f8-4447-87fe-f91379d170f4"

  hotels:Hotel[] =[];
  constructor(private http: HttpClient, private hotelService: HotelService) {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
      (error) => {
        console.error('Ошибка при получении отелей:', error);
      }
    );

  }

  // onFilesSelected(event:any) {
  //   this.selectedFiles = Array.from(event.target.files);
  // }
  //
  // uploadImages() {
  //   if (this.selectedFiles.length === 0) {
  //     return;
  //   }
  //
  //   const formData = new FormData();
  //   for (const file of this.selectedFiles) {
  //     formData.append('images', file);
  //   }
  //
  //   this.http.post('http://localhost:3000/api/upload', formData)
  //     .subscribe(
  //       (response) => {
  //         console.log('Images uploaded successfully:', response);
  //         // Дополнительная логика после успешной загрузки
  //       },
  //       (error) => {
  //         console.error('Error uploading images:', error);
  //       }
  //     );
  // }

  protected readonly IMAGE_PATH = IMAGE_PATH;
  protected readonly formatCurrency = formatCurrency;
  protected readonly Math = Math;
}
