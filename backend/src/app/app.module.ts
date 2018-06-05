import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ShowdownModule } from 'ngx-showdown';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArticleComponent } from './views/article/article.component';

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
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ShowdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
