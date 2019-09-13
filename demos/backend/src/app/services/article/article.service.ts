import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ARTICLES } from '../../../assets/json/articles';

//interface
import { Article } from '../../interfaces/article';

@Injectable()

export class article_service {
  article: any = ARTICLES;

  constructor(){}

  ping_server(){
    return of({message: 'pong'});
  }

  put_article( payload ){
    let new_article = {
      content: {
        title: payload.title,
      },
      creation_date : "2018-06-22T14:30:20.213Z",
      author: "Alexandre Nicol",
      status : false,
      highlight : false,
      category: payload.category,
      url: payload.url,
      edit_date : "2018-08-01T12:43:26.478Z",
      _id : Math.floor(Math.random()*90000) + 10000
    }

    this.article.push( new_article );
    return of({message: 'Article created'});
  }

  get_articles(){
    return of(this.article);
  }

  switch_status( payload ){
    for (var i = this.article.length - 1; i >= 0; i--) {
      if( this.article[i]._id == payload.id ){
        this.article[i].status = !this.article[i].status;
      }
    }
    return of({message: 'Status updated'});
  }

  switch_highlight( payload ){
    for (var i = this.article.length - 1; i >= 0; i--) {
      if( this.article[i]._id == payload.id ){
        this.article[i].highlight = !this.article[i].highlight;
      }
    }
    return of({message: 'Status updated'});
    // let url = this.base_url + 'switch-highlight';
    // return this.http.post(url, payload, this.httpOptions);
  }

  get_article_detail_from_id( payload ): Observable<any>{
    let single_article = [];
    for (var i = this.article.length - 1; i >= 0; i--) {
      if( this.article[i]._id == payload.id){
        single_article = this.article[i];
      }
    }

    return of(single_article);
  }

  post_article_content( payload ){
    return of({message: 'content updated'});
    // let url = this.base_url + 'post-article-content';
    // return this.http.post(url, payload, this.httpOptions);
  }

  post_short_content( payload ){
    return of({message: 'content updated'});
    // let url = this.base_url + 'post-short-content';
    // return this.http.post(url, payload, this.httpOptions);
  }

  post_url( payload ){
    return of({message: 'Url posted'});
    // let url = this.base_url + 'post-url';
    // return this.http.post(url, payload, this.httpOptions);
  }

  post_header_by( payload ){
    return of({message: 'Photo by updated'});
    // let url = this.base_url + 'post-header-by';
    // return this.http.post(url, payload, this.httpOptions);
  }

  post_article_title( payload ){
    return of({message: 'title updated'});
    // let url = this.base_url + 'post-article-title';
    // return this.http.post(url, payload, this.httpOptions);
  }

  post_tags( payload ){
    return of({message: 'tags updated'});
    // let url = this.base_url + 'post-tags';
    // return this.http.post(url, payload, this.httpOptions);
  }

  delete_article( payload ){
    return of({message: 'content deleted'});
    // let url = this.base_url + 'delete-article';
    // return this.http.post(url, payload, this.httpOptions);
  }
}
