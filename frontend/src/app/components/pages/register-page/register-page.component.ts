import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {InputComponent} from "../../partials/input/input.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {IUserLogin} from "../../../interfaces/IUserLogin";
import {IUserRegister} from "../../../interfaces/IUserRegister";

@Component({
  selector: 'app-register-page',
  standalone: true,
    imports: [
        InputComponent,
        NgIf,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {


  formGroup!: FormGroup;
  isConfirmed = false;

  constructor(public authService: AuthService, formBuilder: FormBuilder, private router:Router, @Inject(PLATFORM_ID) private platformId: any) {

    this.formGroup = formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      email: [ "", [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    })
  }

  register() {
    this.isConfirmed = true;

    if (this.formGroup.invalid) {
      return;
    }

    const user:IUserRegister = {
      name: this.formGroup.value.name,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
    }

    this.authService.register(user).subscribe(
      (newUser) => {
        console.log(newUser);
        //this.setUserToLocaleStorage(newUser)
        this.router.navigate(['/profile'])
      }
    );

  }

  get fc() {
    return this.formGroup.controls;
  }
}
