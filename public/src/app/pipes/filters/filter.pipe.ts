import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter_pipe'
})

export class Filter_pipe implements PipeTransform {

  transform(items: any, filter: string): any {
  	if (!items || !filter ) {
      return [];
    }
    return items.filter(item => item.category.indexOf(filter) !== -1);
  }

}
