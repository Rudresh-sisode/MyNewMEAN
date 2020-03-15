import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-component';
import {FormsModule} from '@angular/forms';


@NgModule({
  //all the component and pipe goes here
  declarations: [
    AppComponent,
    PostCreateComponent
  ],
  //all the module will be declared here
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  //all servicess will be declared here.
  providers: [],
  //only first component will be declared here.
  bootstrap: [AppComponent]
})
export class AppModule { }
