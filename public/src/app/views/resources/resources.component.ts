import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})

export class ResourcesComponent implements OnInit {
	is_mobile: boolean;
	is_article_display: boolean = false;
	is_breadcrumb_display: boolean = true;
	is_shorcut_display: boolean = true;

  constructor(){}

  ngOnInit(){
  	this.is_article_should_be_displayed( window.innerWidth );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
  	this.is_article_should_be_displayed( event.target.innerWidth);
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
