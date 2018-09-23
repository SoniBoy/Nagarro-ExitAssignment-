import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {

  book;



  constructor(private router: ActivatedRoute , private listingService: ListingService) { }

  ngOnInit() {

    this.router.paramMap.subscribe((params: ParamMap) => {
      this.listingService.getItem(+(params.get('item_id')))
      .subscribe((res: any) => {
        console.log('in detail' , res.item);
        this.book = res.item;
     });


    });
  }

  addToWishlist(bookId: number) {
    console.log('in detail ts file' , bookId);
    this.listingService.addToWishlist(bookId);
  }

}
