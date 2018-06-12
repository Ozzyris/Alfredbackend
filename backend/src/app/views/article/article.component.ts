import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowdownConverter } from 'ngx-showdown';
import { MARKDOWN } from '../../../assets/json/makdown_exemple';

//services
import { article_service } from '../../services/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [article_service],
  encapsulation: ViewEncapsulation.None
})

export class ArticleComponent implements OnInit{
	markdown_exemple: string = MARKDOWN.exemple;
	article: any = {
    id: '',
    author: 'Alexandre Nicol',
    creation_date: '',
    last_edit: '',
    content: {
      title: 'Grandmas',
      header: 'https://images.unsplash.com/photo-1518265153847-8b59d4540400?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52af831d0b1098d53ab3ac68cb784ac&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
      content_markdown: '',
      content_html: '',

    }
  };  
  is_preview_display: boolean = false;
	is_delete_message_written: boolean = false;
  is_delete_modal_active: boolean = false;
  delete_input: string;

  constructor( private showdownConverter: ShowdownConverter, private route: ActivatedRoute, private article_service: article_service ){}
  ngOnInit(){
    this.route.params.subscribe( params => {
      this.article.id = params['id'];
      this.get_article_detail_from_id( this.article.id );
    })

    this.article.last_edit = new Date();
  }

  get_article_detail_from_id( id ){
    console.log(id);
    this.article_service.get_article_detail_from_id( {id: id} )
      .subscribe( article_details => {
        console.log( article_details );
        this.article.id =  article_details._id;
        this.article.author =  article_details.author;
        this.article.creation_date =  article_details.creation_date;
        this.article.content.title =  article_details.content.title;
      });
  }

  save_content(){
  	this.article.content.content_html = this.showdownConverter.makeHtml( this.article.content.content_markdown );
    this.article.last_edit = new Date();
  }

  launch_exemple(){
  	this.article.content.content_markdown = this.markdown_exemple;
  	this.save_content();
  }

  check_delete_message_written( value ){
    if( value == 'CONFIRM DELETE' ){
      this.is_delete_message_written = true;
    }else{
      this.is_delete_message_written = false;
    }
  }

  delete_article(){
    if( this.delete_input == 'CONFIRM DELETE' ){
      console.log('alex');
    }
  }
}
