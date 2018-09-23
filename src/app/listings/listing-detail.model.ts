import { BookCondition } from './book-condition';

export interface ListingDetailModel {

userName: string;
bookId: number ;
bookName: string;
authorName: string;
bookPrice: number;
bookImageUrl: string;
bookCondition: BookCondition;

}
