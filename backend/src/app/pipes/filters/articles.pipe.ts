import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articles_pipe'
})

export class ArticlesPipe implements PipeTransform {

  transform(items: any, filter: string): any {
  	console.log(filter);
  	if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.category.indexOf(filter) !== -1);
  }

}
