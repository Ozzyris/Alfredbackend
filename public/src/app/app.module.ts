import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DiscoveryComponent } from './views/discovery/discovery.component';
import { ResourcesComponent } from './views/resources/resources.component';
import { ArticleComponent } from './views/article/article.component';

//PIPES
import { ArticlesPipe } from './pipes/filters/articles.pipe';

const routes: Routes = [
  { path: 'discovery', component: DiscoveryComponent, data: { title: 'Discovery' } },
  { path: '',   redirectTo: 'discovery', pathMatch: 'full' },
  { path: 'resources', component: ResourcesComponent, data: { title: 'Resources' } },
  { path: 'article/:id', component: ArticleComponent, data: { title: 'Article' } }
];

@NgModule({
  declarations: [
    AppComponent,
    DiscoveryComponent,
    ResourcesComponent,
    ArticleComponent,
    ArticlesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
