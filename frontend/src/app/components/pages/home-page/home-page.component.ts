import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HotelService} from "../../../services/hotel.service";
import {Hotel} from "../../../../models/Hotel";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  selectedFiles: File[] = [];

  hotels:Hotel[] =[];
  constructor(private http: HttpClient, private hotelService: HotelService) {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
        console.log(this.hotels);
      },
      (error) => {
        console.error('Ошибка при получении отелей:', error);
      }
    );
  }

  onFilesSelected(event:any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadImages() {
    if (this.selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    this.http.post('http://localhost:3000/api/upload', formData)
      .subscribe(
        (response) => {
          console.log('Images uploaded successfully:', response);
          // Дополнительная логика после успешной загрузки
        },
        (error) => {
          console.error('Error uploading images:', error);
        }
      );
  }

}
