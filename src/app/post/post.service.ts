import {Injectable} from '@angular/core';
import {Post} from './pst.model';
import {Subject} from 'rxjs';

@Injectable({providedIn:'root'})

export class PostService{

  private posts:Post[]=[];
  private postUpdated=new Subject<Post[]>();

  getPost(){
    return [...this.posts];
  }

  getPostUpdateListner(){
    return this.postUpdated.asObservable();
  }

  addPost(title:string,content:string){
    const post:Post={title:title,content:content};
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
//this is called dependency injections
