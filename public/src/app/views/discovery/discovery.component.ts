import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//services
import { article_service } from '../../services/article/article.service';
import { validator_service } from '../../services/validator/validator.service';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
  providers: [article_service, validator_service]
})
export class DiscoveryComponent implements OnInit {
	is_intro_hidden = false;
  highlighted_articles: any;
	all_articles: any;
  email_input: string = '';
  api_url: string = environment.api_url + 'uploads/';
  email_info: string = '';
  email_button: string = 'Suscribe';
  is_email_subscribe: boolean = false;
  mailChimpEndpoint = 'https://designsydneyagency.us16.list-manage.com/subscribe/post-json?u=65f115701e59e99834f8eacae&amp;id=00d23fa4cb&';

  constructor( private article_service: article_service, private validator_service: validator_service, private http: HttpClient ){}

  ngOnInit(){
  	this.get_highlighted_articles();
    this.get_last_15_articles();

    this.check_if_storage( 'is_intro_hidden' )
      .then(is_intro => {
        if( is_intro == 'true'){
          this.is_intro_hidden = true;
        }
      });
    this.check_if_storage( 'is_subscribe' )
      .then(is_subscribe => {
        if( is_subscribe == 'true'){
          this.is_email_subscribe = true;
        }
      });
  }

  check_if_storage( storage_key ): Promise<any>{
    return new Promise((resolve, reject)=>{
      resolve( localStorage.getItem( storage_key ) );
    })
  }

  get_highlighted_articles(){
    this.highlighted_articles = this.article_service.get_highlighted_articles();
  }

  get_last_15_articles(){
  	this.all_articles = this.article_service.get_last_15_articles();
  }

  hide_intro(){
    localStorage.setItem("is_intro_hidden", 'true');
  	this.is_intro_hidden = true;
  }

  check_email_input(){
    if( this.email_button != 'Loading' ){
      this.email_info = '';
      this.email_button = 'Loading';

      if( this.email_input == '' ){
        this.email_button = 'Suscribe';
        this.email_info = '<span class="icon""></span> Your email is required';
      }else if( !this.validator_service.email_test( this.email_input ) ){
        this.email_button = 'Suscribe';
        this.email_info = '<span class="icon""></span> Your email is incorrect';
      }else{
        const params = new HttpParams()
          .set('EMAIL', this.email_input)
          .set('b_65f115701e59e99834f8eacae_00d23fa4cb', '');
  
        const mailChimpUrl = this.mailChimpEndpoint + params.toString();
  
        this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
            if (response.result && response.result !== 'error') {
              this.is_email_subscribe = true;
              this.email_button = 'Suscribe';
              localStorage.setItem("is_subscribe", 'true');
            } else {
              this.email_info = '<span class="icon""></span> ' + response.msg;
               this.email_button = 'Suscribe';
            }
          }, error => {
            console.error(error);
            this.email_info = '<span class="icon""></span> An error occured please try again in a minute';
            this.email_button = 'Suscribe';
          });
      }
    }

  }

}
