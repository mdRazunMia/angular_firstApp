import {Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector:'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls:['./post-list.component.css'],
})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: "first post", content: "This is the first post's content"},
  //   {title: "second post", content: "This is the second post's content"},
  //   {title: "third post", content: "This is the third post's content"},
  //   {title: "fourth post", content: "This is the fourth post's content"},
  // ];
  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(public postsService: PostService){

  }

  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe(
      (posts: Post[])=>{
        this.posts = posts;
      }
    );
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
