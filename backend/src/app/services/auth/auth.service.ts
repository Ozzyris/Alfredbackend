import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()

export class auth_service {
	private base_url = environment.api_url + 'admin-auth/';
	private headers = new Headers({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ){}

	// SIGN IN
	signin_with_credentials( user_credential ){
		let url = this.base_url + 'signin-with-credentials';
		
		return new Promise((resolve, reject)=>{
			this.http.post(url, user_credential, httpOptions)
				.subscribe(
					data => {
						console.log('alex');
						resolve(data);
					},
					err => {
						console.log('roger');
					  reject( err.error )
					});
		})
	}
}


	