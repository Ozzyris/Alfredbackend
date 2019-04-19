import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class article_service {
	base_url = environment.api_url + 'public/';
	httpOptions: any;

	constructor( private http: HttpClient ){
        this.httpOptions = {
        	headers: new HttpHeaders({
        		'Content-Type':  'application/json'
			})
        };
	}

	post_feedback( payload ){
		let url = this.base_url + 'post-feedback';
		return this.http.post(url, payload, this.httpOptions);
	}

	get_highlighted_articles(){
		let url = this.base_url + 'get-highlighted-articles';
		return this.http.get(url, this.httpOptions);
	}

	get_last_15_articles(){
		let url = this.base_url + 'get-last-15-articles';
		return this.http.get(url, this.httpOptions);
	}

	get_all_articles(){
		let url = this.base_url + 'get-all-articles';
		return this.http.get(url, this.httpOptions);
	}

	get_article_detail_from_id( id ): Observable<any>{
		let url = this.base_url + 'get-article-details/' + id;
		return this.http.get(url, this.httpOptions);
	}
}
