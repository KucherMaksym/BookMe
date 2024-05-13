import { Routes } from '@angular/router';
import {NewHotelPageComponent} from "./components/pages/new-hotel-page/new-hotel-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {HotelPageComponent} from "./components/pages/hotel-page/hotel-page.component";
import {SearchPageComponent} from "./components/pages/search-page/search-page.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {ProtectedComponent} from "./components/pages/protected/protected.component";
import {AuthGuard} from "./auth.guard";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {RegisterPageComponent} from "./components/pages/register-page/register-page.component";
import {ChatComponent} from "./components/partials/chat/chat.component";

export const routes: Routes = [

  {
    path: '',
    component: HomePageComponent
  },
  {
    path:"new-hotel",
    component:NewHotelPageComponent,
  },
  {
    path: "hotel/:id",
    component:HotelPageComponent
  },
  {
    path:"search-page",
    component:SearchPageComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterPageComponent
  },
  {
    path: "profile/chat",
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'user/:id',
  //   component: ProfileComponent
  // },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },










  {
    path: '**',
    redirectTo: 'login'
  },





];
