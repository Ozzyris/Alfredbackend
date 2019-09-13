import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ARTICLES } from '../../../assets/json/articles';


@Injectable({
	providedIn: 'root'
})

export class article_service {
	article: any = ARTICLES;
	active_article: any = ARTICLES.filter(ARTICLES => ARTICLES.status == true);
	highlighted_article: any = ARTICLES.filter(ARTICLES => ARTICLES.status == true && ARTICLES.highlight == true);

	constructor(){}

	post_feedback( payload ){
		return of({ message: 'feedback sent' });
	}

	get_highlighted_articles(): Observable<any>{
		return of(this.highlighted_article);
	}

	get_last_15_articles(): Observable<any>{
		return of(this.active_article.slice(0,15));
	}

	get_all_articles(): Observable<any>{
		return of(this.active_article);
	}

	get_article_detail_from_id( id ): Observable<any>{
		let single_article = [];
		for (var i = this.article.length - 1; i >= 0; i--) {
			if( this.article[i].url == id){
				single_article = this.article[i];
			}
		}

		return of(single_article);

		// let url = this.base_url + 'get-article-details/' + id;
		// return this.http.get(url, this.httpOptions);
	}
}
