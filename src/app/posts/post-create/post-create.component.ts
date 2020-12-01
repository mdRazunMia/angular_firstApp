import { Component, OnInit } from '@angular/core';
// import { EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { Post } from '../post.model'
import { PostService } from '../posts.service';
import  { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';

  // @Output() postCreated: EventEmitter<any> = new EventEmitter<Post>();


  constructor(public postService: PostService) {

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
    const post: Post = {
      id: '',
      title: form.value.title,
      content: form.value.content
    };
    // this.postCreated.emit(post);
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  ngOnInit() { }

}
