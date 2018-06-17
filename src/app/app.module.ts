import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { AccordionModule } from 'ngx-accordion';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthenticationInterceptor } from './authentication-interceptor';
import { CallUsComponent } from './call-us/call-us.component';
import { HomeComponent as AccountHomeComponent } from './account/home/home.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { CheckoutComponent } from './checkout/checkout.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'services',
    component: OurServicesComponent
  }, {
    path: 'checkout',
    component: CheckoutComponent
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'contact',
    component: CallUsComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'logout',
    component: LogoutComponent
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'account',
    component: AccountHomeComponent
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
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    CallUsComponent,
    AccountHomeComponent,
    OurServicesComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxlkBbuOmlXCDtqn0unAwgEKzOoiNqRt8'
    }),
    HttpClientModule,
    FormsModule,
    OwlModule,
    AccordionModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
