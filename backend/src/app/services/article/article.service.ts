import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

//interface
// import { Article } from '../../interfaces/article';
interface Article {
  _id: string;
}

@Injectable()

export class article_service {
	base_url = environment.api_url + 'admin/';
  httpOptions: any;

  constructor( private http: HttpClient ){
    this.get_session_from_storage()
      .then( session => {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'X-Auth-Token': session
          })
        };
      })
  }

  get_session_from_storage(): Promise<any>{
    return new Promise((resolve, reject)=>{
      resolve( localStorage.getItem('session') );
    })
  }

  put_article( payload ){
  	let url = this.base_url + 'create-article';
		return this.http.post(url, payload, this.httpOptions);
  }

  get_articles(){
    let url = this.base_url + 'get-articles';
    return this.http.get<Article>(url, this.httpOptions);
  }

  switch_status( payload ){
    let url = this.base_url + 'switch-status';
    return this.http.post(url, payload, this.httpOptions);
  }

  get_article_detail_from_id( payload ){
    let url = this.base_url + 'get-article-detail-from-id';
    return this.http.post<Article>(url, payload, this.httpOptions);
  }

  post_article_content( payload ){
    let url = this.base_url + 'post-article-content';
    return this.http.post(url, payload, this.httpOptions);
  }

  post_article_title( payload ){
    let url = this.base_url + 'post-article-title';
    return this.http.post(url, payload, this.httpOptions);
  }

  delete_article( payload ){
    let url = this.base_url + 'delete-article';
    return this.http.post(url, payload, this.httpOptions);
  }

  upload_header_image( formData ){
    let url = this.base_url + 'upload-header';
    return this.http.post(url, formData, this.httpOptions);
  }
}
