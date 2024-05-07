import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService) {
  }

  // ngOnInit(): void {
  //   this.authService.isAuthenticated().subscribe(isAuthenticated => {
  //     console.log(isAuthenticated);
  //   })
  // }
}
