import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TransparencyDirective} from "../../../directives/transparency.directive";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TransparencyDirective,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  logged!: boolean;

  constructor(private authService: AuthService,private router:Router) {
    this.isLoggedIn()
  }

  ngAfterViewInit() {
    this.isLoggedIn()
    }

  isLoggedIn () {
    return this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.logged = isAuthenticated
    });

  }



}
