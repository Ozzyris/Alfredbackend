import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {
	is_intro_hidden = false;

  constructor(){}

  ngOnInit(){}

  hide_intro(){
  	this.is_intro_hidden = true;
  }

}
