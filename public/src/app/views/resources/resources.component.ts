import { Component, OnInit, HostListener } from '@angular/core';
import { CATEGORIES } from '../../../assets/json/categories';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


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
	screen_width: any = window.innerWidth;
	selected_category: any = this.categories[0].sub_categories[0];


  constructor( private article_service: article_service, private route: ActivatedRoute, private location: Location ){}

  ngOnInit(){
    this.route.params.subscribe( params => {
        if( params.category != undefined ){
          this.update_category( params.category );
        }
    })
  	this.is_article_should_be_displayed( window.innerWidth );
  	this.get_all_article();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    console.log('alexou');
  	this.screen_width = event.target.innerWidth;
  	// this.is_article_should_be_displayed( event.target.innerWidth );
  }

  update_category( category ){
    for (var i = 0; i <= this.categories.length - 1; i++) {
      for (var j = 0; j <= this.categories[i].sub_categories.length - 1; j++) {
        if( category == this.categories[i].sub_categories[j].title.toLowerCase()){
          this.selected_category = this.categories[i].sub_categories[j];
          console.log( this.selected_category);
          this.switch_from_shortchut_to_article();
        }
      }
    }
  }

  get_all_article(){
  	this.all_articles = this.article_service.get_all_articles();
  }

  display_search(){
  	if(this.search_input != ''){
  		if( this.screen_width <= 768 ){
  			this.is_shorcut_display = false;
  			this.is_breadcrumb_display = false;
  			this.is_article_display = true;
  		}
  		this.is_search_active = true;
  	}else{
  		if( this.screen_width <= 768 ){
  			this.is_shorcut_display = true;
  			this.is_breadcrumb_display = true;
  			this.is_article_display = false;
  		}
  		this.is_search_active = false;
  	}
  }



  select_category( category_index, sub_category_index ){
    this.location.replaceState("/resources/" + this.categories[category_index].sub_categories[sub_category_index].title.toLowerCase());
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
