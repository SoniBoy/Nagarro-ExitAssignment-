import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(value: any, filterString: any): any {
    if (filterString === '' || value.length === 0) {
    return value;
    }



    filterString = filterString.toLowerCase();
    return value.filter( it => {
      const item_name: string =  it.bookName.toLowerCase().includes(filterString);
      const item_author: string = it.authorName.toLowerCase().includes(filterString);

      if (item_name) {
      return item_name;
      } else if (item_author) {
       return item_author;
             }

    });
   }


}


