import { NgModule, Component } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { ListingDetailComponent } from './listings/listing-detail/listing-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ListingListComponent } from './listings/listing-list/listing-list.component';
import { AddListingComponent } from './listings/add-listing/add-listing.component';
import { AuthGuardService } from './auth/auth.guard.service';
import { WishlistComponent } from './wishlist/wishlist.component';



const appRoutes: Routes = [
  {
    path: '' ,
    redirectTo: 'listings' ,
    pathMatch: 'full'

  } ,

  {
    path: 'listings' ,
    component: ListingListComponent ,
    /* children: [  // not working dont know why ??
      {
        path: ':item_id' ,
        component: ListingDetailComponent
      }
    ] */
  } ,

  {
    path: 'listings/:item_id' ,
    component: ListingDetailComponent ,
    canActivate: [AuthGuardService]
  } ,



  {
    path: 'login' ,
    component: LoginComponent
  } ,

  {
    path: 'signup' ,
    component: SignupComponent ,

  } ,

  {
    path: 'add-listing' ,
    component: AddListingComponent ,
    canActivate: [AuthGuardService]
  } ,

  {
    path: 'wishlist' ,
    component: WishlistComponent ,
    canActivate: [AuthGuardService]
  } ,

  {
    path: '**' ,   // wildcard routes
    redirectTo: 'listings'
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ] ,
  exports: [
    RouterModule
  ] ,
  providers: [AuthGuardService]

})
export class AppRoutingModule {

}
