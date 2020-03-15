import { Component, Input} from '@angular/core';
@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})
export class PostListComponent{


/* posts=[{
  title:"first post",Content:'this is first post content'
},
{
  title:"second post",Content:'this is second post content'
},
{
  title:"third post",Content:'this is third post content'
},
{
  title:"forth post",Content:'this is forth post content'
}
] */
@Input() posts=[];

}
