import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listings/listing.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  books: any ;
  seller: string ;

  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.listingService.getWishlist()
    .subscribe((res: any) => {
      this.books = res.books.interested;
      this.seller = res.books.userName;
      console.log(this.books);
    });
  }

}
