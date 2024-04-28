import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('http://localhost:3000/api/hotels/getAll');
  }

  getHotelById(id:string):Observable<Hotel> {
    return this.http.get<Hotel>("http://localhost:3000/api/hotels/" + id)
  }


}
