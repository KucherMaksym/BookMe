  import {Component, Inject, OnDestroy, PLATFORM_ID} from '@angular/core';
  import {AuthService} from "../../../services/auth.service";
  import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
  import {isPlatformBrowser, JsonPipe, NgIf} from "@angular/common";
  import {IUserLogin} from "../../../interfaces/IUserLogin";
  import {InputComponent} from "../../partials/input/input.component";
  import {Router, RouterLink} from "@angular/router";
  import {HTTP_INTERCEPTORS} from "@angular/common/http";
  import {User} from "../../../../models/User";
  import {user} from "@angular/fire/auth";

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      JsonPipe,
      InputComponent,
      NgIf,
      RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
  })
  export class LoginComponent{

    formGroup!: FormGroup;
    isConfirmed = false;

    constructor(public authService: AuthService, formBuilder: FormBuilder, private router:Router, @Inject(PLATFORM_ID) private platformId: any) {

      this.formGroup = formBuilder.group({
        email: [ "", [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      })
    }

    login() {
      this.isConfirmed = true;

      if (this.formGroup.invalid) {
        return;
      }

      const user:IUserLogin = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.password,
      }

      this.authService.login(user).subscribe(
        (newUser) => {
          //this.setUserToLocaleStorage(newUser)
          this.router.navigate(['/profile'])

        }
      );

    }

    get fc() {
      return this.formGroup.controls;
    }
  }
