import { Component, OnInit} from '@angular/core';
import {Post } from '../pst.model';
import { PostService } from '../post.service';
@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit{

/* posts=[{  title:"first post",Content:'this is first post content'
},{  title:"second post",Content:'this is second post content'
},{  title:"third post",Content:'this is third post content'
},{  title:"forth post",Content:'this is forth post content'
}] */
posts:Post[] = [];

constructor(public postService: PostService){

 }
 ngOnInit(){
   this.posts=this.postService.getPost();
 }
}
