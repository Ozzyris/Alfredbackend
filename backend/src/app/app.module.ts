import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//NPM PACKAGE
import { ShowdownModule } from 'ngx-showdown';
import { MomentModule } from 'angular2-moment';

//VIEWS
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArticleComponent } from './views/article/article.component';

//PIPES
import { SanitizerPipe } from './pipes/sanitizer/sanitizer.pipe';
import { ArticlesPipe } from './pipes/filters/articles.pipe';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {  
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'article', component: ArticleComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ArticleComponent,
    SanitizerPipe,
    ArticlesPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ShowdownModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
