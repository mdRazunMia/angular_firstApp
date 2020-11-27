import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html'
})

export class PostCreateComponent implements OnInit {
  userPost ='No Content';
  newPost='';
  constructor() { }
  onAddPost(){
    // this.userPost = textAreaInput.value;
    // this.name = name.value;
    this.userPost = this.newPost;
  }

  ngOnInit() { }
}
