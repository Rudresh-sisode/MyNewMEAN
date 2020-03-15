import {Injectable} from '@angular/core';
import {Post} from './pst.model';

@Injectable({providedIn:'root'})

export class PostService{

  private posts:Post[]=[];

  getPost(){
    return this.posts;
  }

  addPost(title:string,content:string){
    const post:Post={title:title,content:content};
    this.posts.push(post);
  }
}
//this is called dependency injections
