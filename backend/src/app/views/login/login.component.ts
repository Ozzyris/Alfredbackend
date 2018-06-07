import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//services
import { auth_service } from '../../services/auth/auth.service';
import { validator_service } from '../../services/validator/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [auth_service, validator_service]
})

export class LoginComponent implements OnInit {
	//user information
	user_information: any = {
		email: '',
		password: '',
		stay_loggedin: false
	};

	//inputs
	info_email: string = '';
	info_password: string = '';

	//primary cta
	button_text: string = 'Login';
	button_class: string = 'button';

  constructor( private router:Router, private auth_service: auth_service, private validator_service: validator_service ){}
  ngOnInit(){}

 	input_verification(){
		this.button_class = 'button loading';
		this.button_text = '<span class="icon rotate"></span>';

		let open_door = true;
		this.info_email = this.info_password = '';

		if( this.validator_service.email_test( this.user_information.email ) == false ){
			open_door = false;
			this.info_email = '<span class="icon""></span> Your email is incorrect';
		}
		if( this.user_information.email == ''){
			open_door = false;
			this.info_email = '<span class="icon""></span> Your email is required';
		}
		if( this.user_information.password == ''){
			open_door = false;
			this.info_password = '<span class="icon""></span> Your password is required';
		}

		if( open_door == true ){
			this.signin();
		}else{
			this.button_class = 'button';
			this.button_text = 'Login';
		}
	}

	signin(){
		this.auth_service.signin_with_credentials( this.user_information )
			.then( user_detail => {
				console.log(user_detail);
				if( user_detail ){
					localStorage.setItem("session", user_detail.session);
					this.button_class = 'button loading success';
					this.button_text = '<span class="icon"></span>';
					let timer = setTimeout(() => {  
						this.router.navigate(['dashboard']);
						clearTimeout(timer);
					}, 1000);
				}
			})
			.catch(error => {
				this.info_password = '<span class="icon""></span> ' + error.message;
				this.button_class = 'button';
				this.button_text = 'Login';
			});
	}

}
