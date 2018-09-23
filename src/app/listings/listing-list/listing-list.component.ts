import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { ListingModel } from '../listing.model';

@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent implements OnInit {

  books: ListingModel[] = [];
  searchText = '';
  selectedCondition = 'No Filter';
  selectedPrice = 'No Filter';

  constructor(private listingService: ListingService) {}

  ngOnInit() {

   this.listingService.getListings()
   .subscribe((res) => {
     this.books = res.books;

   });

  }

}
