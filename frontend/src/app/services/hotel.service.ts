import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IHotel} from "../interfaces/IHotel";
import {Observable, tap} from "rxjs";
import {Hotel} from "../../models/Hotel";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private  http: HttpClient) {


  }

  newHotel(hotel:FormData): Observable<Hotel> {
     return this.http.post<Hotel>('http://localhost:3000/api/hotels/new-hotel', hotel).pipe(
       tap({
           next: (hotel) => {
             console.log("New hotel was successfully created", hotel)
           },
           error: (error) => console.log(error)
         })
     )
  }

  getHotels(filters: any): Observable<Hotel[]> {
    const params = new HttpParams()
      .set('name', filters.name || '')
      .set("minPrice", filters.minPrice || '')
      .set("maxPrice", filters.maxPrice || '')
      .set("location", filters.location || '')
      .set("rating", filters.rating || '');
    return this.http.get<Hotel[]>('http://localhost:3000/api/hotels/getAll', { params });
  }

  getHotelById(id:string):Observable<Hotel> {
    return this.http.get<Hotel>("http://localhost:3000/api/hotels/" + id)
  }


}
