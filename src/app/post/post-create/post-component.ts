import { Component } from '@angular/core';

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html'
})
export class PostCreateComponent{
  enteredValued='';
  newPost="";


  onAddPost(){
    this.newPost=this.enteredValued;
  }

}
