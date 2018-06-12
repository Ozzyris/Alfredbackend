import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CATEGORIES } from '../../../assets/json/categories';


//interface
// import { Article } from '../../interfaces/article';

//services
import { article_service } from '../../services/article/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [article_service]
})

export class DashboardComponent implements OnInit {
	new_article_title: string;
  all_articles: any;
  categories: any = CATEGORIES;
  selected_category: any = this.categories[0].sub_categories[0];

  constructor( private article_service: article_service ){}
  ngOnInit(){
    this.get_all_article();
  }

  get_all_article(){
    this.all_articles = this.article_service.get_articles();
  }

  create_article(){
  	if( this.new_article_title != '' ){
  		this.article_service.create_article( {title: this.new_article_title, category: this.selected_category.title } )
  			.subscribe( is_article_created => {
  			  this.new_article_title = '';
          this.get_all_article();
  			}, error => {
  				console.log(error);
  			})
  	}
  }

  switch_status( id ){
    this.article_service.switch_status( {id: id} )
        .subscribe( is_status_switched => {
          this.get_all_article();
        }, error => {
          console.log(error);
        })
  }

  select_category( category_index, sub_category_index ){
    this.selected_category = this.categories[category_index].sub_categories[sub_category_index];
  }

}
