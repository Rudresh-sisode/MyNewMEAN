import { Component } from '@angular/core';
import {Post } from '../pst.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls:['./post-create.component.css']

})
export class PostCreateComponent{
  enteredContent="";
  enteredTitle="";
  titleError="";
  contentError="";


  constructor(public postService:PostService){

  }

  onAddPost(form:NgForm){

    if(form.invalid){
      this.titleError="please Enter Title";
      this.contentError="please enter Content";
      return;
    }

    const post:Post={
      title: form.value.title,
      content: form.value.content
    };
    this.postService.addPost(form.value.title,form.value.content);
    form.resetForm();
  }

}
