import { Component, OnInit, HostListener } from '@angular/core';
import { CATEGORIES } from '../../../assets/json/categories';
import { environment } from '../../../environments/environment';

//services
import { article_service } from '../../services/article/article.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  providers: [article_service]
})

export class ResourcesComponent implements OnInit {
	all_articles: any;
	is_mobile: boolean;
	search_input: string;
	api_url: string = environment.api_url + 'uploads/';
	is_search_active: boolean = false;
	is_article_display: boolean = false;
	is_breadcrumb_display: boolean = true;
	is_shorcut_display: boolean = true;
	categories: any = CATEGORIES;
	selected_category: any = this.categories[0].sub_categories[0];


  constructor( private article_service: article_service ){}

  	ngOnInit(){
  		this.is_article_should_be_displayed( window.innerWidth );
  		this.get_all_article();
  	}

  	@HostListener('window:resize', ['$event'])
  	onResize(event){
  		this.is_article_should_be_displayed( event.target.innerWidth);
  	}

  	get_all_article(){
  		this.all_articles = this.article_service.get_all_articles();
  	}

  	display_search(){

  		if(this.search_input != ''){
  			this.is_search_active = true;
  		}else{
  			this.is_search_active = false;
  		}
  	}

  	select_category( category_index, sub_category_index ){
    	this.selected_category = this.categories[category_index].sub_categories[sub_category_index];
    	this.switch_from_shortchut_to_article();
	}

	is_article_should_be_displayed( width ){
		if( width <= 768 ){
			this.is_mobile = true;
			this.is_article_display = false;
			this.is_breadcrumb_display = true;
		}else{
			this.is_mobile = false;
			this.is_article_display = true;
			this.is_breadcrumb_display = false;
			this.is_shorcut_display = true;
		}
	}

	switch_from_shortchut_to_article(){
		if( this.is_mobile ){
			this.is_article_display = true;
			this.is_shorcut_display = false;
		}
	}

	previous_page(){
		if( this.is_mobile ){
			this.is_article_display = false;
			this.is_shorcut_display = true;
		}
	}

}
