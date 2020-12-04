import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model'
// import { stringify } from 'querystring';



@Injectable({providedIn: 'root'})

export class PostService{
  private posts: Post[] =[];
  private postsUpdated = new Subject<Post[]>();


    constructor(private http: HttpClient, private router: Router){

    }


  getPosts(){
    // return [...this.posts];
    this.http.get<{id: string, message: string, posts: any }>(
      'http://localhost:3000/api/posts'
    )
    // .pipe(
    //   map(
    //     (postData) => {
    //       return postData.posts.map(
    //         post =>{
    //           return {
    //             title: post.title,
    //             content: post.content,
    //             id: post._id
    //           };
    //         }
    //       );
    //     }
    //   )
    // )
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {_id: "",title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData)=>{
      //const id = responseData.postId;
      //post._id = id; //post as reference type in javascript. so we can use it safely.
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }


  // getPost(id: string){
  //   return {...this.posts.find(p => p._id ===id)}
  // }

  deletePost(postId: string){
    //console.log('Id in the delete Post method is : '+postId);
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      // console.log("Deleted!");
      const updatedPosts = this.posts.filter(
        post => post._id !== postId
      );
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

}
