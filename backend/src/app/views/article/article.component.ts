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
	markdown_exemple: string = MARKDOWN.exemple[0];
	article : any = {
		author: 'Alexandre Nicol',
		creation: '',
		last_edit: 'Today at 17:45:05',
		title: 'Grandmas',
		header: 'https://images.unsplash.com/photo-1518265153847-8b59d4540400?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52af831d0b1098d53ab3ac68cb784ac&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
		content_markdown: '',
		content_html: '',
	};
	is_preview_display: boolean = false;

  constructor( private showdownConverter: ShowdownConverter ){}
  ngOnInit(){}

  save_content(){
  	this.article.content_html = this.showdownConverter.makeHtml( this.article.content_markdown )
  }

  launch_exemple(){
  	this.article.content_markdown = this.markdown_exemple;
  	this.save_content();
  }

}
