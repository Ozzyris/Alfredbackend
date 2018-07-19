import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowdownConverter } from 'ngx-showdown';
import { MARKDOWN } from '../../../assets/json/makdown_exemple';
import { environment } from '../../../environments/environment';

//services
import { article_service } from '../../services/article/article.service';
import { article_upload_service } from '../../services/article_upload/article-upload.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [article_service, article_upload_service],
  encapsulation: ViewEncapsulation.None
})

export class ArticleComponent implements OnInit{
	article: any = {
    id: '',
    author: '',
    creation_date: '',
    edit_date: '',
    status: false,
    highlight: true,
    tags: [],
    content: {
      title: '',
      header: '',
      header_by_markdown: '',
      header_by_html: '',
      short_content: '',
      content_markdown: '',
      content_html: '',

    }
  };
  api_url: string = environment.api_url + 'uploads/';
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
  };
  is_markdown_display: Boolean = false;
  tag_input: String;
  display_internet_error: Boolean = false;

  constructor( private showdownConverter: ShowdownConverter, private route: ActivatedRoute, private article_service: article_service, private article_upload_service: article_upload_service, private router:Router ){
    this.showdownConverter.setOption('openLinksInNewWindow', true);
  }
  ngOnInit(){
    this.route.params.subscribe( params => {
      this.get_article_detail_from_id( params.id );
    })

    this.ping_server();
    setInterval(()=>{
      this.ping_server();
    }, 10000);
  }

  ping_server(){
    this.article_service.ping_server()
      .subscribe( success => {
        this.display_internet_error = false;
      }, error => {
        console.log(error);
        this.display_internet_error = true;
      });  
  }

  get_article_detail_from_id( id ){
    this.article_service.get_article_detail_from_id( {id: id} )
      .subscribe( article_detail => {
        if (article_detail){
          this.article.id = article_detail._id;
          this.article.author = article_detail.author;
          this.article.creation_date = article_detail.creation_date;
          this.article.edit_date = article_detail.edit_date;
          this.article.highlight = article_detail.highlight;
          this.article.tags = JSON.parse(article_detail.tags);
          this.article.content.title = article_detail.content.title;
          this.article.content.header = article_detail.content.header;
          this.article.content.header_by_markdown = article_detail.content.header_by_markdown;
          this.article.content.short_content = article_detail.content.short_content;
          this.article.content.content_markdown = article_detail.content.content_markdown;
          this.article.content.content_html = article_detail.content.content_html;
        }
      },
      error => {
        console.log(error);
      })
  }

  prepare_the_file( file ): Promise<any>{
    return new Promise((resolve, reject)=>{
      const formData: FormData = new FormData();
      formData.append('header_photo', file, file.name);
      resolve( formData );
    })
  }

  upload_header_image( event: any ){
    if( event.target.files && event.target.files[0] && event.target.files.length == 1 ){
      let open_door = true;
      this.illustration.is_file_uploaded = true;
      this.illustration.is_icon_rotating = 'icon rotate';
      this.illustration.icon = '';
      this.illustration.gauge_width = '1px';

      if( event.target.files[0].size > 2500000 ){
        open_door = false;
         alert('The header picture is too big heavy. it must be less than 1mb');
      }else if( event.target.files[0].type != 'image/jpeg' ){
        open_door = false;
        alert('The header picture must be in jpg');
      }

      if(open_door){
        this.prepare_the_file( event.target.files[0] )
          .then( form => {
            this.article_upload_service.upload_header_image( form, this.article.id )
              .subscribe(is_picture_updated => {
                this.illustration.is_file_uploaded = false;
                this.illustration.icon = '';
                this.illustration.is_icon_rotating = 'icon';
                this.get_article_detail_from_id( this.article.id );
              }, error => {
                console.log(error);
                this.illustration.is_icon_rotating = 'icon';
                this.illustration.icon = '';
                let timer = setTimeout(() => {  
                  this.illustration.is_file_uploaded = false;
                  clearTimeout(timer);
                }, 1000);
               
              })
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

  post_header_by(){
      this.article.content.header_by_html = this.showdownConverter.makeHtml( this.article.content.header_by_markdown );

     if( this.article.content.header_by_markdown != '' ){
      this.article_service.post_header_by( {id: this.article.id, header_by_markdown: this.article.content.header_by_markdown, header_by_html: this.article.content.header_by_html } )
        .subscribe(is_header_by_updated => {
          console.log( is_header_by_updated );
          this.get_article_detail_from_id( this.article.id )
        })
    }
  }

  post_article_content(){
    this.article.content.content_html = this.showdownConverter.makeHtml( this.article.content.content_markdown );

    this.article_service.post_article_content( {id: this.article.id, markdown: this.article.content.content_markdown, html:this.article.content.content_html} )
      .subscribe(is_content_updated => {
        this.get_article_detail_from_id( this.article.id )
      })
  }

  post_short_content(){
    this.article_service.post_short_content( {id: this.article.id, short_content: this.article.content.short_content} )
      .subscribe(is_content_updated => {
        this.get_article_detail_from_id( this.article.id )
      })
  }

  switch_highlight(){
    this.article_service.switch_highlight( {id: this.article.id} )
        .subscribe( is_highlight_switched => {
          this.get_article_detail_from_id( this.article.id )
        }, error => {
          console.log(error);
        })
  }

  insert_template( type ){
    if( this.article.content.content_markdown == ""){
      this.article.content.content_markdown = MARKDOWN[ type ];
    }else{
      if (confirm("This will erase your current text \n Do you want to continue?")) {
        this.article.content.content_markdown = MARKDOWN[ type ];
      }else{} 
    }
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

  add_tag(){
    if( this.tag_input != '' && this.tag_input.replace(/\s/g, '').length != 0 ){
      this.article.tags.push(this.tag_input);
      this.article_service.post_tags( {id: this.article.id, tags: JSON.stringify( this.article.tags )} )
        .subscribe(is_tag_posted => {
          console.log( is_tag_posted );
          this.tag_input = '';
        })
    }else{
      this.tag_input = '';
    }
  }

  remove_tag( index ){
    this.article.tags.splice(index, 1);
    this.article_service.post_tags( {id: this.article.id, tags: JSON.stringify( this.article.tags )} )
        .subscribe(is_tag_posted => {
          console.log( is_tag_posted );
          this.tag_input = '';
        })
  }
}
