import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShowdownConverter } from 'ngx-showdown';
import { MARKDOWN } from '../../../assets/json/makdown_exemple';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ArticleComponent implements OnInit{
	markdown_exemple: string = MARKDOWN.exemple;
	article : any = {
		author: 'Alexandre Nicol',
		creation: '',
		last_edit: '',
		title: 'Grandmas',
		header: 'https://images.unsplash.com/photo-1518265153847-8b59d4540400?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52af831d0b1098d53ab3ac68cb784ac&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
		content_markdown: '',
		content_html: '',
	};
  is_preview_display: boolean = false;
	is_delete_message_written: boolean = false;
  is_delete_modal_active: boolean = false;
  delete_input: string;

  constructor( private showdownConverter: ShowdownConverter ){}
  ngOnInit(){
    this.article.last_edit = new Date();
  }

  save_content(){
  	this.article.content_html = this.showdownConverter.makeHtml( this.article.content_markdown );
    this.article.last_edit = new Date();
  }

  launch_exemple(){
  	this.article.content_markdown = this.markdown_exemple;
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
