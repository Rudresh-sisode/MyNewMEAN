import { Component, OnInit, OnDestroy} from '@angular/core';
import {Post } from '../pst.model';
import { PostService } from '../post.service';
import {Subscription} from 'rxjs'
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
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
isLoading = false;
totalPost=0;
postsPerPage=2;
currentPage=1;
pageSizeOptions=[1,2,4,10]
userIsAuthenticated= false;
private authStatusSub: Subscription;
constructor(public postService: PostService, private authService:AuthService){

 }
 ngOnInit(){
   this.isLoading=true;
   this.postService.getPost(this.postsPerPage,1);
   this.postSub = this.postService.getPostUpdateListner()
   .subscribe((postData:{posts:Post[],postCount:number})=>{
     this.isLoading=false;
     this.totalPost=postData.postCount;
    this.posts=postData.posts;
   });
   this.userIsAuthenticated=this.authService.getIsAuth();
   this.authStatusSub= this.authService.getAuthStatusListener().subscribe(
     isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
     }
   );
 }
 onChangedPage(pageData:PageEvent){
  this.isLoading=true;
  this.currentPage=pageData.pageIndex + 1;
  this.postsPerPage=pageData.pageSize;
  this.postService.getPost(this.postsPerPage,this.currentPage);
 }

 onDelete(postId:string){
  this.isLoading=true;
  this.postService.deletePost(postId)
  .subscribe(()=>{
this.postService.getPost(this.postsPerPage,this.currentPage);
  });

 }

 ngOnDestroy(){
this.postSub.unsubscribe();
this.authStatusSub.unsubscribe();
 }
}
