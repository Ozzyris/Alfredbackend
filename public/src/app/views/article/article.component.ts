import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';

//services
import { article_service } from '../../services/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [article_service]
})
export class ArticleComponent implements OnInit {
	is_modal_actice: boolean = false;
	article: any = {
    id: '',
		edit_date: '',
		content: {
			title: '',
      		header: '',
          header_by_html: '',
          short_content: '',
      		content_html: '',
      	},
      	tags: [],
	};
  api_url: string = environment.api_url + 'uploads/';
  feedback_input: string = '';
  info_feedback: string = '';
  feedback_button: string = "Send your feedback";

	constructor( private router: Router, private location: Location, private route: ActivatedRoute, private article_service: article_service ){}
	ngOnInit(){
		this.route.params.subscribe( params => {
      		this.get_article_detail_from_id( params.id );
    	})
	}

	get_article_detail_from_id( id ){
    	this.article_service.get_article_detail_from_id( id )
    		.subscribe( article_detail => {
    			if (article_detail){
            this.article.id = article_detail._id;
            this.article.content.title = article_detail.content.title;
    				this.article.content.short_content = article_detail.content.short_content;
    				this.article.content.header = article_detail.content.header;
            this.article.content.header_by_html = article_detail.content.header_by_html;
    				this.article.content.content_html = article_detail.content.content_html;
            this.article.tags = JSON.parse(article_detail.tags);
            this.article.edit_date = article_detail.edit_date;
    			}
    		})
	}

  send_feedback(){
    if( this.feedback_button != "Loading" ){
      this.feedback_button = "Loading";
      this.info_feedback = '';
  
      if(this.feedback_input != ""){
        this.article_service.post_feedback( {id: this.article.id, feedback: this.feedback_input} )
          .subscribe(is_feedback_poster => {
            this.is_modal_actice = false;
            this.feedback_button = "Send your feedback";
          }, error => {
            console.log(error.error);
            this.info_feedback = '<span class="icon""></span> The message couldn\'t be sent, please try again soon.';
            this.feedback_button = "Send your feedback";
          })
      }else{
        this.feedback_button = "Send your feedback";
        this.info_feedback = '<span class="icon""></span> Your message is empty';
      }
    }
  }

	previous_page(){
    if( window.history.length <= 1 ){
      this.router.navigate(['resources']);
    }else{
      this.location.back();
    }
	}

}
