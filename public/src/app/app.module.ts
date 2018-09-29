//INTERNAL PACKAGE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//EXTERNAL PACKAGE
import { MomentModule } from 'angular2-moment';

//VIEWS
import { AppComponent } from './app.component';
import { DiscoveryComponent } from './views/discovery/discovery.component';
import { ResourcesComponent } from './views/resources/resources.component';
import { ArticleComponent } from './views/article/article.component';

//PIPES
import { Filter_pipe } from './pipes/filters/filter.pipe';
import { Searcher_pipe } from './pipes/searcher/searcher.pipe';
import { SanitizerPipe } from './pipes/sanitizer/sanitizer.pipe';

const routes: Routes = [
  { path: 'discovery', component: DiscoveryComponent, data: { title: 'Discovery' } },
  { path: '',   redirectTo: 'discovery', pathMatch: 'full' },
  { path: 'resources', component: ResourcesComponent, data: { title: 'Resources' } },
  { path: 'resources/:category', component: ResourcesComponent, data: { title: 'Resources' } },
  { path: 'article/:id', component: ArticleComponent, data: { title: 'Article' } }
];

@NgModule({
  declarations: [
    AppComponent,
    DiscoveryComponent,
    ResourcesComponent,
    ArticleComponent,
    Filter_pipe,
    Searcher_pipe,
    SanitizerPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MomentModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
