import { BookCondition } from './book-condition';

export interface ListingModel {

  bookId: number ;
  bookName: string;
  authorName: string;
  bookPrice: number;
  bookImageUrl: string;
  bookCondition: BookCondition;


}
