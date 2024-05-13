import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, retry, tap} from "rxjs";
import {User} from "../../models/User";
import * as http from "node:http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/api/users").pipe(
      tap({
        next: (users) => {
          console.log(users);
        }, error: (error) => console.log(error)
        }
      )
    )
  }

}
