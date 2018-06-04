import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  is_modal_actice: boolean = false;

  constructor( private location: Location ){}
  ngOnInit(){}

  previous_page(){
		this.location.back();
  }

}
