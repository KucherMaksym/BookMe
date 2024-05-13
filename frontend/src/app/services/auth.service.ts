import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUserLogin} from "../interfaces/IUserLogin";
import {BehaviorSubject, catchError, map, Observable, pipe, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {IUserRegister} from "../interfaces/IUserRegister";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public cookieSubject = new BehaviorSubject<boolean>(false);

  toastr=inject(ToastrService)

  private _user = new BehaviorSubject<User | null>(null);
  public user$ = this._user.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserProfile();
  }
  // id!: string;
  // expires!: number;
  login(credentials:IUserLogin):Observable<any> { //withCredentials надо использовать при работе с cookie или аутентификацией
    return this.http.post<any>('http://localhost:3000/api/users/login', credentials, {withCredentials: true}).pipe(
      tap({
        next: (user) => {
          this.toastr.success("Login is successful ", "Success",
            {timeOut: 2000,
              newestOnTop: true,
            });
        },
        error: (error) => this.toastr.error(error, "Error",
          {timeOut: 3000,
            newestOnTop: true,
          })
      })
    )
  }


  profile():Observable<User> {
    return this.http.post<any>('http://localhost:3000/api/users/profile', {withCredentials: true}).pipe(
      tap({
        next: (user) => {
          console.log("success", user)
        },
        error: (error) => console.log(error)
      })
    )
  };

  isAuthenticated(): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:3000/api/users/check', { withCredentials: true }).pipe(
      tap(isAuthenticated => {
        this.isAuthenticatedSubject.next(isAuthenticated);
        this.cookieSubject.next(isAuthenticated); // Обновляем значение cookieSubject
      }),
      catchError(error => {
        this.isAuthenticatedSubject.next(false);
        this.cookieSubject.next(false); // Обновляем значение cookieSubject
        return throwError(error);
      })
    );
  }


  private loadUserProfile(): void {
    this.http.post<User>('http://localhost:3000/api/users/profile', { withCredentials: true }).pipe(
      tap({
        next: (user) => {
          this._user.next(user);
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error, "Error", {
            timeOut: 3000,
            newestOnTop: true,
          });
        }
      })
    ).subscribe();
  }

  updateUserProfile(newInfo: Object): void {
    const userId = this._user.value?.id;
    if (userId) {
      this.http.patch(`http://localhost:3000/api/users/patch/${userId}`, newInfo).pipe(
        tap({
          next: (updatedUser:any) => {
            this._user.next(updatedUser);
            this.toastr.success("Successfully edited!", "Success", {
              timeOut: 2000,
              newestOnTop: true,
            });
          },
          error: (error) => {
            console.log(error);
            this.toastr.error(error, "Error", {
              timeOut: 3000,
              newestOnTop: true,
            });
          }
        })
      ).subscribe();
    }
  }

  logout(): void {
    this.http.post('http://localhost:3000/api/users/logout', {}).subscribe(() => {
      this._user.next(null);
      this.router.navigate(['login']);
    });
  }

  protected(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3000/protected', {withCredentials: true})
  }


  getUserById(id: string): Observable<User> {
    return this.http.get<User>('http://localhost:3000/api/users/' + id).pipe(
      tap({
        next: (user) => {
          console.log("success", user)
        },
        error: (error) => console.log(error)
      })
    )
  };

  register(user:IUserRegister): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/users/register', user).pipe(
      tap({
        next: (user) => {
          this.toastr.success("User registered successfully!", "Success",
            {timeOut: 2000,
            newestOnTop: true,
            });
        },
        error: (error) => this.toastr.error(error, "Error",
          {timeOut: 3000,
            newestOnTop: true,
          })
      })
    )
  }

  editProfile(id: string, newInfo:Object): Observable<any> {
    return this.http.patch("http://localhost:3000/api/users/patch/" + id, newInfo).pipe(
      tap({
        next: (user) => {
          this.toastr.success("Successfully edited!", "Success",
            {timeOut: 2000,
              newestOnTop: true,
            });
        },
        error: (error) => this.toastr.error(error, "Error",
          {timeOut: 3000,
            newestOnTop: true,
          })
      })
    );
  }



}
