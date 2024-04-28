import { Routes } from '@angular/router';
import {NewHotelPageComponent} from "./components/pages/new-hotel-page/new-hotel-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {HotelPageComponent} from "./components/pages/hotel-page/hotel-page.component";

export const routes: Routes = [

  {
    path:'',
    component: HomePageComponent
  },
  {
    path:"new-hotel",
    component:NewHotelPageComponent
  },
  {
    path: "hotel/:id",
    component:HotelPageComponent
  }




];
