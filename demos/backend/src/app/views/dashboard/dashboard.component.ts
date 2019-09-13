import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '../../../assets/json/categories';

//services
import { article_service } from '../../services/article/article.service';
import { validator_service } from '../../services/validator/validator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [article_service, validator_service]
})

export class DashboardComponent implements OnInit {
  new_article_title: string;
	new_article_url: string;
  all_articles: any;
  categories: any = CATEGORIES;
  selected_category: any = this.categories[0].sub_categories[0];

  constructor( private article_service: article_service, private validator_service: validator_service ){}
  ngOnInit(){
    this.get_all_article();
  }

  get_all_article(){
    this.all_articles = this.article_service.get_articles();
    this.all_articles.subscribe(article => {
      console.log(article);
    })
  }

  put_article(){
  	if( this.new_article_title != '' ){
      this.new_article_url = this.validator_service.generate_url( this.new_article_title );

  		this.article_service.put_article( {title: this.new_article_title, category: this.selected_category.title, url: this.new_article_url } )
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
