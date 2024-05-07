import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from '@angular/common/http';
import {AuthInterceptor} from "./auth.interceptor";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, provideToastr(), provideAnimations()],
};
