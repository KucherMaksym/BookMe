import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TransparencyDirective} from "../../../directives/transparency.directive";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TransparencyDirective,
    NgIf,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  logged!: boolean;
  expanded = false;

  constructor(private authService: AuthService,private router:Router) {
    this.isLoggedIn()
  }

  ngAfterViewInit() {
    this.isLoggedIn()
    }

    toggleExpanded() {
      this.expanded = !this.expanded
    }

    get headerClasses() {
      return {
        'visible': this.expanded
      };
    }

  isLoggedIn () {
    return this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.logged = isAuthenticated
    });

  }



}
