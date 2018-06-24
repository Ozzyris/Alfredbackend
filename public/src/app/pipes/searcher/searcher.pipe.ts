import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searcher_pipe'
})
export class Searcher_pipe implements PipeTransform {

  transform(items: any, query?: any): any {
  	if (!items || !query) {
      return items;
    }

    return items.filter(item => item.tags.indexOf(query) !== -1);
  }

}
