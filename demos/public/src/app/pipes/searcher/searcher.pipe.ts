import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'searcher_pipe'
})

export class Searcher_pipe implements PipeTransform {
  transform(items: any, query?: any): any {
		if (!items || !query) {
			return [];
		}
		return items.filter(item => item.tags.toLowerCase().indexOf(query.toLowerCase()) !== -1 || item.content.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
	}
}