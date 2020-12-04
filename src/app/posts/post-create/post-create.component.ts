import { Component, OnInit } from '@angular/core';
// import { EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Post } from '../post.model'
import { PostService } from '../posts.service';
import  { Post } from '../post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: any;
  private post: any;
  isloading = false;

  // @Output() postCreated: EventEmitter<any> = new EventEmitter<Post>();


  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) =>{
        if(paramMap.has('postId')){
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
         // this.post = this.postService.getPost(this.postId);
        }else{
          this.mode = 'create';
          this.postId = null;
        }
      }
    );
  }

  onAddPost(form: NgForm){
    // this.userPost = textAreaInput.value;
    // this.name = name.value;
    // this.userPost = this.newPost;
    // const post: Post = {
    //   title: this.enteredTitle,
    //   content: this.enteredContent
    // };
    if(form.invalid){
      return;
    }
    this.isloading = true;
    const post: Post = {
      _id: '',
      title: form.value.title,
      content: form.value.content
    };
    // this.postCreated.emit(post);
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
