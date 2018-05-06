import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationCookieInterceptor } from './Interceptors/authentication.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxlkBbuOmlXCDtqn0unAwgEKzOoiNqRt8'
    }),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthenticationCookieInterceptor,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
