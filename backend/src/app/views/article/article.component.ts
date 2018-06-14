import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    author: '',
    creation_date: '',
    edit_date: '',
    content: {
      title: '',
      header: 'https://images.unsplash.com/photo-1518265153847-8b59d4540400?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c52af831d0b1098d53ab3ac68cb784ac&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb',
      content_markdown: '',
      content_html: '',

    }
  };  
  is_preview_display: boolean = false;
	is_delete_message_written: boolean = false;
  is_delete_modal_active: boolean = false;
  displayed_time: string;
  delete_input: string;
  illustration: any = {
    is_file_uploaded: false,
    is_icon_rotating: 'icon', 
    icon: '',
    gauge_width: 0
  }

  constructor( private showdownConverter: ShowdownConverter, private route: ActivatedRoute, private article_service: article_service, private router:Router ){}
  ngOnInit(){
    this.route.params.subscribe( params => {
      this.get_article_detail_from_id( params.id );
    })

  }

  get_article_detail_from_id( id ){
    this.article_service.get_article_detail_from_id( {id: id} )
      .subscribe( article_detail => {
        this.article.id = article_detail._id;
        this.article.author = article_detail.author;
        this.article.creation_date = article_detail.creation_date;
        this.article.edit_date = article_detail.edit_date;
        this.article.content.title = article_detail.content.title;
        if(article_detail.content.header != undefined){
          this.article.content.header = article_detail.content.header;
        }
        this.article.content.content_markdown = article_detail.content.content_markdown;
        this.article.content.content_html = article_detail.content.content_html;
      })
  }

  upload_header_image( event: any ){

    if( event.target.files && event.target.files[0] && event.target.files.length == 1 ){
      let open_door = true;
      let formData = new FormData();
      formData.append('photo', event.target.files.item(0));

      this.illustration.is_file_uploaded = true;
      this.illustration.is_icon_rotating = 'icon rotate';
      this.illustration.icon = '';
      this.illustration.gauge_width = '1px';

      if( event.target.files[0].size > 1048576 ){
        open_door = false;
         alert('The header picture is too big heavy. it must be less than 1mb');
      }else if( event.target.files[0].type != 'image/jpeg' ){
        open_door = false;
        alert('The header picture must be in jpg');
      }else if (typeof formData == 'undefined'){
        open_door = false;
        alert('Your browser does not support the FormData API! Use IE 10 or Above!');
      }

      if(open_door){

        this.article_service.upload_header_image( formData )
          .subscribe(is_picture_updated => {
            console.log(is_picture_updated);
          })

      }else{
        this.illustration.is_file_uploaded = false;
        this.illustration.is_icon_rotating = 'icon';
        this.illustration.icon = '';
      }
    }
  }

  post_article_title(){
    if( this.article.content.title != '' ){
      this.article_service.post_article_title( {id: this.article.id, title: this.article.content.title} )
        .subscribe(is_title_updated => {
          console.log( is_title_updated );
          this.get_article_detail_from_id( this.article.id )
        })
    }
  }

  post_article_content(){
  	this.article.content.content_html = this.showdownConverter.makeHtml( this.article.content.content_markdown );

    this.article_service.post_article_content( {id: this.article.id, markdown: this.article.content.content_markdown, html:this.article.content.content_html} )
      .subscribe(is_content_updated => {
        console.log( is_content_updated );
        this.get_article_detail_from_id( this.article.id )
      })
  }

  launch_exemple(){
  	this.article.content.content_markdown = this.markdown_exemple;
  	this.post_article_content();
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
      this.article_service.delete_article( {id: this.article.id} )
        .subscribe(is_article_deleted => {
          console.log( is_article_deleted );
          this.router.navigate(['dashboard']);
        })
    }
  }
}
