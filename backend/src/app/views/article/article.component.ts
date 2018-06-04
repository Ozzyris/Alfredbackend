import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
	article : any = {
		author: 'Alexandre Nicol',
		creation: '',
		last_edit: 'Today at 17:45:05',
		title: 'Grandmas',
		header: 'https://images.unsplash.com/photo-1518265153847-8b59d4540400?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52af831d0b1098d53ab3ac68cb784ac&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
		content: ['Alexandre Nicol is the bestaaa'],
	};
	textarea_content: string = '';
	is_new_block_created: boolean = false;

  constructor(){}
  ngOnInit(){}

  open_textarea(){
  	this.is_new_block_created = true;
  }
  next_bock(){
  	this.article.content.push(this.textarea_content);
  	this.textarea_content = "";
  }

}
