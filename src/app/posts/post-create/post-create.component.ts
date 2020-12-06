import { Component, OnInit } from '@angular/core';
// import { EventEmitter, Output } from '@angular/core';
// import { FormGroup, NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Post } from '../post.model'
import { PostService } from '../posts.service';
import  { Post } from '../post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { ThisReceiver } from '@angular/compiler';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  imagePreview: any;
  private mode = 'create';
  private postId: any;
  private post: any;
  isloading = false;
  form: any;

  // @Output() postCreated: EventEmitter<any> = new EventEmitter<Post>();


  constructor(public postService: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (paramMap: ParamMap) =>{
    //     if(paramMap.has('postId')){
    //       this.mode = 'edit';
    //       this.postId = paramMap.get('postId');
    //      // this.post = this.postService.getPost(this.postId);
    //     }else{
    //       this.mode = 'create';
    //       this.postId = null;
    //     }
    //   }
    // );

    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, { validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.form.setValue({
      'title': this.post.title,
      'content': this.post.content
    });
  }

  public onImagePicked(event: Event){

    const file = (event.target as HTMLInputElement).files[0];

    // tells the typeScript that it is a html input element. Just like type conversion
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    // console.log(this.form);
    const reader = new FileReader(); //help to read file
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAddPost(){
    // this.userPost = textAreaInput.value;
    // this.name = name.value;
    // this.userPost = this.newPost;
    // const post: Post = {
    //   title: this.enteredTitle,
    //   content: this.enteredContent
    // };
    if(this.form.invalid){
      return;
    }
    this.isloading = true;
    const post: any = {
      _id: '',
      title: this.form.value.title,
      content: this.form.value.content
    };
    // this.postCreated.emit(post);
    this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    this.form.reset();
  }
}
