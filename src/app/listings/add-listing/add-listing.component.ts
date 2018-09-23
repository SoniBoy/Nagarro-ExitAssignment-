import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  selectedCondition: string = '';

  constructor(private listingService: ListingService) { }

  ngOnInit() {
  }

  onAdd(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.listingService.addBook(
      form.value.bookName ,
      form.value.authorName ,
      form.value.bookPrice ,
      form.value.bookImageUrl ,
      this.selectedCondition

    );


  }

}
