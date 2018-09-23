import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListingModel } from './listing.model';
import { ListingDetailModel } from './listing-detail.model';

@Injectable()
export class ListingService {



  constructor(private httpClient: HttpClient) { }

  // get all books
  getListings() {

    return this.httpClient.get<{books: ListingModel[]}>('/api/books.route/listings');
   }


  // get specific book item
  getItem(id: number) {
   return this.httpClient.post('/api/books.route/listings/id' , { bookId: id });

  }

  // user add book item to wishlist
  addToWishlist(bookId: number) {
    this.httpClient.post<{message: string}>(
      '/api/books.route/add-wishlist' ,
      { bookId: bookId })
      .subscribe((res) => {
         alert(res.message);
  });

  }

  // user add book
  addBook( bookName: string , authorName: string , bookPrice: number , bookImageUrl: string , bookCondition: string ) {
    this.httpClient.post<{message: string}>(
      '/api/books.route/add-listing' ,
      { bookName: bookName ,
        authorName: authorName ,
        bookPrice: bookPrice ,
        bookImageUrl: bookImageUrl ,
        bookCondition: bookCondition  })
      .subscribe((res) => {
         alert(res.message);
  });
  }







  // user see wishlist
   getWishlist() {


    return this.httpClient.get(
    '/api/users.route/wishlist'
    );



  }

}
