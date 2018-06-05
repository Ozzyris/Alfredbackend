import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DiscoveryComponent } from './views/discovery/discovery.component';
import { ResourcesComponent } from './views/resources/resources.component';
import { ArticleComponent } from './views/article/article.component';

const routes: Routes = [
  { path: 'discovery', component: DiscoveryComponent, data: { title: 'Discovery' } },
  { path: '',   redirectTo: 'discovery', pathMatch: 'full' },
  { path: 'resources', component: ResourcesComponent, data: { title: 'Resources' } },
  { path: 'article', component: ArticleComponent, data: { title: 'Article' } }
];

@NgModule({
  declarations: [
    AppComponent,
    DiscoveryComponent,
    ResourcesComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
