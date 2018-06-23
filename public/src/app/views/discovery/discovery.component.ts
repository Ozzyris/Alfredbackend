import { Component, OnInit } from '@angular/core';

//services
import { article_service } from '../../services/article/article.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
  providers: [article_service]
})
export class DiscoveryComponent implements OnInit {
	is_intro_hidden = false;
  highlighted_articles: any;
	all_articles: any;

  constructor( private article_service: article_service ){}
  ngOnInit(){
  	this.get_highlighted_articles();
    this.get_last_15_articles();
  }

  get_highlighted_articles(){
    this.highlighted_articles = this.article_service.get_highlighted_articles();
  }

  get_last_15_articles(){
  	this.all_articles = this.article_service.get_last_15_articles();
  }

  hide_intro(){
  	this.is_intro_hidden = true;
  }

}
