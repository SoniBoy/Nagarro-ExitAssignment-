import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListingDetailComponent } from './listings/listing-detail/listing-detail.component';
import { ListingListComponent } from './listings/listing-list/listing-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ListItemComponent } from './listings/listing-list/list-item/list-item.component';
import { AddListingComponent } from './listings/add-listing/add-listing.component';
import { WishlistComponent } from './wishlist/wishlist.component';



import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth/auth.service';
import { ListingService } from './listings/listing.service';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';

import {
         MatProgressSpinnerModule ,
         MatCardModule ,
         MatFormFieldModule ,
         MatButtonModule ,
         MatInputModule ,
         MatExpansionModule ,
         MatSelectModule ,
         MatOptionModule

} from '@angular/material';

import { FilterSearchPipe } from './listings/pipes/filter-search.pipe';
import { FilterConditionPipe } from './listings/pipes/filter-condition.pipe';
import { FilterPricePipe } from './listings/pipes/filter-price.pipe';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListingDetailComponent,
    ListingListComponent,
    LoginComponent,
    SignupComponent,
    ListItemComponent,
    AddListingComponent,
    WishlistComponent,
    FilterSearchPipe,
    FilterConditionPipe,
    FilterPricePipe
  ],
  imports: [
    BrowserModule ,
    AppRoutingModule ,
    HttpClientModule ,
    FormsModule ,
    MatProgressSpinnerModule,
    BrowserAnimationsModule ,
    MatCardModule ,
    MatFormFieldModule ,
    MatButtonModule,
    MatInputModule ,
    MatExpansionModule ,
    CommonModule ,
    MatSelectModule ,
    MatOptionModule



  ],
  providers: [
    AuthService ,
    ListingService ,
    {
       provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor , multi: true
    } ,
    {
      provide: HTTP_INTERCEPTORS , useClass: ErrorInterceptor , multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
