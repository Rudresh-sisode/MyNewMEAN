import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
 import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import{MatButtonModule} from '@angular/material/button'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-component';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post/post-list/post-list.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  //all the component and pipe goes here
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  //all the module will be declared here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule

  ],
  //all servicess will be declared here.
  providers: [

  ],
  //only first component will be declared here.
  bootstrap: [AppComponent]
})
export class AppModule { }
