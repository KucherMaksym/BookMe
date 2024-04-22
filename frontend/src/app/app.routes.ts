import { Routes } from '@angular/router';
import {NewHotelPageComponent} from "./components/pages/new-hotel-page/new-hotel-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";

export const routes: Routes = [

  {
    path:'',
    component: HomePageComponent
  },
  {
    path:"new-hotel",
    component:NewHotelPageComponent
  }




];
