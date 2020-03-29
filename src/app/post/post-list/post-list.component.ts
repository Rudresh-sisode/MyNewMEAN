import { Component, OnInit, OnDestroy} from '@angular/core';
import {Post } from '../pst.model';
import { PostService } from '../post.service';
import {Subscription} from 'rxjs'
@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

/* posts=[{  title:"first post",Content:'this is first post content'
},{  title:"second post",Content:'this is second post content'
},{  title:"third post",Content:'this is third post content'
},{  title:"forth post",Content:'this is forth post content'
}] */
posts:Post[] = [];
private postSub:Subscription;

constructor(public postService: PostService){

 }
 ngOnInit(){
   this.postService.getPost();
   this.postSub = this.postService.getPostUpdateListner()
   .subscribe((posts:Post[])=>{
    this.posts=posts;
   });
 }
 onDelete(postId:string){
  this.postService.deletePost(postId);

 }

 ngOnDestroy(){
this.postSub.unsubscribe();
 }
}
