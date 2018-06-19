import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class article_upload_service {
	base_url = environment.api_url + 'admin-upload/';
	httpOptions: any;

  constructor( private http: HttpClient ){
  	this.get_session_from_storage()
      .then( session => {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded',
            'X-Auth-Token': session
          })
        };
      })
  }

  get_session_from_storage(): Promise<any>{
    return new Promise((resolve, reject)=>{
      resolve( localStorage.getItem('session') );
    })
  }

//https://www.codingforentrepreneurs.com/blog/file-upload-with-angular/
  upload_header_image( formData ){    
    let url = this.base_url + 'upload-header';
    return this.http.post(url, formData, this.httpOptions);
  }
}
