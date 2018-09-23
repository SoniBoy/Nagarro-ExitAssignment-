import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

  transform(value: any, filter_price: any ): any {

    if (filter_price === 'No Filter' || value.length === 0 ) { return value; }  else {
      const resultArray = [];
      for (const item of value) {

        if (filter_price === 'less than 250' && item.bookPrice < 250) {
          resultArray.push(item);
        } else if (filter_price === '250-500' && (item.bookPrice >= 250 && item.bookPrice <= 500 )) {
          resultArray.push(item);
        } else if (filter_price === '500-1000' && (item.bookPrice >= 500 && item.bookPrice <= 1000 )) {
          resultArray.push(item);
        } else if (filter_price === 'greater than 1000' && item.bookPrice > 1000) {
          resultArray.push(item);
        }
      }
    return resultArray;

  }}

}
